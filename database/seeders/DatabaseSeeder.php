<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            // setup data user
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'role' => 'manager',
                'password' => Hash::make('password')
            ]);

            for ($i = 0; $i < 5; $i++) {
                User::factory()->create([
                    'role' => 'teller',
                    'password' => Hash::make('password')
                ]);
            }

            for ($i = 0; $i < 50; $i++) {
                User::factory()->create([
                    'role' => 'customer',
                    'password' => Hash::make('password')
                ]);
            }

            // setup data account
            $users = User::all();
            foreach ($users as $user) {
                if ($user->role == 'customer') {
                    Account::create([
                        'user_id' => $user->id,
                        'account_number' => fake()->randomNumber(9, true),
                        'balance' => fake()->numberBetween(50000, 1000000)
                    ]);
                }
            }

            // setup data contact
            foreach ($users as $user) {
                $account = Account::inRandomOrder()->first();
                Contact::create([
                    'user_id' => $user->id,
                    'account_id' => $account->id,
                    'alias' => $account->user->name
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            Log::error("Error creating user: " . $th->getMessage());
            DB::rollBack();
        }

        DB::beginTransaction();
        try {
            // setup data transaction (setor)
            $accounts = Account::all();
            foreach ($accounts as $account) {
                $balance = $account->balance;
                $debit  = fake()->numberBetween(2000000, 5000000);
                $final = $account->balance + $debit;
                Transaction::create([
                    'account_id' => $account->id,
                    'transaction_type' => 'deposit',
                    'current' => $balance,
                    'debit' => $debit,
                    'final' => $final
                ]);
                Account::where('id', $account->id)->update(['balance' => $final]);
            }

            // setup data transaction (tarik)
            $accounts = Account::all();
            foreach ($accounts as $account) {
                $balance = $account->balance;
                $debit  = fake()->numberBetween(50000, 200000);
                $final = $account->balance - $debit;
                Transaction::create([
                    'account_id' => $account->id,
                    'transaction_type' => 'withdrawal',
                    'current' => $balance,
                    'credit' => $debit,
                    'final' => $final
                ]);
                Account::where('id', $account->id)->update(['balance' => $final]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            Log::error("Error creating user: " . $th->getMessage());
            DB::rollBack();
        }

        // setup data transaction (transfer)
        foreach ($users as $user) {
            $account = $user->account;
            if ($account === null) {
                // Skip this user if they don't have an account
                continue;
            }

            $contact = $user->contacts()->first();
            if ($contact === null) {
                // Skip this user if they don't have any contacts
                continue;
            }

            // Pastikan contact memiliki account yang valid
            $targetAccount = $contact->account;
            if ($targetAccount === null) {
                // Skip jika contact tidak memiliki account yang valid
                continue;
            }

            $balance = $account->balance;
            $debit = fake()->numberBetween(50000, 200000);
            $final = $balance + $debit;

            try {
                DB::transaction(function () use ($account, $targetAccount, $balance, $debit, $final) {
                    Transaction::create([
                        'account_id' => $account->id,
                        'target_account_id' => $targetAccount->id,  // Gunakan ID account dari contact
                        'transaction_type' => 'transfer',
                        'current' => $balance,
                        'debit' => $debit,
                        'final' => $final
                    ]);

                    $account->update(['balance' => $final]);
                });
            } catch (\Exception $e) {
                // Log error dan lanjutkan ke user berikutnya
                Log::error("Error creating transaction for user {$user->id}: " . $e->getMessage());
                continue;
            }
        }
    }
}
