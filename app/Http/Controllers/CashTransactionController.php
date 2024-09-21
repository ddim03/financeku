<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Http\Resources\TransactionResource;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CashTransactionController extends Controller
{
    public function index()
    {
        $query = User::query();
        $query->where('role', 'customer');

        $keyword = request('q');

        if ($keyword) {
            $query->where(function ($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%')
                    ->orWhereHas('account', function ($q) use ($keyword) {
                        $q->where('account_number', 'like', '%' . $keyword . '%');
                    });
            });
        }

        $customers = $query
            ->with('account')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        $customers->appends(request()->query());

        return Inertia::render('CashTransaction/Index', [
            'customers' => CustomerResource::collection($customers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null
        ]);
    }

    public function withdraw(Request $request)
    {
        $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:50000',
            'message' => 'max:255',
        ]);

        DB::beginTransaction();
        try {
            $customerAccount = Account::find($request->account_id);
            $currentBalance = $customerAccount->balance;
            $amount = $request->amount;
            if ($currentBalance < $amount) {
                return redirect()->back()->withErrors('amount', 'Insufficient Balance');
            }
            $final = $currentBalance - $amount;

            Transaction::create([
                'account_id' => $customerAccount->id,
                'transaction_type' => 'withdraw',
                'current' => $currentBalance,
                'credit' => $amount,
                'final' => $final,
                'message' => $request->message,
            ]);

            $customerAccount->balance = $final;
            $customerAccount->save();
            DB::commit();
            return redirect()->back()->with('success', 'Withdrawal Successful');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function deposit(Request $request)
    {
        $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:50000',
            'message' => 'max:255',
        ]);

        DB::beginTransaction();
        try {
            $customerAccount = Account::find($request->account_id);
            $currentBalance = $customerAccount->balance;
            $amount = $request->amount;
            $final = $currentBalance + $amount;

            Transaction::create([
                'account_id' => $customerAccount->id,
                'transaction_type' => 'deposit',
                'current' => $currentBalance,
                'debit' => $amount,
                'final' => $final,
                'message' => $request->message,
            ]);

            $customerAccount->balance = $final;
            $customerAccount->save();
            DB::commit();
            return redirect()->back()->with('success', 'Deposit Successful');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function history()
    {
        $transactions = Transaction::where('account_id', Auth::user()->account->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);
        return Inertia::render('CashTransaction/History', [
            'transactions' => TransactionResource::collection($transactions),
        ]);
    }
}
