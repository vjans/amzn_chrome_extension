//the popup is what opens when you click the icon on the top right

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function compare_prices(p1,p2){
	return true;
};


function delete_product(k){
			console.log("delete clicked");
			console.log(k);
			chrome.storage.local.get('products', function(result){
			var res = result.products; 
			//if no products saved make dictionary
			if (res === undefined){
				res = {};
			}
			

			//update google storage
			delete res[k];
		

			chrome.storage.local.set(
			{"products":res},
			() => {
				if(chrome.runtime.lastError){
					return;
				}
				
				
			});

		});


			location.reload();
};


chrome.runtime.sendMessage({
message:"get_product" //get_name
}, response => {
	if(response.message === 'success'){
		ele = document.getElementById('products');

		if(typeof response.payload['products'] == 'undefined' || Object.keys(response.payload['products']).length == 0){
			no_product_response = document.createElement('DIV');
			no_product_response.innerHTML = `
			<div class="no_products">
			<p style="font-size:160%;">No products found.<p> 
			Try out saving some products :-)
			</div>
			`;
			ele.appendChild(no_product_response);
		}
		else{
			keys = [];
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
					<div class="p_del_btn" id="${key}">(X)</div>
				</div>
				`;

				ele.appendChild(product);
			
				keys = keys.concat(key);
			}	
			keys.forEach(function(item,index,array){
				console.log(item);
				document.getElementById(item).addEventListener("click",func);
				function func(){

					delete_product(item);
				};
			});


		}
	}
}

);


document.getElementById("options_btn").addEventListener("click",function(){chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });});

document.getElementById("close_btn").addEventListener("click",function(){window.close();});

/*


			for (k in keys){
				console.log("WTF");
				console.log(k);
				console.log(keys[k]);
				console.log("IS GOING ON");
				document.getElementById(keys[k]).onclick = delete_product(keys[k]);
			}
*/
