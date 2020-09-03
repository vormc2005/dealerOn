const budgetController =(function(a){
    let x =23
    return x+a

    return{
        publicTest: function(b){
            console.log(add(b))
        }

    }
})();

//*****************************************UI Controller*********************************************//
const UiController = (function(){

   

})();



const controller =(function(budgetCtrl, UiCtrl){

var z = budgetCtrl.publicTest(5)

return {
    another:function(){
        console.log(z)
    }
}

})(budgetController, UiController);