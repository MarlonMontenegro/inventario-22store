<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Movement extends Model
{
    protected $fillable = [
        'product_id',
        'type',
        'quatity',
        'description'
    ];

public function product()
{
    return $this->belongsTo(Product::class);
}


}

