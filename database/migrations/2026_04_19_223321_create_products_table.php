<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->enum('category', [
                'categoria1',
                'categoria2',
                'categoria3',
                'categoria4'
            ]);

            $table->integer('stock')->default(0);
            $table->decimal('purchase_price',8,2);
            $table->decimal('sale_price');
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
