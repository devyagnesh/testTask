const customerNameEle = document.querySelector("#customername");
const productNameEle = document.querySelector("#product");
const rateTextNode = document.querySelector("#rate");
const rateInputEle = document.querySelector("#rateinput");
const unitInputEle = document.querySelector("#unitinput");
const unitTextNode = document.querySelector("#unit");
const quantityEle = document.querySelector("#quantity");
const discountEle = document.querySelector("#discount");
const saveButtonEle = document.querySelector("#savebtn");
const netAmountTextNode = document.querySelector("#netamount");
const totalAmountTextNode = document.querySelector("#totalamount");
const netAmountInput = document.querySelector("#netamoutinput");
const totalAmountInput = document.querySelector("#totalamoutinput");
const message = document.querySelector("#message");
const modal = document.querySelector("#modal");
const finalDataBody = document.querySelector("#finadatabody");

let Quantity = 0;
let rate = 0;
let netAmount = 0;
let totalAmount = 0;
const currentInputData = {};
async function requestData(endpoint, method = "get", data, params) {
    try {
        const res = await fetch(`${endpoint}${params}`);
        const responseData = await res.json();
        return responseData;
    } catch (error) {
        alert(`Something went wrong :( ${error.message}`);
        console.error(error);
        return null;
    }
}

function saveToStorage(data) {
    localStorage.setItem("currentInput", JSON.stringify(data));
}

function displayMessage(messageText, isError = false) {
    message.classList.add(isError ? "text-red-600" : "text-green-600");
    message.textContent = messageText;
}

function updateRateAndUnit(data) {
    currentInputData.rate = data?.rate;
    currentInputData.unit = data?.unit;
    saveToStorage(currentInputData);
    rateTextNode.textContent =
        data?.rate || "Something went wrong while fetching rate";
    unitTextNode.textContent =
        data?.unit || "Something went wrong while fetching unit";

    rateInputEle.value = data?.rate || 0;
    unitInputEle.value = data?.unit || 0;

    Quantity = data?.unit;
    rate = data?.rate;
}

function calculateNetAndTotalAmount(enteredQuantity, discountValue) {
    if (!enteredQuantity || enteredQuantity <= 0) {
        displayMessage("You must add at least 1 quantity", true);
        return;
    } else if (enteredQuantity > Quantity) {
        displayMessage(
            "Entered Quantity should not be greater than product quantity",
            true
        );
        return;
    }

    netAmount = rate;
    totalAmount = netAmount;

    netAmountInput.value = netAmount;
    totalAmountInput.value = netAmount;

    netAmountTextNode.textContent = netAmount;
    totalAmountTextNode.textContent = totalAmount;

    if (discountValue <= 100) {
        netAmount = netAmount - (rate * discountValue) / 100;
        netAmountTextNode.textContent = netAmount;
        netAmountInput.value = netAmount;

        totalAmount = netAmount * enteredQuantity;
        totalAmountTextNode.textContent = totalAmount;
        totalAmountInput.value = totalAmount;
    } else {
        displayMessage("Discount should not be more than 100", true);
    }
}

window.addEventListener("load", () => {
    if (localStorage.getItem("currentInput")) {
        const data = JSON.parse(localStorage.getItem("currentInput"));

        if (data.name) {
            currentInputData.name = data.name;
            currentInputData.prodId = data.prodId;
            currentInputData.quantity = data.quantity;
            currentInputData.discount = data.discount;
            updateRateAndUnit(data);
            calculateNetAndTotalAmount(data.quantity, data.discount);
            customerNameEle.value = data.name || "";
            productNameEle.value = data.prodId || null;
            quantityEle.value = data.quantity || null;
            discountEle.value = data.discount || null;
        }
    }
});

customerNameEle.addEventListener("keyup", function (e) {
    clearTimeout(nameTimer);
    var nameTimer = setTimeout(() => {
        currentInputData.name = e.target.value;
        saveToStorage(currentInputData);
    }, 500);
});

productNameEle.addEventListener("change", async function (e) {
    const data = await requestData("/products/", null, null, e.target.value);
    currentInputData.prodId = e.target.value;
    saveToStorage(currentInputData);
    if (data) {
        updateRateAndUnit(data);
    }
});

quantityEle.addEventListener("focusout", function (e) {
    const enteredQuantity = e.target.value;
    currentInputData.quantity = enteredQuantity;
    saveToStorage(currentInputData);
    calculateNetAndTotalAmount(enteredQuantity, discountEle.value);
});

