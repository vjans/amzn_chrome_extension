chrome.runtime.onInstalled.addListener(()=>{
	chrome.storage.local.set({
		name: "Jack"
	});
});






function isDeal(product_key){
	//returns true if
	//current price < save price

	return true;
}

function updateBadgeCount(){

	chrome.storage.local.get('products', function(result){
	var products = result.products; 
	//if no products saved make dictionary

	if (products === undefined){
		products = {};
	}
	
	console.log(products);
	cnt = 0;
	for (const [key, value] of Object.entries(products)) {
  	
  		cnt+=isDeal(key);
	
	}

	if (cnt <= 9){

	chrome.action.setBadgeText({text: cnt.toString()});
	
	} else{

	chrome.action.setBadgeText({text: "9+"});
	
	}

	return;
	});
	



}



chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) =>{

	//this might be the wrong place for this
	updateBadgeCount();


	if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
		if(true){ //document.documentElement.outerHTML.contains("exports_desktop_qualifiedBuybox_buyNow_feature_div")
			console.log("AI YA YAY");
			chrome.scripting.insertCSS({
				target:{tabId:tabId},
				files: ["./foreground_styles.css"]
			}).then(()=>{

				console.log("INJECTED FOREGROUND CSS.")

				chrome.scripting.executeScript({
							target: {tabId: tabId},
							files: ["./foreground.js"]
						})
							.then(()=>{

								console.log("INJECTED FOREGROUND SCRIPT.");

							}).catch(err => console.log(err));
			});

		}else{
			console.log("You're fired bud");
		}
		
		

	}

});

/*
chrome.runtime.sendMessage() => send message to all scripts
chrome.tabs.sendMessage() => send script to tab in foreground
*/


function check_duplicates(inst, dic){
	for (const [key,value] of Object.entries(dic)){
		//just check title for now because prices change
		//and maybe img urls too
		if(inst.asin == value.asin){
			console.log("DUPLICATE PRODUCT");
			return true;
		}

	}

	return false;

}



chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
	if(request.message === 'get_product'){
		chrome.storage.local.get('products', data => {
			if(chrome.runtime.lastError){
				sendResponse({
					message: 'fail'
				});
				return;
			}
			sendResponse({
				message: 'success',
				payload: data
			});
		});
		return true;
	}else if (request.message === 'save_product'){

		//gets local storage dict, adds product to it and then saves it
		//idk any better way to do this 
		//js sucks
		//help

		//todo: add check for duplicates

		//get all products from local storage and save in res
		chrome.storage.local.get('products', function(result){
			var res = result.products; 
			//if no products saved make dictionary
			if (res === undefined){
				res = {};
			}
			var id = Math.random().toString(36).substr(2, 5);
			//add payload to dictionary (with random id)

			//only save unique products (BAD CODE)
			if(check_duplicates(request.payload,res) === false){
				res[id
				] = request.payload;
			}

			//update google storage
			console.log("DICT AFTER ADD:");
			console.log(res);
		

			chrome.storage.local.set(
			{"products":res},
			() => {
				if(chrome.runtime.lastError){
					sendResponse({message:'fail'});return;
				}
				
				sendResponse({message:'success'});
			});

		});

		
		return true;
	}
});

