<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(User $customer)
    {
        $query = Transaction::query();
        $query->where('account_id', $customer->account->id);

        if (request('month')) {
            $query->whereMonth('transaction_date', request('month'));
        }

        if (request('type')) {
            $query->where('transaction_type', request('type'));
        }

        $transactions = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);
        return Inertia::render('History/Index', [
            'customer' => new CustomerResource($customer),
            'transactions' => TransactionResource::collection($transactions),
            'month' => request('month'),
            'type' => request('type'),
        ]);
    }

    public function show()
    {
        $query = Transaction::query();
        $query->where('account_id', Auth::user()->account->id);

        if (request('month')) {
            $query->whereMonth('transaction_date', request('month'));
        }

        if (request('type')) {
            $query->where('transaction_type', request('type'));
        }

        $transactions = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);
        return Inertia::render('History/Customer', [
            'transactions' => TransactionResource::collection($transactions),
            'month' => request('month'),
            'type' => request('type'),
        ]);
    }
}
