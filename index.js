//selectors
const submitt = document.querySelector(".submitt");
const email = document.querySelector(".email");
const pass = document.querySelector(".pass");
const name = document.querySelector(".name");

//event listeners

submitt.addEventListener("click", values);

//functions

function values() {
  console.log("iam klkd");
//   let data = {email:"okaycheck",
//   password:"checkpass",
//   name:"kalyan"

// };

  // fetch("https://localhost:3000/user/register", {
  //   method: "POST", 
  //   body: JSON.stringify(data)
  // }).then(res => {
  //   console.log("Request complete! response:", res);
  // });

  fetch('https://localhost:3000/user/register', {
  method: 'POST',
  mode:"cors",
	body: JSON.stringify({
		email: email.value,
		password: pass.value,
		name: name.value
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
}
