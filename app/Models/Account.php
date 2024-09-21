<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public static function generateAccountNumber()
    {
        // prefix 
        $branchCode = '101';

        // Tahun saat ini
        $year = date('Y');

        // Ambil nomor urut terakhir dari rekening yang sudah ada
        $lastAccount = self::where('account_number', 'LIKE', $branchCode . $year . '%')
            ->orderBy('account_number', 'desc')
            ->first();

        // Ambil nomor urut terakhir, lalu tambahkan 1
        if ($lastAccount) {
            $lastIncrement = (int) substr($lastAccount->account_number, -6); // 6 digit terakhir
            $newIncrement = $lastIncrement + 1;
        } else {
            $newIncrement = 1; // Jika belum ada rekening di tahun ini, mulai dari 1
        }

        // Format angka urut menjadi 6 digit (misalnya 000001, 000002, dll.)
        $increment = str_pad($newIncrement, 6, '0', STR_PAD_LEFT);

        // Gabungkan semua menjadi nomor rekening
        $accountNumber = $branchCode . $year . $increment;

        return $accountNumber;
    }
}
