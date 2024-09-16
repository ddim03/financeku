<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TellerController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::resource('teller', TellerController::class);
    Route::put('teller/{teller}/block', [TellerController::class, 'block'])
        ->name('teller.block');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::resource('contact', ContactController::class);
});

Route::resource('contact', ContactController::class);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
