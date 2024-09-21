<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // setup data user
        User::factory()->create([
            'name' => 'Dimas Gilang Dwi Aji',
            'email' => 'dimas@gmail.com',
            'role' => 'manager',
            'password' => Hash::make('password')
        ]);

        for ($i = 0; $i < 20; $i++) {
            User::factory()->create([
                'role' => 'teller',
                'password' => Hash::make('password')
            ]);
        }

        for ($i = 0; $i < 200; $i++) {
            User::factory()->create([
                'role' => 'customer',
                'password' => Hash::make('password'),
                'is_active' => rand(0, 1)
            ]);
        }

        // setup data account
        $users = User::all();
        foreach ($users as $user) {
            if ($user->role == 'customer') {
                Account::create([
                    'user_id' => $user->id,
                    'account_number' => Account::generateAccountNumber(),
                    'balance' => 0
                ]);
            }
        }

        // setup data contact
        foreach ($users as $user) {
            if ($user->role == 'customer') {
                $userAccounts = Account::inRandomOrder()->limit(12)->get();
                foreach ($userAccounts as $account) {
                    Contact::create([
                        'user_id' => $user->id,
                        'account_id' => $account->id,
                        'alias' => fake()->firstName()
                    ]);
                }
            }
        }

        $accounts = Account::all();

        foreach ($accounts as $account) {
            $balance = $account->balance;
            $debit  = fake()->numberBetween(2000000, 5000000);
            $final = $balance + $debit;
            Transaction::create([
                'account_id' => $account->id,
                'transaction_type' => 'deposit',
                'current' => $balance,
                'debit' => $debit,
                'final' => $final,
                'message' => 'initial deposit'
            ]);
            $account->update(['balance' => $final]);
        }

        foreach ($accounts as $account) {
            $balance = $account->balance;
            $credit  = fake()->numberBetween(50000, 200000);
            $final = $balance - $credit;
            Transaction::create([
                'account_id' => $account->id,
                'transaction_type' => 'withdraw',
                'current' => $balance,
                'credit' => $credit,
                'final' => $final,
                'message' => 'first withdraw'
            ]);
            $account->update(['balance' => $final]);
        }

        // Transfer process...
        foreach ($users as $user) {
            $account = $user->account;
            if ($account == null) {
                continue;
            }

            $contact = $user->contacts()->first();
            if ($contact == null) {
                continue;
            }

            $targetAccount = $contact->account;
            if ($targetAccount == null) {
                continue;
            }

            $balance = $account->balance;
            $amount = fake()->numberBetween(50000, 200000);
            $final = $balance - $amount;

            $targetBalance = $targetAccount->balance;
            $targetFinal = $targetBalance + $amount;

            // out
            Transaction::create([
                'account_id' => $account->id,
                'target_account_id' => $targetAccount->id,
                'transaction_type' => 'transfer out',
                'current' => $balance,
                'credit' => $amount,
                'final' => $final,
                'message' => 'transfer out'
            ]);

            // in
            Transaction::create([
                'account_id' => $targetAccount->id,
                'target_account_id' => $account->id,
                'transaction_type' => 'transfer in',
                'current' => $targetBalance,
                'debit' => $amount,
                'final' => $targetFinal,
                'message' => 'transfer in'
            ]);

            $account->update(['balance' => $final]);
            $targetAccount->update(['balance' => $targetFinal]);
        }
    }
}
