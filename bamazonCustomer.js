var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({ //connection to mysql database
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts(); //once connection is established, display available products
});


function showProducts() { //display ID, name, & price of all items for sale ... IF QUANTITY < 1, "OUT OF STOCK?"
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        for (i=0; i<res.length; i++) {
            console.log(res[i].item_id + "\n");
            console.log(res[i].product_name + "\n");
            console.log(res[i].price + "\n");
        //connection.end();
        }
    });
}


var count = 0;

function inquirerPrompt() {
    if (count <2 ) {
        inquirer.prompt([ //run prompt
            {
                type: "input",
                message: "What is the ID of the item you'd like to purchase?",
                name: "searchedId"
            }, //script ends after this is shown, doesn't wait for me to answer

            {
                type: "input",
                message: "How many would you like to buy?",
                name: "requestedQuantity"
            }

        ]).then (function(inquirerResponse, error) {
            console.log("hey") //doesn't get this far
            console.log(inquirerResponse);
            count++;
            inquirerPrompt();    
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                console.log(res);
                var searchedId = inquirerResponse.searchedId;
                var requestedQuantity = inquirerResponse.requestedQuantity;
                    for (i=0; i<res.length; i++) { //should this all really be inside a for-loop????????????????
                        var item_id = res[i].item_id; //check to see if id entered by user matches id of product in DB
                        var price = res[i].price;
                        var stock_quantity = res[i].stock_quantity;
                
                        if (item_id == searchedId) { //if it does...
                            console.log("The price is $" + price + " .");//display price
                    //need prompt to confirm they want to buy the item once price is displayed?
                
                            if ((requestedQuantity < 1 ) || (Number.isInteger(requestedQuantity) != true)) { //make sure quantity user entered is valid and > 0
                                return error;
                                console.log("Please enter a valid quantity.");
                            };

                            //if valid quantity requested, check quantity remaining in DB
                            function checkQuantity() { //need to pass in any arguments??????????? callbacks??
                                if ((stock_quantity - requestedQuantity) < 1) { //error message if not enough of item left
                                    console.log("Insufficient quantity!")
                                } 
                        //otherwise, place order
                            function placeOrder() { 
                                var moneySpent = (requestedQuantity * price);
                                console.log("You've spent " + moneySpent + " dollars.")
                                //need array of prices, then sum of it??
                            
                                function updateQuantity() { //update quantity remaining in database
                                    var newQuantity = (stock_quantity - requestedQuantity);
                                    //need to connect to mysql again or no? NO???? 
                                    connection.query(
                                        "UPDATE products SET stock_quantity = " + newQuantity + " " + "WHERE item_id = " + searchedId
                                    )
                                }
                            
                                updateQuantity(); //update quantity remaining
                            }
                        
                            placeOrder(); //place order, update quantity remaining
                        //DOES THIS NESTING EVEN MAKE SENSE??????????????????????????
                        }

                    checkQuantity(); //check quantity, place order, update quantity remaining

                }
            //connection.end();
    }
    
    });
        
});
}
}
inquirerPrompt();