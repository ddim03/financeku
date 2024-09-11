<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->enum('transaction_type', ['deposit', 'withdrawal', 'transfer']);
            $table->decimal('current', 15, 2);
            $table->decimal('debit', 15, 2);
            $table->decimal('credit', 15, 2);
            $table->decimal('finale', 15, 2);
            $table->foreignId('target_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->timestamp('transaction_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
