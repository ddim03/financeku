<?php

namespace App\Http\Controllers;

use App\Http\Resources\WithdrawalResource;
use App\Models\Account;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function __construct()
    {
        // Gunakan properti $this->middleware untuk menetapkan middleware
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            if ($user->role !== 'manager' && $user->role !== 'teller') {
                return redirect()->back()->withErrors(['Unauthorized access.']);
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Logika untuk menampilkan daftar withdrawal
        $query = Withdrawal::query();

        if (Auth::user()->role === 'manager') {
            // Jika pengguna adalah manager, tampilkan semua withdrawal
            $withdrawals = $query->orderBy('created_at', 'desc')->paginate(10)->onEachSide(1);
        } else {
            // Jika pengguna adalah teller, tampilkan hanya withdrawal yang mereka proses
            $query->where('processed_by', Auth::user()->id);
            $withdrawals = $query->orderBy('created_at', 'desc')->paginate(10)->onEachSide(1);
        }

        return Inertia::render('Withdrawal/Index', [
            'withdrawals' => WithdrawalResource::collection($withdrawals),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'account_number' => 'required|exists:accounts,account_number',
            'amount' => 'required|numeric|min:1',
        ]);

        $account = Account::where('account_number', $request->account_number)->first();

        if (!$account) {
            return redirect()->back()->withErrors(['account_number' => 'Account not found.']);
        }

        if ($account->balance < $request->amount) {
            return redirect()->back()->withErrors(['amount' => 'Insufficient funds in the account.']);
        }

        // Kurangi saldo akun dengan jumlah yang diminta
        $account->balance -= $request->amount;
        $account->save();

        // Catat withdrawal
        Withdrawal::create([
            'account_id' => $account->id,
            'amount' => $request->amount,
            'processed_by' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Withdrawal successful.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Withdrawal $withdrawal)
    {
        // Hanya manager yang dapat menghapus withdrawal
        if (Auth::user()->role !== 'manager') {
            return redirect()->back()->withErrors(['Unauthorized action.']);
        }

        // Kembalikan jumlah ke akun
        $account = $withdrawal->account;
        $account->balance += $withdrawal->amount;
        $account->save();

        // Hapus catatan withdrawal
        $withdrawal->delete();

        return redirect()->back()->with('success', 'Withdrawal deleted and refunded.');
    }
}
