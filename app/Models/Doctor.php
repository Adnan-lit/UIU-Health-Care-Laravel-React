<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Doctor extends Model
{
    //
    use HasFactory;

    protected $primaryKey = 'doc_id';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'specialty',
        'educations',
        'experiences',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function consultations(): HasMany
    {
        return $this->hasMany(Consultation::class, 'doc_id', 'doc_id');
    }


}
