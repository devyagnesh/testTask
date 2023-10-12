<?php

namespace App\Http\Controllers;

use App\Models\ProductMaster;
use Illuminate\Http\Request;

class IndexController extends Controller
{

    /*
        show default page / with  dynamic product data
    */
    public function showPage() {

        $products = ProductMaster::all()->toArray();
        return view('welcome',compact('products'));
    }


    /**
     * fetch product data when user select item from dropdown
     */

     public function getProductData($id){
        $product = ProductMaster::find($id);

        if(!$product || (count($product->toArray()) < 1)){
            return response()->json([
                "error"=>true,
                "code"=>400,
                "message"=>'no records found'
            ],400);
        }

        return response()->json($product->toArray(),200);
     }
}
