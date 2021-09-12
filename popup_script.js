//the popup is what opens when you click the icon on the top right

chrome.runtime.sendMessage({
message:"get_product" //get_name
}, response => {
	if(response.message === 'success'){
		ele = document.getElementById('products');

		//all products
		for (const [key,value] of Object.entries(response.payload['products'])){
			title = value['title'];
			img = value['image'];
			price = value['price'];


			product = document.createElement('DIV');
			product.innerHTML = ` ${title}${img}${price}`;

			ele.appendChild(product);
		

		}

	}
}

);