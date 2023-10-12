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
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id('invoiceDetail_id');
            $table->unsignedBigInteger('invoice_Id')->nullable(true);
            $table->unsignedBigInteger('product_Id')->nullable(true);
            $table->decimal('Rate', 10, 2);
            $table->string('Unit');
            $table->integer('Qty');
            $table->decimal('Disc_Percentage', 5, 2);
            $table->decimal('NetAmount', 10, 2);
            $table->decimal('TotalAmount', 10, 2);
            $table->foreign('invoice_Id')->references('invoice_id')->on('invoice_master');
            $table->foreign('product_Id')->references('id')->on('product_master');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_details');
    }
};
