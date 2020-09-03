
//All taxed at 10% unles books, food and medical
//Imported get 5% tax on all


//variables assignment for event listeners
let addButton = document.getElementById("add_to_list")
let getTotals = document.getElementById("get_totals")

// query selectors, form fileds selection
const getInput = ()=>{
    return {
        productName: document.querySelector('.product_name').value,
        productPrice: document.querySelector('.product_price').value,
        productCategory: document.querySelector('.product_category').value,
        productImported: document.querySelector('.product_imported').value
    }
}


    let input = getInput()
    let purchasedItems =[]
    let totalReceipt = []
    let totalWithTax; 
//Assigning tax amounts
const Taxes = {
    basicTax: 0.1,
    importTax: 0.05
    
}
//Creating object with product
const Product = function(name, price, category, imported){
    this.name = name;
    this.price = price;
    this.category = category;    
    this.imported = imported;
    
}
//Calculating taxes
Product.prototype.calcTotal = function(){
    
    
    if(this.imported === true){
       
        if(this.category==="Book" || this.category==="Medical product" || this.category==="Food"){
            totalWithTax = this.price * Taxes.importTax + this.price            
           this.totalPrice = totalWithTax
           console.log(this.totalPrice )
           return this.totalPrice
           
        }else{
            totalWithTax = (this.price * Taxes.importTax)+(this.price*Taxes.basicTax) + this.price             
            this.totalPrice = totalWithTax
           console.log(this.totalPrice )
           return this.totalPrice
        }
    }else if(this.imported === false){
        if(this.category==="Book" || this.category==="Medical product" || this.category==="Food"){
            totalWithTax = this.price
            this.totalPrice = totalWithTax
            console.log(this.totalPrice )
            return this.totalPrice
        }else{
            totalWithTax = this.price * Taxes.basicTax + this.price
            this.totalPrice = totalWithTax
           console.log(this.totalPrice )
           return this.totalPrice
        }
    }    
     
}


console.log(purchasedItems)


var board = new Product("Board", 100, "Book", true)
// var byciccle = new Product("MDX", 1000, "Other", false )
// var byciccle2 = new Product("MDX-imported", 1000, "Other", true )
// console.log(board)
board.calcTotal()
// byciccle.calcTotal()
// byciccle2.calcTotal()
// purchasedItems.push({
//     name:this.name,
//     total:totalWithTax
// })


// ui contorls

// 1. Set up Event listeners
// 2. get values from the fields
// 3. Pass values to a new object
//4. Render values: names and totals




const showTotals =()=>{
    console.log("Totals work")
    // code to calculate totals
}

const addItems = (name, price, category, imported)=>{
    console.log("items Added")
    // code to add Items    
    let product = new Product(name, price, category, imported)
    let total = product.calcTotal()

    console.log(total)
    // purchasedItems.push( product)
}




//*******************************************************Event listeners*******************************************************//
addButton.addEventListener('click', function(e){
    e.preventDefault()
    let input = getInput()
    // console.log(input)
    addItems(input.productName, parseInt(input.productPrice), input.productCategory, input.productImported)

})

getTotals.addEventListener('click', function(e){
    e.preventDefault()
    showTotals()
})
   
// document.addEventListener('keypress', function(e){
//     e.preventDefault()
//     if(e.keyCode === 13 || e.which ===13){
//     showTotals()
//     }
// })
// document.addEventListener('keypress', function(e){
//     e.preventDefault()
//     console.log(e)
//     if(e.keyCode === 43 || e.which === 43){
//     addItems()
//     }
// })
   

