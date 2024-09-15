<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TellerController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'role:manager'])->group(function () {
    // Teller
    Route::resource('teller', TellerController::class);
    Route::put('/teller/{teller}/block', [TellerController::class, 'block'])
        ->name('teller.block');

    // Customer
    Route::resource('customer', CustomerController::class);
    Route::put('/customer/{customer}/block', [CustomerController::class, 'block'])
        ->name('customer.block');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
