let name_ = document.forms[0].Name;
let lastname = document.forms[0].lastname;
let birthdate = document.forms[0].birthdate;
let gender = document.forms[0].gender;
let phone = document.forms[0].phone;
let skype = document.forms[0].skype;

window.addEventListener('DOMContentLoaded', () => {
	let res = getCookie();
	let id =  getCurrent();
	let user = res[id];
	document.querySelector('#user').textContent = user.email;
	if(Object.keys(user).length > 2){
		showInfo(user);
		return;
	}
	document.querySelector('input[type="button"]').addEventListener('click', () => {
		let flag = true;
		if(!checkName(name_.value)){
			console.log('no ok');
			flag = false;
		}
		if(!checkName(lastname.value)){
			console.log('no ok');
			flag = false;

		}
		if(!checkYear(birthdate.value)){
			console.log('no ok');
			flag = false;

		}
		if(!checkPhone(phone.value)){
			console.log('no ok');
			flag = false;
		}
		if(!checkSkype(skype.value)){
			console.log('no ok');
			flag = false;
		}
		if(!flag) return;
		addInfo(res[id]);
		let date = new Date();
		date.setHours(new Date().getHours() + 5);
		document.cookie = `users=${JSON.stringify(res)}; expires=${date.toUTCString()}`;
	})
})

function getCookie(){
	let res = document.cookie.split('; ');
	for(let i = 0; i < res.length; i++){
		let s = res[i].split('=');
		if(s[0] == 'users'){
			return JSON.parse(s[1]);
		}
	}

	return null;
}


function getCurrent(){
	let res = document.cookie.split('; ');
	for(let i = 0; i < res.length; i++){
		let s = res[i].split('=');
		if(s[0] == 'current'){
			return +s[1];
		}
	}
}

function addInfo(obj){
	obj.firstName = name_.value;
	obj.lastName = lastname.value;
	obj.birthdate = birthdate.value;
	obj.gender = gender.value;
	obj.phone = phone.value;
	obj.skype = skype.value;
}
function showInfo(obj){
	name_.value = obj.firstName;
	lastname.value = obj.lastName;
	birthdate.value = obj.birthdate;
	gender.value = obj.gender;
	phone.value = obj.phone;
	skype.value = obj.skype;

	let dis = document.forms[0].elements;
	for(let i = 0; i < dis.length; i++){
		dis[i].setAttribute('disabled', 'true');
	}
}

function checkName(name){
	return name.length > 20 ? false : /(^[^0-9]\w{1,20}[^0-9]$)/.test(name);
}
function checkYear(birthdate){
	return birthdate >= 1900 && birthdate < new Date().getFullYear()
}
function checkPhone(phone){
	return /^[0-9-\(\) ]{10,20}$/.test(phone);
}
function checkSkype(phone){
	return /^[0-9-\.a-zA-Z]+$/.test(phone);
}