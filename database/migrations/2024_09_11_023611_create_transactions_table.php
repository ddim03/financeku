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
            $table->bigInteger('current');
            $table->bigInteger('debit')->nullable();
            $table->bigInteger('credit')->nullable();
            $table->bigInteger('final')->nullable();
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
