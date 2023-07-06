// let date = new Date();
// date.setHours(new Date().getHours() + 5);
// if(document.cookie.indexOf('id') == -1){
// 	document.cookie = `id=${1}; expires=${date.toUTCString()}`;
// }

// let form = document.forms[0];
// let email = form.email;
// let password = form.password;
// let link = document.querySelector('form a');
// let wrong = document.querySelectorAll('form span');

// link.addEventListener('click', (e) => {
// 	if(!checkEmail(email.value)){
// 		wrong[0].classList.add('wrong');
// 		e.preventDefault();
// 	}
// 	if(!checkUser(email.value, password.value)){
// 		setCookie(email, password);
// 		e.preventDefault();
// 	}
// });
// email.addEventListener('input', () => {
// 	deleteWrong(wrong[0]);
// })
// password.addEventListener('input', () => {
// 	deleteWrong(wrong[1]);
// })
// function getId(){
// 	let index = document.cookie.indexOf('id');
// 	let id = +(document.cookie[index + 3]);
// 	document.cookie = `id=${id}; expires=${date.toUTCString()}`;
// 	return id;
// }
// function deleteWrong(wrong){
// 	wrong.classList.remove('wrong');
// }

// function checkEmail(email){
// 	if(email.length == 0){
// 		return false;
// 	}
// 	if(!/@/.test(email)){
// 		return false;
// 	}
// 	return true;
// }
// function setCookie(email, password){
// 	date = new Date();
// 	date.setHours(new Date().getHours() + 5);
// 	let id = getId();
// 	document.cookie = `user${id}=${email.value}; expires=${date.toUTCString()}`;
// 	document.cookie = `password${id+1}=${password.value}; expires=${date.toUTCString()}`;
// }
// function getCookie(){
// 	let res = document.cookie.split('; ');
// 	let arr = [];
// 	for(let i = 0; i < res.length; i++){
// 		let obj = {};
// 		user = res[i].split('=');
// 		if(user[0].indexOf('user') != -1){
// 			obj.user = user[1];
// 			number = user[user.length - 1];
// 			for(let j = 0; j < res.length; j++){
// 				tmp = res[j].split('=');
// 				if(tmp[0].indexOf('password') != -1){
// 					if(tmp[0][tmp[0].length - 1] == number){
// 						obj.password = tmp[1];
// 					}
// 				}
// 			}
// 		} else {
// 			continue;
// 		}
// 		arr.push(obj);
// 	}
// 	return arr;
// }

// function checkUser(email, password){
// 	let users = getCookie();
// 	for(let i = 0; i < users.length; i++){
// 		if(users[i].user == email && users[i].password == password){
// 			return true;
// 		}
// 	}
// 	return false;
// }






// 22222222222222222222222222222222222222222222222
let date = new Date();
date.setHours(new Date().getHours() + 5);

let form = document.forms[0];
let email = form.email;
let password = form.password;
let link = document.querySelector('form a');
let wrong = document.querySelectorAll('form span');

link.addEventListener('click', (e) => {
	if(!checkEmail(email.value)){
		wrong[0].classList.add('wrong');
		e.preventDefault();
		return;
	}
	if(!checkPassword(password.value)){
		wrong[1].classList.add('wrong');
		e.preventDefault();
		return;
	}
	if(checkUser(email.value, password.value)){
		checkUser(email.value, password.value);
	}
	setCookie(email.value, password.value);
});
email.addEventListener('input', () => {
	deleteWrong(wrong[0]);
})
password.addEventListener('input', () => {
	deleteWrong(wrong[1]);
})

function deleteWrong(wrong){
	wrong.classList.remove('wrong');
}

function checkEmail(email){
	if(email.length == 0){
		return false;
	}
	if(!/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/.test(email)){
		return false;
	}
	return true;
}
function checkPassword(password) {
	return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/.test(password);

}
function setCookie(email, password){
	let date = new Date();
	date.setHours(new Date().getHours() + 5);
	let obj = {
		email:email, 
		password:password
	}
	let arr = [];
	if(getCookie() != null){
		arr = getCookie();
	}
	if(checkUser(email, password)){
		return;
	}
	arr.push(obj);
	document.cookie = `current=${arr.length - 1}; expires=${date.toUTCString()}`;
	document.cookie = `users=${JSON.stringify(arr)}; expires=${date.toUTCString()}`;
}
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

function checkUser(email, password){
	let users = getCookie();
	if(!users) return false;
	for(let i = 0; i < users.length; i++){
		if(users[i].email == email && users[i].password == password){
			document.cookie = `current=${i}; expires=${date.toUTCString()}`;
			return true;
		}
	}
	document.cookie = `current=${users.length}; expires=${date.toUTCString()}`;
	return false;
}