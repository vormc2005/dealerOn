

//All taxed at 10% unles books, food and medical
//Imported get 5% tax on all



//variables assignment for event listeners
var addButton = document.getElementById("add_to_list");
var getTotals = document.getElementById("get_totals");
var seeAdded = document.getElementById("see_added");
// query selectors, form fileds selection
var getInput = function () {
    return {
        productName: document.querySelector('.product_name').value,
        productPrice: document.querySelector('.product_price').value,
        productCategory: document.querySelector('.product_category').value,
        productImported: document.querySelector('.product_imported').value,
        productQuantity: document.querySelector('.product_quantity').value,
        inputBody: '.input_body'
    };
};
var input = getInput();
var totalArray = [];
var totalWithTax;
//Assigning tax amounts
var Taxes = {
    basicTax: 0.1,
    importTax: 0.05
};
// toggle receipt visibility
document.getElementById("input").style.visibility = "hidden";
document.getElementById("output").style.visibility = "hidden";
//Creating object with product
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
// ui contorls
// 1. Set up Event listeners
// 2. get values from the fields
// 3. Pass values to a new object
//4. Render values: names and totals




var priceArray = []
var salesTaxArray = []
//return total of prices
var totalPriceintheArray = ()=>{
    var sumPrices = 0
    for(var i= 0; i< priceArray.length; i++){
        sumPrices += priceArray[i]
    }
    // console.log(sumPrices)
    return sumPrices
}
//Returning total of sales Tax
var totalOfSalesTax = ()=>{
    var sumTaxes = 0
    for(var i= 0; i< salesTaxArray.length; i++){
        sumTaxes += salesTaxArray[i]
    }
    // console.log(sumTaxes)
    return sumTaxes
}




var showAddedItems = function () {
    var html, newHtml, receiptHtml, newReceiptHtml   
    for (var i = 0; i < totalArray.length; i++) {
        var prodName = totalArray[i].name;
        var prodQty = totalArray[i].quantity;
        var prodPrice = totalArray[i].price;
      //round to nearest 0.05 cents
        var prodSalesTax = parseFloat((Math.ceil(totalArray[i].totalSalesTax*20-0.5)/20).toFixed(2));
        var prodImportTax = parseFloat((Math.ceil(totalArray[i].importTax*20-0.5)/20).toFixed(2));
//calculations
        var importedPrice = prodPrice+prodImportTax
        var totalOfProducts = prodQty*importedPrice
//Pushing to arrays
        priceArray.push(totalOfProducts)
        console.log(priceArray)
      
        salesTaxArray.push(prodSalesTax)
        
        // receipt input
       
       
       

    }
    console.log(prodName)
     //html for input        
     html=  '<div class="row" id="to_clear" ><p class="mr-2 to_clear" id="to_clear">%qty%</p><p class="mr-2 to_clear" id="to_clear"">%Name%</p><p class="mr-2 to_clear" id="to_clear"> @ %price%</p></div>'
     newHtml = html.replace('%Name%', prodName)
     newHtml = newHtml.replace('%qty%', prodQty)
     newHtml = newHtml.replace('%price%', prodPrice)        // console.log(newHtml)
    
     document.querySelector('#input_body').insertAdjacentHTML('beforeend', newHtml)
     
 //Html for output
 receiptHtml =  ' <div class="row" id="to_clear"><p class="print_name_total mr-2" id="to_clear">%Name%</p><p class="print_total_price mr-2" id="to_clear">%totalprice%</p><p class="print_total_qty mr-2" id="to_clear">%qty*price%</p></div>' 
     newReceiptHtml= receiptHtml.replace('%Name%', prodName)
     newReceiptHtml= newReceiptHtml.replace('%totalprice%', totalOfProducts)
     newReceiptHtml= newReceiptHtml.replace('%qty*price%', `${prodQty} @ ${importedPrice}`)

     console.log(newReceiptHtml)
    
     document.querySelector('#output_body').insertAdjacentHTML('beforeend', newReceiptHtml)
};
var addItems = function (quantity, name, price, category, imported) {
    if (quantity === "NaN" || name === '') {
        return alert("All fields need to bbe filled in!");
    }
    else {
        var totalSalesTax = new Product(quantity, name, price, category, imported).calcSalesTax();
        var importTax = new Product(quantity, name, price, category, imported).calcImport();
        console.log(totalSalesTax);
        console.log(importTax);
        //pushing items to array for a final calculations
        totalArray.push({
            quantity: quantity,
            name: name,
            price: price,
            totalSalesTax: totalSalesTax,
            importTax: importTax
        });
        document.getElementById("myForm").reset();
        console.log(totalArray);
        alert("Your item was saved! Please add another on or choose other ooptions!");
    }
};
//*******************************************************Event listeners*******************************************************//
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("output").style.visibility = "hidden";
    var input = getInput();
    // console.log(input)
    addItems(parseInt(input.productQuantity), input.productName, parseFloat(input.productPrice), input.productCategory, input.productImported);
});
getTotals.addEventListener('click', function (e) {
    e.preventDefault();    
    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("output").style.visibility = "visible";    
    showAddedItems()
    totalPriceintheArray()
    totalOfSalesTax()
    
    
});
seeAdded.addEventListener('click', function (e) {
    e.preventDefault();   
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("output").style.visibility = "hidden";    
    showAddedItems();
    
});


