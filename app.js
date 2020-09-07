var _this = this;
//variables assignment for event listeners
var addButton = document.getElementById("add_to_list");
var getTotals = document.getElementById("get_totals");
var seeAdded = document.getElementById("see_added");
var reset = document.getElementById("resetButton");
// query selectors, form fileds selection
var getInput = function () {
    return {
        productName: document.querySelector('.product_name').value,
        productPrice: document.querySelector('.product_price').value,
        productCategory: document.querySelector('.product_category').value,
        productImported: document.querySelector('.product_imported').value,
        productQuantity: document.querySelector('.product_quantity').value
    };
};
//Array for output and render
var priceArray = [];
var salesTaxArray = [];
var receiptArray = [];
var totalArray = [];
//Global variables
var input = getInput();
var totalWithTax;
//Assigning tax amounts
var Taxes = {
    basicTax: 0.1,
    importTax: 0.05
};
// toggle receipt visibility
document.getElementById("input").style.visibility = "hidden";
document.getElementById("output").style.visibility = "hidden";
document.getElementById("reset_warning").style.visibility = "hidden";
//Creating object with product
//Object with methods to check adequate taxes
var Product = function (quantity, name, price, category, imported) {
    this.quantity = quantity;
    this.name = name;
    this.price = price;
    this.category = category;
    this.imported = imported;
};
// Calculating sales taxes
Product.prototype.calcSalesTax = function () {
    var totalValue = this.price * this.quantity;
    var salesTax = totalValue * Taxes.basicTax;
    if (this.category === "Book" || this.category === "Medical product" || this.category === "Food") {
        salesTax = 0;
        this.salesT = salesTax;
        // console.log(this.salesT);
        return this.salesT;
    }
    else {
        this.salesT = salesTax;
        // console.log(this.salesT);
        return this.salesT;
    }
};
//Determine amount of Import tax
Product.prototype.calcImport = function () {
    var totalValue = this.price * this.quantity;
    var totalImportTax = totalValue * Taxes.importTax;
    if (this.imported === "yes") {
        this.importTax = totalImportTax;
        // console.log(this.importTax);
        return this.importTax;
    }
    else {
        this.importTax = 0;
        // console.log(this.importTax);
        return this.importTax;
    }
};


//Loop trhough array of objects and get information that is needed
var showAddedItems = function () {
    if(totalArray.length){
        for (var i = 0; i < totalArray.length; i++) {
            var totalOfPrices = 0;
            var totalOfSalesTax = 0;
            var prodName = totalArray[i].name;
            var prodQty = totalArray[i].quantity;
            var prodPrice = parseFloat(totalArray[i].price);
            var prodSalesTax = parseFloat(totalArray[i].totalSalesTax);
            var prodImportTax = totalArray[i].importTax;
            var totalImportPrice = totalArray[i].totalimport;
            totalOfSalesTax += prodSalesTax;
            totalOfPrices += totalImportPrice;
            // console.log (totalOfPrices)
            priceArray.push(totalOfPrices);
            console.log(prodImportTax);
            salesTaxArray.push(totalOfSalesTax);
            // console.log(salesTaxArray);
            //*****************Render receipt*************************************** */
            renderReceipt(prodName, totalImportPrice, prodQty, prodPrice, prodImportTax);
            document.getElementById("output").style.visibility = "visible";
        }

    }
    else {
        alert("Please click 'Add product' first")
        document.getElementById("output").style.visibility = "hidden";
        return
    }
    
    console.log(totalImportPrice);
    console.log(prodPrice);
};
//***Adding items here then in goes to a Product object, wehre it determines taxes******************************* */
var addItems = function (quantity, name, price, category, imported) {
    if (quantity === "NaN" || name === '') {
        document.getElementById("input").style.visibility = "hidden";
        return alert("All fields need to be filled in!");
    }
    else {
        var totalSalesTax = new Product(quantity, name, price, category, imported).calcSalesTax();
        var importTax = new Product(quantity, name, price, category, imported).calcImport();
        //pushing items to array for a final calculations
        totalArray.push({
            quantity: quantity,
            name: name,
            price: price,
            totalSalesTax: (Math.ceil((totalSalesTax) * 20 - 0.5) / 20),
            importTax: importTax,
            importPrice: (price + importTax),
            totalimport: price * quantity + importTax
        });
        // parseFloat((Math.ceil((importTax) * 20 - 0.5) / 20).toFixed(2))
        //**********************Render shopping list*****************************
        console.log(totalArray)
        document.getElementById("input").style.visibility = "visible";
        renderInputs(name, quantity, price);
    }
};


