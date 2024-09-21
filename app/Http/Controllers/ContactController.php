<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContactResource;
use App\Models\Account;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Contact::query();
        $query->where('user_id', Auth::user()->id);
        $keyword = request('q');

        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->whereHas('account', function ($subQ) use ($keyword) {
                    $subQ->where('account_number', 'like', '%' . $keyword . '%');
                })
                    ->orWhere('alias', 'like', '%' . $keyword . '%');
            });
        }

        $contacts = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        $contacts->appends(request()->query());

        return Inertia::render('Contact/Index', [
            'contacts' => ContactResource::collection($contacts),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null
        ]);
    }

    public function show(string $account_number)
    {
        try {
            $account = Account::where('account_number', 'like', "%$account_number%")->first();
            $contact = Contact::where('account_id', $account->id)->firstOrFail();
            return new ContactResource($contact);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Contact not found'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'account_number' => 'required|exists:accounts,account_number',
            'alias' => 'required|min:3|max:255',
        ]);

        $account = Account::where('account_number', $request->account_number)->first();
        Contact::create([
            'account_id' => $account->id,
            'alias' => $request->alias,
            'user_id' => Auth::user()->id
        ]);

        return redirect()->back()->with('success', 'Contact created successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'alias' => 'min:3|max:255',
        ]);

        $contact->update([
            'alias' => $request->alias
        ]);
        return redirect()->back()->with('success', 'Contact updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->back()->with('success', 'Contact deleted successfully');
    }
}
