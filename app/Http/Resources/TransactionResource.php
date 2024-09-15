<?php

namespace App\Http\Resources;

<<<<<<< HEAD
=======
use App\Models\Account;
use Carbon\Carbon;
>>>>>>> 66c4abc0cfb84b48a0606916701b5ba866018f4e
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
<<<<<<< HEAD
            'account_id' => $this->account_id,
            'transaction_type' => $this->transaction_type,
=======
            'account' => new AccountResource($this->account),
            'target_account' => $this->target_account_id ? new AccountResource(Account::find($this->target_account_id)) : null,
            'user' => new UserResource($this->account->user),
            'type' => $this->transaction_type,
>>>>>>> 66c4abc0cfb84b48a0606916701b5ba866018f4e
            'current' => $this->current,
            'debit' => $this->debit,
            'credit' => $this->credit,
            'final' => $this->final,
<<<<<<< HEAD
            'target_account_id' => $this->target_account_id,
            'transaction_date' => $this->transaction_date,
=======
            'date' => Carbon::parse($this->transaction_date)->format('Y-m-d H:i:s'),
>>>>>>> 66c4abc0cfb84b48a0606916701b5ba866018f4e
        ];
    }
}
