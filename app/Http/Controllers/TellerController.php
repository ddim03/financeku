<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $query->where('role', 'teller');

        if (request('q')) {
            $query->whereAny(['name', 'address', 'email'], 'like', '%' . request('q') . '%');
        }
        $users = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Teller/Index', [
            'tellers' => UserResource::collection($users),
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
        $validated['role'] = 'teller';
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);
        return redirect()->route('teller.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $teller)
    {
        $rules = [
            'name' => 'max:255',
            'email' => 'max:255|email|unique:users,email,' . $teller->id,
            'address' => '  max:255'
        ];

        if ($request->password) {
            $rules['password'] = 'min:8';
        }

        $validated = $request->validate($rules);
        if ($request->password) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $teller->update($validated);
        return redirect()->route('teller.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $teller)
    {
        $teller->delete();
        return redirect()->route('teller.index');
    }


    /**
     * Block the specified resource.
     */
    public function block(User $teller)
    {
        if ($teller->is_active === 1) {
            $teller->update(['is_active' => 0]);
        } else {
            $teller->update(['is_active' => 1]);
        }
        return redirect()->route('teller.index');
    }
}
