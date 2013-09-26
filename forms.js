/*jslint browser: true*/
/*global $, jQuery, console, Handlebars*/

//this function serializes the form into json
function serialize() {
    "use strict";

    //iterate over each product in the dom
    var serialized = [];
    $("#products").children("div.product").each(function() {

        //serialize each product by looking for input[type=text] elements
        var product = {};
        console.log("serializing " + $(this).attr("name"));
        $(this).find("input[type='text']").each(function() {
            //each input has a name attribute with the name of the value
            console.log("serializing " + $(this).attr("name"));
            var key = $(this).attr("name");
            var value = $(this).val();
            product[key] = value;
        });
        //add the newly serialized product to the array
        serialized.push(product);
    });

    //TODO: this needs to be saved to a file
    console.log(JSON.stringify(serialized));
}

//this function displays the catalog
function display() {
    "use strict";

    //a catalog of products to display
    var catalog = [
        {
            "id": "product.id.1",
            "type": "bundle",
            "colour": "blue"
        },
        {
            "id": "product.id.2",
            "type": "bundle",
            "colour": "red"
        }
    ];

    //iterate over products and assemble templates for each
    var source   = $("#product-template").html();
    var template = Handlebars.compile(source);
    for (var p in catalog) {
        $("#products").append(template(catalog[p]));
    }

    //add a submit button to the form
    var submit = $("<button />", {
        text: "Serialize",
        click: function(e) {
            e.preventDefault();
            serialize();
        }
    });
    $("#products").append(submit);
}

