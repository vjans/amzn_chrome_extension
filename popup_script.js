//the popup is what opens when you click the icon on the top right

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function compare_prices(p1,p2){
	return true;
};

chrome.runtime.sendMessage({
message:"get_product" //get_name
}, response => {
	if(response.message === 'success'){
		ele = document.getElementById('products');

		

		//all products
		for (const [key,value] of Object.entries(response.payload['products'])){
			title = truncate(value['title'],60);
			img = value['image'];
			price = value['price'];
			current_price = "5,99$";
			link = "http://www.google.com"; //change to affiliate link in the future

			product = document.createElement('DIV');

			product.innerHTML = ` 
			<div class="product">
				<div class="p_image">
				${img}
				</div>
				<div class="p_data">
					<div class="p_name"><a href="${link}" target="_blank">${title}</a></div>
					<div class="p_price">
						<div class="p_prev_price">${price}</div><div class="p_deal_price">${current_price}</div>
					</div>					
					

				</div>
				<div class="p_del_btn">(X)</div>
			</div>
			`;

			ele.appendChild(product);
		

		}	
	}
}

);


/*


*/
