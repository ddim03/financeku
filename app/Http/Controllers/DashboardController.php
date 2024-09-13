<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'manager' || $user->role === 'teller') {
            $data = [
                'totalUser' => User::where('role', 'customer')->count(),
                'activeUser' => User::where('role', 'customer')->where('is_active', 1)->count(),
                'blockedUser' => User::where('role', 'customer')->where('is_active', 2)->count()
            ];
        } else {
            $account = $user->account;
            $currentMonth = Carbon::now()->format('m');
            $data = [
                'balance' => $account->balance,
                'income' => $account->transactions()->whereMonth($currentMonth)->sum('debit'),
                'expenses' => $account->transactions()->whereMonth($currentMonth)->sum('credit'),
            ];
        }

        return Inertia::render('Dashboard', compact('data'));
    }
}
