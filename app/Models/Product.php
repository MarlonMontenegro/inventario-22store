<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category',
        'stock',
        'purchase_price',
        'sale_price',
        'description'
    ];

    protected $casts = [
    'sale_price' => 'float',
    'purchase_price' => 'float',
];

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }
}
