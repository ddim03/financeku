<?php

use App\Http\Controllers\CashTransactionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TellerController;
use App\Http\Controllers\TransferController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::resource('teller', TellerController::class);
    Route::put('teller/{teller}/block', [TellerController::class, 'block'])
        ->name('teller.block');
});

Route::middleware(['auth', 'role:manager,teller'])->group(function () {
    Route::resource('customer', CustomerController::class);
    Route::put('customer/{customer}/block', [CustomerController::class, 'block'])
        ->name('customer.block');
    Route::get('/cash', [CashTransactionController::class, 'index'])->name('cash.index');
    Route::post('/cash/deposit', [CashTransactionController::class, 'deposit'])->name('cash.deposit.store');
    Route::post('/cash/withdraw', [CashTransactionController::class, 'withdraw'])->name('cash.withdraw.store');
    Route::get('/customer-history/{customer}', [HistoryController::class, 'index'])->name('history.index');
    Route::get('/customer-history/{customer}/print', [HistoryController::class, 'print'])->name('history.print');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::resource('contact', ContactController::class);
    Route::get('/transfer', [TransferController::class, 'index'])->name('transfer.index');
    Route::post('/transfer', [TransferController::class, 'store'])->name('transfer.store');
    Route::resource('contact', ContactController::class);
    Route::get('history', [HistoryController::class, 'show'])->name('history.customer');
    Route::get('history/print', [HistoryController::class, 'print'])->name('history.customer.print');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
