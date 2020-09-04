

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



var showAddedItems = function () {    
    for (var i = 0; i < totalArray.length; i++) {
       var receiptInfo =  {
         prodName: totalArray[i].name,
         prodQty: totalArray[i].quantity,
         prodPrice: totalArray[i].price,
      //round to nearest 0.05 cents
         prodSalesTax: parseFloat((Math.ceil(totalArray[i].totalSalesTax*20-0.5)/20).toFixed(2)),       
         prodImportTax: parseFloat((Math.ceil(totalArray[i].importTax*20-0.5)/20).toFixed(2)),       
//calculations
         importedPrice: function(){return this.prodPrice+this.prodImportTax},
         totalOfProducts: function(){ return this.prodQty*this.prodPrice+this.prodImportTax},
            pushToPrices: function(){ 
                priceArray.push(this.totalOfProducts())
                console.log(priceArray)            
            },
            pushToSalesTax: function(){
                salesTaxArray.push(this.prodSalesTax)
                console.log(salesTaxArray)
            },

            totalPriceintheArray: function(){
                var sumPrices = 0
                for(var i= 0; i< priceArray.length; i++){
                    sumPrices += priceArray[i]
                }
                console.log(sumPrices)
                return sumPrices
            },

            totalOfSalesTax: function(){
                var sumTaxes = 0
                for(var i= 0; i< salesTaxArray.length; i++){
                    sumTaxes += salesTaxArray[i]
                }
                console.log(sumTaxes)
                return sumTaxes
            },

            

        }
        receiptInfo.pushToPrices();
        receiptInfo.pushToSalesTax();
       
        var html, newHtml
        html=  '<div class="row" id="to_clear" ><p class="mr-2 to_clear" id="to_clear">%qty%</p><p class="mr-2 to_clear" id="to_clear"">%Name%</p><p class="mr-2 to_clear" id="to_clear"> @ %price%</p></div>'
            newHtml = html.replace('%Name%', receiptInfo.prodName)
            newHtml = newHtml.replace('%qty%', receiptInfo.prodQty)
            newHtml = newHtml.replace('%price%', receiptInfo.prodPrice)    // console.log(newHtml)
    
        document.querySelector('#input_body').insertAdjacentHTML('beforeend', newHtml)
    
    
        var receiptHtml, newReceiptHtml, totals, newTotals
        receiptHtml =  ' <div class="row" id="to_clear"><p class="print_name_total mr-2" id="to_clear">%Name%</p><p class="print_total_price mr-2" id="to_clear">%totalprice%</p><p class="print_total_qty mr-2" id="to_clear">%qty*price%</p></div>' 
        newReceiptHtml= receiptHtml.replace('%Name%', receiptInfo.prodName)
        newReceiptHtml= newReceiptHtml.replace('%totalprice%', receiptInfo.totalOfProducts())
        newReceiptHtml= newReceiptHtml.replace('%qty*price%', `${receiptInfo.prodQty} @ ${receiptInfo.importedPrice()}`)               
       
        document.querySelector('#output_body').insertAdjacentHTML('beforeend', newReceiptHtml)
    
       


    }

    totals = '<div class="salestax">%Total Sales Tax: $% </div><div class="total-sale">%Total Sale: $%</div> '
    newTotals = totals.replace('%Total Sales Tax: $%', `Total Sales Tax: $${receiptInfo.totalOfSalesTax()}`)
    newTotals = newTotals.replace('%Total Sale: $%', `Total Sale: $${receiptInfo.totalPriceintheArray()+receiptInfo.totalOfSalesTax()}`)
    document.querySelector('#totals').insertAdjacentHTML('beforeend', newTotals)


    receiptInfo.pushToPrices();
    receiptInfo.pushToSalesTax();
    // receiptInfo.totalPriceintheArray();
    // receiptInfo.totalOfSalesTax()
   
    console.log(receiptInfo)  
//    return receiptInfo

}



var addItems = function (quantity, name, price, category, imported) {
    if (quantity === "NaN" || name === '') {
        return alert("All fields need to bbe filled in!");
    }
    else {
        var totalSalesTax = new Product(quantity, name, price, category, imported).calcSalesTax();
        var importTax = new Product(quantity, name, price, category, imported).calcImport();
        // console.log(totalSalesTax);
        // console.log(importTax);
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
    document.getElementById('output_body').innerHTML = "";
    document.getElementById('input_body').innerHTML = "";
    document.getElementById('totals').innerHTML = "";   
    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("output").style.visibility = "visible";   
   showAddedItems()     
    
});
seeAdded.addEventListener('click', function (e) {
    e.preventDefault();   
    document.getElementById('output_body').innerHTML = "";
    document.getElementById('input_body').innerHTML = "";
    document.getElementById('totals').innerHTML = "";
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("output").style.visibility = "hidden";    
    showAddedItems();
    
});

document.getElementById('output_body').innerHTML = "";
document.getElementById('input_body').innerHTML = "";
document.getElementById('totals').innerHTML = "";
