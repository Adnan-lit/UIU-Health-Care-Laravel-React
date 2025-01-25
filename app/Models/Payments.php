<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payments extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'trx_id',
        'payer_reference',
        'merchant_invoice_number',
        'amount',
        'currency',
        'type',
        'identifier',
        'payer_account',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
