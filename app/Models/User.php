<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'role',
        'is_active'
    ];

    public function account()
    {
        return $this->hasOne(Account::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function isActive()
    {
        return $this->is_active == 1;
    }
}
