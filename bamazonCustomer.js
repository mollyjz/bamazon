var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Batman9!",
    database: "bamazon_db"
});


function showProducts(callback) {
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
                if (err) throw err;
                if (!res[0]) {
                    console.log("Please enter a valid ID.");
                    inquirerPrompt();
                } else {
                    var price = parseInt(res[0].price);
                    var stock_quantity = parseInt(res[0].stock_quantity);
                    if ((requestedQuantity < 1 ) || (Number.isInteger(requestedQuantity) != true)) {
                        console.log("Please enter a valid quantity.");
                        inquirerPrompt();
                    } else {
                        function checkQuantity() { 
                            if ((stock_quantity - requestedQuantity) < 1) {
                                console.log("Insufficient quantity!");
                                inquirerPrompt();
                            } else {
                                console.log("The price is $" + price + ".");
                                function placeOrder() { 
                                    var moneySpent = (requestedQuantity * price);
                                    console.log("You've spent " + moneySpent + " dollars.")
                                    function updateQuantity() {
                                        var newQuantity = (stock_quantity - requestedQuantity);
                                        connection.query(
                                            "UPDATE products SET stock_quantity = " + newQuantity + " " + "WHERE item_id = " + searchedId
                                        )
                                    }
                                    updateQuantity();
                                } //ADD -- would you like to buy another item????????????????????????
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
});