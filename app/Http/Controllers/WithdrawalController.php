<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $user = Auth::user();
    $query = Transaction::with('account');

    $filter = request('filter'); // Mendapatkan parameter filter

    if ($user->role === 'customer') {
        $query->where('account_id', $user->account->id);
    }

    if ($filter) {
        $query->where('transaction_type', $filter);
    }

    $transactions = $query->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString(); // Menjaga parameter query tetap ada

    return Inertia::render('Withdrawal/Index', [
        'transactions' => TransactionResource::collection($transactions),
        'filter' => $filter, // Kirim parameter filter ke frontend
    ]);
}

}