$(function() {
	//this function serializes the form into json
	//TODO: there seems to be a synchronicity problem here such that serialized is empty at the end
	//	maybe use traditional loops instead of .each to fix it?
	function serialize() {
		var serialized = [];
		$("#products").children("div.product").each(function() {
			var product = {};
			$(this).find("input[type='text']").each(function() {
				var key = $(this).attr("name");
				var value = $(this).val();
				product[key] = value;
			});
			serialized[$(this).attr("name")] = product;
		});

		console.log(JSON.stringify(serialized));
	}

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
	]

	//iterate over products and assemble templates for each
	var source   = $("#product-template").html();
	var template = Handlebars.compile(source);
	for (var p in catalog) {
		$("#products").append(template(catalog[p]));
	}

	//add a submit button to the form
	var submit = $("<button />", {
		text: "Serialize",
		click: serialize
	});
	$("#products").append(submit);
});
