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
ce_main_container.classList.add('ce_main');
ce_name.id = 'ce_name';
ce_input.id = 'ce_input';
ce_button.id = 'ce_button';


//add elements to main container
ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_input);
ce_main_container.appendChild(ce_button);

//add all elements to the body of the current website
document.querySelector('body').appendChild(ce_main_container);


//https://youtu.be/5E94S1J2vBI?t=2202
