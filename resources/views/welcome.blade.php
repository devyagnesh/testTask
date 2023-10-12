<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}" />
    <title>Document</title>
</head>
<body class="flex justify-center">
    <div class="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="modal">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full" style="width:50rem;max-width:100%">
                    <div class="bg-white px-2 pb-2 pt-2 sm:p-2 sm:pb-2">
                        <div class="mt-3 text-center  sm:text-left">
                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Products</h3>
                            <div class="mt-2">
                                <table class="border-separate border-spacing-2 border border-slate-400" width="100%">
                                    <thead>
                                        <tr>
                                            <th class="font-thin">Product</th>
                                            <th class="font-thin">Rate</th>
                                            <th class="font-thin">Unit</th>
                                            <th class="font-thin">Qty</th>
                                            <th class="font-thin">Disc%</th>
                                            <th class="font-thin">Net Amount</th>
                                            <th class="font-thin">Total</th>
                                            <th class="font-thin">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="finadatabody">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="button"
                            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                        <button type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form class="w-96 p-4">
        <div class="space-y-5">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Information</h2>
                <div class="mt-4">
                    <p id="message"></p>
                    <div class="">
                        <label for="customername" class="block text-sm font-medium leading-6 text-gray-900">Customer
                            name:</label>
                        <div class="mt-2">
                            <input type="text" name="customername" id="customername" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="">
                        <label for="product" class="block text-sm font-medium leading-6 text-gray-900">Product
                            Name:</label>
                        <div class="mt-2">
                            <select id="product" name="product" autocomplete="product-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">
                                <option default>Select Product</option>
                                @foreach ($products as $product)
                                    <option value="{{ $product['id'] }}">{{ $product['product_name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="mt-4">
                        <input type="hidden" name="rateinput" id="rateinput" value="" />
                        <input type="hidden" name="unitinput" id="unitinput" value="" />
                        <p class="block text-sm font-medium leading-6 text-gray-900">Rate: <span id="rate">Select
                                Product</span></p>
                        <p class="block mt-2 text-sm font-medium leading-6 text-gray-900">Unit: <span
                                id="unit">Select Product</span></p>
                    </div>
                    <div class="mt-2">
                        <label for="quantity"
                            class="block text-sm font-medium leading-6 text-gray-900">Quantity:</label>
                        <div class="mt-2">
                            <input type="text" name="quantity" id="quantity"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="">
                        <label for="discount"
                            class="block text-sm font-medium leading-6 text-gray-900">Discount:</label>
                        <div class="mt-2">
                            <input type="text" name="discount" id="discount"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="">
                        <input type="hidden" name="netamoutinput" id="netamoutinput" value="" />
                        <input type="hidden" name="totalamoutinput" id="totalamoutinput" value="" />
                        <p class="block mt-2 text-sm font-medium leading-6 text-gray-900">Net
                            Amount: <span id="netamount">Select Product</span></p>
                        <p class="block mt-2 text-sm font-medium leading-6 text-gray-900">Total
                            Amount: <span id="totalamount">Select Product</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2 flex items-center justify-end gap-x-6">
            <button type="button" id="savebtn"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
    <script>
        const products = @json($products)
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