discountEle.addEventListener("focusout", function (e) {
    const discountValue = e.target.value;
    currentInputData.discount = discountValue;
    saveToStorage(currentInputData);
    calculateNetAndTotalAmount(quantityEle.value, discountValue);
});



function updateTableData(data) {
   
    let htmlFinalDataBodyData = "";

    data.forEach((data) => {
        htmlFinalDataBodyData += `<tr class='ptr'>
        <input type='hidden'  value='${data.productid}' class='oldval'/>
        <td class=''>
        <select class='products'>
        ${products
            .map(
                (prod) =>
                    `<option value="${prod["id"]}" ${
                        prod["id"] == data.productid ? "selected" : null
                    }>${prod["product_name"]}</option>`
            )
            .join("")
            .replaceAll(",", "")}
    </select></td>
    <td class=''>${data.rate}</td>
    <td class=''>${data.unit}</td>
    <td class=''><input type='text' id="qtu${data.productid}" class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value='${data.quantity}'/></td>
    <td class=''><input type='text' id="qtu${data.discount}" class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value='${data.discount}'/></td>
    <td class=''>${data.netamount}</td>
    <td class=''>${data.totalAmount}</td>
    <td><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Delete
</button></td>
        </tr>
        `;
    });
    finalDataBody.insertAdjacentHTML("afterbegin", htmlFinalDataBodyData);
}

saveButtonEle.addEventListener("click", function (e) {
    const name = customerNameEle.value;
    const product = productNameEle.value;
    const rate = rateInputEle.value;
    const unit = unitInputEle.value;
    const quantity = quantityEle.value;
    const discount = discountEle.value;
    const netamount = netAmountInput.value;
    const totalAmount = totalAmountInput.value;
    const finalData = [];

    if (!name || name == "") {
        return displayMessage("customer name is required!", true);
    } else if (!product || isNaN(product) || product == "") {
        return displayMessage("unselected or invalid product !", true);
    } else if (!rate || isNaN(rate) || rate == "") {
        return displayMessage("product must have rate", true);
    } else if (!unit || isNaN(unit) || unit < 0 || unit == "") {
        return displayMessage("invalid product unit", true);
    } else if (
        !quantity ||
        isNaN(quantity) ||
        quantity > unit ||
        quantity < 1
    ) {
        return displayMessage(
            "invalid quantity , quantity should be at least 1 and not more than unit",
            true
        );
    } else if (discount > 100) {
        return displayMessage("discount should notmore than 100 ", true);
    } else if (
        !netAmount ||
        isNaN(netAmount) ||
        netAmount == "" ||
        netAmount < 1
    ) {
        return displayMessage(
            "netAmount is required , provided invalid !",
            true
        );
    } else if (
        !totalAmount ||
        totalAmount == "" ||
        totalAmount < 1 ||
        isNaN(totalAmount)
    ) {
        return displayMessage("invalid total amount !", true);
    }

    finalData.push({
        customername: name,
        productid: product,
        rate: rate,
        unit: unit,
        quantity: quantity,
        discount: discount,
        netamount: netAmount,
        totalAmount: totalAmount,
    });


    modal.classList.remove("hidden");
    updateTableData(finalData);
    document.querySelectorAll(".products").forEach((product) => {
        product.addEventListener("change", async function (e) {
            const selectedProductId = e.target.value;
            const oldValue = e.target.closest('tr').querySelector('.oldval').value;
            
            
          

           
            if (!selectedProductId) {
                return; 
            }
        
            const productData = await requestData("/products/", "get", null, selectedProductId);
            console.log(productData)
            const filterProd = finalData.filter(data=>{
                return data.productid == oldValue;
            })
            if (productData) {
                
                const finalUpdatedProduct = filterProd.map(data=>{
                    return {
                        customername: finalData[0].name,
                        productid: productData.id,
                        rate: productData.rate,
                        unit: productData.unit,
                        quantity: finalData[0].quantity,
                        discount: finalData[0].discount,
                        netamount: 100,
                        totalAmount: 100,
                    }
                })
              

                finalDataBody.innerHTML = "";
                updateTableData(finalUpdatedProduct)
                e.target.closest('tr').querySelector('.oldval').value = productData.id;
            }
        });
    });
});