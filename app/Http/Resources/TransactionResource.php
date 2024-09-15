<?php

namespace App\Http\Resources;

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
            'account_id' => $this->account_id,
            'transaction_type' => $this->transaction_type,
            'current' => $this->current,
            'debit' => $this->debit,
            'credit' => $this->credit,
            'final' => $this->final,
            'target_account_id' => $this->target_account_id,
            'transaction_date' => $this->transaction_date,
        ];
    }
}
