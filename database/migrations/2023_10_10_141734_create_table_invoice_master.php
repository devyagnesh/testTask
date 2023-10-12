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
        Schema::create('invoice_master', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->string('invoice_no');
            $table->string("invoice_Date");
            $table->string("customerName");
            $table->decimal('TotalAmount',10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_master');
    }
};
