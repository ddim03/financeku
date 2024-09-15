<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/test', function () {
    return "test";
});

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

// Route::middleware('auth')->group(function () {
//     Route::get('/customer-management', [CustomerController::class, 'index'])->name('Customer.customerManagement');
// });

Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::resource('customer', CustomerController::class);
    Route::put('/customer/{customer}/block', [CustomerController::class, 'block'])
        ->name('customer.block');
});

// Route::get('/customermanagement', function () {
//     return Inertia::render('Customer/customerManagement');
// });

// Perbaiki bagian editCustomer
Route::get('/editCustomer', function () { // Ubah URL menjadi '/edit-customer'
    return Inertia::render('Customer/EditCustomer'); // Ubah penamaan komponen menjadi 'Customer/EditCustomer'
})->middleware(['auth', 'verified'])->name('customer.editCustomer'); // Ubah penamaan rute menjadi 'customer.edit'


Route::get('/teller', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('teller.index');


require __DIR__.'/auth.php';
