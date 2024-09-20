<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HistoryController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TellerController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'role:manager'])->group(function () {
    // Teller
    Route::resource('teller', TellerController::class);
    Route::put('teller/{teller}/block', [TellerController::class, 'block'])
        ->name('teller.block');

    // Customer
    Route::resource('customer', CustomerController::class);
    Route::put('/customer/{customer}/block', [CustomerController::class, 'block'])
        ->name('customer.block');
});

// withdrawal
Route::get('/withdrawal', [WithdrawalController::class, 'index'])->name('history.transactions');


Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::resource('contact', ContactController::class);
    Route::get('/transfer', [TransferController::class, 'index'])->name('transfer.index');
    Route::post('/transfer', [TransferController::class, 'store'])->name('transfer.store');

    // Riwayat Transaksi
    Route::get('/history-transaksi', [HistoryController::class, 'index'])->name('history.transactions');
});

Route::resource('contact', ContactController::class);


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
