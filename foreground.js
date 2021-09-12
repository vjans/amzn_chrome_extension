/*
four elements one is name field the second an input field to write the name into 
and the third is for the button
all of them are stored together in the main container
*/
const ce_main_container = document.createElement('DIV');
const ce_name = document.createElement('DIV');
const ce_input = document.createElement('INPUT');
const ce_button = document.createElement('DIV');

//set ids for elements
ce_main_container.classList.add('celwidget');
ce_name.id = 'ce_name';
ce_input.id = 'ce_input';
ce_button.id = 'ce_button';


//add elements to main container
ce_main_container.appendChild(ce_button);

ce_name.innerHTML = 'HELLO NAME';
ce_button.innerHTML = 'Remember';

//add all elements to the body of the current website
//document.querySelector('body').appendChild(ce_main_container);

//"a-section a-spacing-none a-padding-none"

//var parentGuest = document.getElementById("a-section a-spacing-none a-padding-none");
ele = document.getElementById("exports_desktop_qualifiedBuybox_secureTransaction_feature_div");

document.getElementById("exports_desktop_qualifiedBuybox_buyNow_feature_div").parentNode.insertBefore(ce_main_container,ele);
//insertAfter(div,ce_main_container); //.parentNode.append(ce_main_container);
console.log("AFTER");



//search for this in code exports_desktop_qualifiedBuybox_buyNow_feature_div

chrome.runtime.sendMessage({
message:"get_name"
}, response => {
	if(response.message === 'success'){
		ce_name.innerHTML = `Hello ${response.payload}`;
	}
}

);

function get_product_data(){
	//this should also later be getting the product id in order to remember
	//which products have been saved more easily

	tit = document.getElementById("productTitle").textContent.replace(/(\r\n|\n|\r)/gm, "");
	//previous price = "priceBlockStrikePriceString a-text-strike"
	pr = document.getElementById("priceblock_ourprice");
	if (pr === null){
		pr = document.getElementById("priceblock_dealprice");
	}if (pr === null){
		pr = document.getElementById("priceblock_dealprice");
	}
	pr = pr.textContent.replace(/(\r\n|\n|\r)/gm, "");

	//img = document.getElementById("/a-autoid-[0-9]*-/announce").innerHTML;
	img = document.getElementsByClassName("a-button a-button-thumbnail a-button-toggle a-button-selected a-button-focus")[0].querySelector("[id^=a-autoid-][id$=-announce]").innerHTML;

	return {title:tit,price:pr,image:img};
}

//when the button is clicked (which is only possible on a product page)
//get_product_data is called and the data is sent to the backend

ce_button.addEventListener('click',()=>{

product_data = get_product_data();
console.log(product_data);

chrome.runtime.sendMessage({
	message: "save_product", //change name
	payload: product_data
},response => {
	if(response.message === 'success'){
		ce_button.innerHTML = `SAVED`;
	}

	});

})
