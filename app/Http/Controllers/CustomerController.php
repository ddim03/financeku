<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $query->where('role', 'customer');

        if (request('q')) {
            $query->whereAny(['name', 'address', 'email'], 'like', '%' . request('q') . '%');
        }
        $users = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Customer/Index', [
            'customers' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:8',
            'address' => 'required|max:255'
        ]);
        $validated['role'] = 'customer';
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        $accountNumber = Account::generateAccountNumber();
        Account::create([
            'user_id' => $user->id,
            'account_number' => $accountNumber,
            'balance' => 0
        ]);
        return redirect()->route('customer.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $customer)
    {
        $rules = [
            'name' => 'max:255',
            'email' => 'max:255|email|unique:users,email,' . $customer->id,
            'address' => '  max:255'
        ];

        if ($request->password) {
            $rules['password'] = 'min:8';
        }

        $validated = $request->validate($rules);
        if ($request->password) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $customer->update($validated);
        return redirect()->route('customer.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $customer)
    {
        $customer->delete();
        return redirect()->route('customer.index');
    }


    /**
     * Block the specified resource.
     */
    public function block(User $customer)
    {
        if ($customer->is_active === 1) {
            $customer->update(['is_active' => 0]);
        } else {
            $customer->update(['is_active' => 1]);
        }
        return redirect()->route('customer.index');
    }
}
