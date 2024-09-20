<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountResource;
use App\Http\Resources\ContactResource;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function index()
    {
        $query = Contact::query();
        $query->where('user_id', Auth::user()->id);
        $keyword = request('q');

        if ($keyword) {
            $query
                ->where('alias', 'like', '%' . $keyword . '%')
                ->orWhereHas('account', function ($q) use ($keyword) {
                    $q->where('account_number', 'like', '%' . $keyword . '%');
                });
        }

        $contacts = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);
        return Inertia::render('Withdrawal/Index', [
            'userAccount' => new AccountResource(Auth::user()->account),
            'contacts' => ContactResource::collection($contacts),
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'account_id' => 'required|exists:accounts,id',
                'target_account_id' => 'required|exists:accounts,id',
                'amount' => 'required|numeric|min:10000',
                'message' => 'max:255',
            ]);

            $currentBalance = Auth::user()->account->balance;
            $amount = $validated['amount'];

            if ($currentBalance < $amount) {
                return redirect()->back()->withErrors('amount', 'Insufficient Balance');
            }

            $validated['account_id'] = Auth::user()->account->id;
            $validated['transaction_type'] = 'transfer out';
            $validated['current'] = $currentBalance;
            $validated['credit'] = $amount;
            $validated['final'] = $currentBalance - $amount;
            $validated['transaction_date'] = now();

            // out
            Transaction::create($validated);

            $targetAccount = Account::find($validated['target_account_id']);

            // in
            Transaction::create([
                'account_id' => $validated['target_account_id'],
                'target_account_id' => $validated['account_id'],
                'transaction_type' => 'transfer in',
                'current' => $targetAccount->balance,
                'debit' => $amount,
                'transaction_date' => now(),
                'final' => $targetAccount->balance + $amount,
            ]);

            // update balance
            $targetAccount->balance += $amount;
            $targetAccount->save();

            $currentAccount = Account::find($validated['account_id']);
            $currentAccount->balance -= $amount;
            $currentAccount->save();

            DB::commit();
            return redirect()->back();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
