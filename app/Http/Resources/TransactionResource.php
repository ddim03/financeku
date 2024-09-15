<?php

namespace App\Http\Resources;

use App\Models\Account;
use Carbon\Carbon;
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
            'account' => new AccountResource($this->account),
            'target_account' => $this->target_account_id ? new AccountResource(Account::find($this->target_account_id)) : null,
            'user' => new UserResource($this->account->user),
            'type' => $this->transaction_type,
            'current' => $this->current,
            'debit' => $this->debit,
            'credit' => $this->credit,
            'final' => $this->final,
            'date' => Carbon::parse($this->transaction_date)->format('Y-m-d H:i:s'),
        ];
    }
}