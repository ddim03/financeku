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
        $keyword = request('q');

        if ($keyword) {
            $query
                ->where('alias', 'like', '%' . $keyword . '%')
                ->orWhereHas('account', function ($q) use ($keyword) {
                    $q->where('account_number', 'like', '%' . $keyword . '%');
                });
        }

        $contacts = $query
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Contact/Index', [
            'contacts' => ContactResource::collection($contacts),
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

        return redirect()->back();
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
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->back();
    }
}
