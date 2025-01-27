<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryMedicine extends Model
{
    /** @use HasFactory<\Database\Factories\InventoryMedicineFactory> */
    use HasFactory;

    protected $fillable = [
        'medicine_id',
        'stock',
    ];
    protected $primaryKey = 'inventory_medicine_id'; // Use your custom primary key
    public $incrementing = false; // If you are not using auto-increment
    protected $keyType = 'string'; // If the key is not an integer (adjust as needed)



}
