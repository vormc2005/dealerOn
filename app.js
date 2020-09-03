
//All taxed at 10% unles books, food and medical
//Imported get 5% tax on all

    let purchasedItems =[]
    let totalReceipt = []
    let totalWithTax 
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
    let totalWithTax;   
    
    if(this.imported === true){
       
        if(this.category==="Book" || this.category==="Medical product" || this.category==="Food"){
            totalWithTax = this.price * Taxes.importTax + this.price
            console.log(totalWithTax)
            purchasedItems.push({
                name:this.name,
                total:totalWithTax
            })
           
        }else{
            totalWithTax = (this.price * Taxes.importTax)+(this.price*Taxes.basicTax) + this.price
            console.log(totalWithTax)   
            purchasedItems.push({
                name:this.name,
                total:totalWithTax
            })
        }
    }else if(this.imported === false){
        if(this.category==="Book" || this.category==="Medical product" || this.category==="Food"){
            totalWithTax = this.price
            console.log(totalWithTax)
            purchasedItems.push({
                name:this.name,
                total:totalWithTax
            })
        }else{
            totalWithTax = this.price * Taxes.basicTax + this.price
             purchasedItems.push({
                name:this.name,
                total:totalWithTax
            })
        }
    }    
     
}


console.log(purchasedItems)


var board = new Product("Board", 100, "Book", true)
var byciccle = new Product("MDX", 1000, "Other", false )
console.log(board)
board.calcTotal()
byciccle.calcTotal()



