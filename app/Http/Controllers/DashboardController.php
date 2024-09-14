<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = Transaction::with('account');

        if ($user->role === 'customer') {
            $account = $user->account;
            $currentMonth = Carbon::now()->format('m');
            $statistics = [
                'balance' => $account->balance,
                'income' => $account->transactions()->whereMonth('transaction_date', $currentMonth)->sum('debit'),
                'expense' => $account->transactions()->whereMonth('transaction_date', $currentMonth)->sum('credit'),
            ];

            $query->where('account_id', $user->account->id);

            $transactions = $query->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return Inertia::render('Dashboard/Customer', [
                'statistics' => $statistics,
                'transactions' => TransactionResource::collection($transactions)
            ]);
        }

        $statistics = [
            'total_customers' => User::where('role', 'customer')->count(),
            'active_customers' => User::where('role', 'customer')->where('is_active', 1)->count(),
            'blocked_customers' => User::where('role', 'customer')->where('is_active', 0)->count()
        ];

        $transactions = $query->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'statistics' => $statistics,
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }
}
