var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({ //create connection to mysql db
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Batman9!",
    database: "bamazon_db"
});


function showProducts(callback) { //display ID, name, & price of all items for sale
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            console.log("ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price + "\n");
        }
        callback();
    });
}


function inquirerPrompt() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the item you'd like to purchase?",
                name: "searchedId"
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "requestedQuantity"
            }
        ]).then (function(inquirerResponse, err) {
            var searchedId = parseInt(inquirerResponse.searchedId);
            var requestedQuantity = parseInt(inquirerResponse.requestedQuantity);
            connection.query("SELECT * FROM products WHERE item_id = ?", searchedId, function(err, res) {
                //if (err) throw err;
                if (!res[0]) {
                    console.log("Please enter a valid ID.");
                    inquirerPrompt(); //NEED OPTION TO RE-ENTER ID!!!!!!!!!!!!!! re-run function?????????
                } else {
                    var price = parseInt(res[0].price);
                    var stock_quantity = parseInt(res[0].stock_quantity);
                    if ((requestedQuantity < 1 ) || (Number.isInteger(requestedQuantity) != true)) { //make sure quantity user entered is valid and > 0
                        console.log("Please enter a valid quantity.");
                        inquirerPrompt(); //NEED OPTION TO RE-ENTER QUANTITY!!! re-run function????????????
                    } else {
                        function checkQuantity() { 
                            if ((stock_quantity - requestedQuantity) < 1) {
                                console.log("Insufficient quantity!");
                                inquirerPrompt(); //NEED OPTION TO CHOOSE NEW ID!!!!!!!!!! re-run function?????
                            } else {
                                console.log("The price is $" + price + ".");
                                function placeOrder() { 
                                    var moneySpent = (requestedQuantity * price);
                                    console.log("You've spent " + moneySpent + " dollars.")
                                    function updateQuantity() { //update quantity remaining in database - OK????????????????
                                        var newQuantity = (stock_quantity - requestedQuantity);
                                        connection.query(
                                            "UPDATE products SET stock_quantity = " + newQuantity + " " + "WHERE item_id = " + searchedId
                                        )
                                        console.log(newQuantity);
                                    }
                                    updateQuantity();
                                } //would you like to buy another item????????????????????????
                                placeOrder();
                            }
                        }
                        checkQuantity();
                    }
                }
    });
    });
}


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts(inquirerPrompt); //once connection is established, display available products
    //connection.end();
});