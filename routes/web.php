<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/customermanagement', function () {
    return Inertia::render('Customer/customerManagement');
})->middleware(['auth', 'verified'])->name('customerManagement');

Route::get('/teller', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('teller.index');

// Perbaiki bagian editCustomer
Route::get('/editCustomer', function () { // Ubah URL menjadi '/edit-customer'
    return Inertia::render('Customer/EditCustomer'); // Ubah penamaan komponen menjadi 'Customer/EditCustomer'
})->middleware(['auth', 'verified'])->name('customer.editCustomer'); // Ubah penamaan rute menjadi 'customer.edit'

require __DIR__.'/auth.php';
