//All taxed at 10% unles books, food and medical
//Imported get 5% tax on all
//variables assignment for event listeners
var addButton = document.getElementById("add_to_list");
var getTotals = document.getElementById("get_totals");
var seeAdded = document.getElementById("see_added");
// query selectors, form fileds selection
var getInput = function () {
    return {
        productName: (<HTMLInputElement>document.querySelector('.product_name')).value,
        productPrice: (<HTMLInputElement>document.querySelector('.product_price')).value,
        productCategory: (<HTMLInputElement>document.querySelector('.product_category')).value,
        productImported: (<HTMLInputElement>document.querySelector('.product_imported')).value,
        productQuantity: (<HTMLInputElement>document.querySelector('.product_quantity')).value
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
    var totalBeforeSalesTax;
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
var showTotals = function () {
    console.log("Totals work");
    // code to calculate totals
};
var showAddedItems = function () {
    for (var i = 0; i < totalArray.length; i++) {
        var prodName = totalArray[i].name;
        var prodQty = totalArray[i].quantity;
        var prodPrice = totalArray[i].price;
        var prodSalesTax = totalArray[i].totalSalesTax;
        var prodImportTax = totalArray[i].importTax;
        // receipt input
        

    }
};
var addItems = function (quantity, name, price, category, imported) {
    if(quantity==="NaN" || name === ''){
        return alert("All fields need to bbe filled in!")
    }else{
    
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
    addItems(parseInt(input.productQuantity), input.productName, parseInt(input.productPrice), input.productCategory, input.productImported);
});
getTotals.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("output").style.visibility = "visible";
    showTotals();
});
seeAdded.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("output").style.visibility = "hidden";
    showAddedItems();
});