//***Calculating total in price array and sales tax array */
var totalPriceintheArray = function () {
    if (priceArray.length) {
        var sumPrices = 0;
        for (var i = 0; i < priceArray.length; i++) {
            sumPrices += priceArray[i];
        }
        console.log(sumPrices);
        return sumPrices;
    }
    else {
        return;
    }
};
var totalOfSalesTax = function () {
    if (!salesTaxArray.length) {
        return;
    }
    else {
        var sumTaxes = 0;
        for (var i = 0; i < salesTaxArray.length; i++) {
            sumTaxes += salesTaxArray[i];
        }
        console.log(sumTaxes);
        return sumTaxes;
    }
};
//************************************************************************************************************************************ */
//****************************************RENDER FUNCTIONS****************************************************************************** */
//**********************************************Render total sales tax and total price
var renderTotal = function () {
    var totals, newTotals;
    totals = '<div class="salestax">%Total Sales Tax: $% </div><div class="total-sale">%Total Sale: $%</div> ';
    newTotals = totals.replace('%Total Sales Tax: $%', "Total Sales Tax: $" + totalOfSalesTax().toFixed(2));
    newTotals = newTotals.replace('%Total Sale: $%', "Total Sale: $" + (totalPriceintheArray() + totalOfSalesTax()).toFixed(2));
    document.querySelector('#totals').insertAdjacentHTML('beforeend', newTotals);
};
//Render inputs left side
var renderInputs = function (name, quantity, price) {
    var html, newHtml;
    html = '<div class="row" id="to_clear" ><p class="mr-2 to_clear" id="to_clear">%qty%</p><p class="mr-2 to_clear" id="to_clear"">%Name%</p><p class="mr-2 to_clear" id="to_clear"> @ %price%</p></div>';
    newHtml = html.replace('%Name%', name);
    newHtml = newHtml.replace('%qty%', quantity);
    newHtml = newHtml.replace('%price%', "$" + price.toFixed(2)); // console.log(newHtml)
    document.querySelector('#input_body').insertAdjacentHTML('beforeend', newHtml);
    document.getElementById("myForm").reset();
    console.log(totalArray);
    alert("Your item was saved! Please add another on or choose other ooptions!");
};
//render final receipt
var renderReceipt = function (prodName, totalImportPrice, prodQty, prodPrice, prodImportTax) {
    var receiptHtml, newReceiptHtml;
    var importPriceOutput = prodPrice+(prodImportTax)/(prodQty)
    receiptHtml = ' <div class="row" id="to_clear"><p class="print_name_total mr-2" id="to_clear">%Name%</p><p class="print_total_price mr-2" id="to_clear">%totalprice%</p><p class="print_total_qty mr-2" id="to_clear">%qty*price%</p></div>';
    newReceiptHtml = receiptHtml.replace('%Name%', prodName);
    
    newReceiptHtml = newReceiptHtml.replace('%totalprice%', totalImportPrice.toFixed(2));
    if(totalImportPrice && prodQty > 1){
        newReceiptHtml = newReceiptHtml.replace('%qty*price%', prodQty + " @ $" +  parseFloat(importPriceOutput).toFixed(2));
    }
    else  if(totalImportPrice){
        newReceiptHtml = newReceiptHtml.replace('%qty*price%', "");
     }    
    else if (prodQty > 1) {
        newReceiptHtml = newReceiptHtml.replace('%qty*price%', prodQty + " @ $" + (prodPrice).toFixed(2));
    }
    else {
        newReceiptHtml = newReceiptHtml.replace('%qty*price%', "$" + (prodPrice).toFixed(2));
    }
    document.querySelector('#output_body').insertAdjacentHTML('beforeend', newReceiptHtml);
};
//*******************************************************Event listeners*******************************************************//
//Add Product button
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    // document.getElementById("input").style.visibility = "visible";
    document.getElementById("output").style.visibility = "hidden";
    var input = getInput();
    // console.log(input)
    addItems(parseInt(input.productQuantity), input.productName, parseFloat(input.productPrice), input.productCategory, input.productImported);
});
//Show Receipt button
getTotals.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('output_body').innerHTML = "";
    document.getElementById('input_body').innerHTML = "";
    document.getElementById('totals').innerHTML = "";
    document.getElementById("input").style.visibility = "hidden";    
    // document.getElementById("get_totals").style.visibility = "hidden";
    document.getElementById("hide_unhide").style.visibility = "hidden";
    document.getElementById("reset_warning").style.visibility = "visible";
    showAddedItems();
    renderTotal();
    // document.getElementById("output").style.visibility = "visible";
});
reset.addEventListener('click', function (e) {
    e.preventDefault();
    location.reload();
});
