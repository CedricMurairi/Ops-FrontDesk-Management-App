var visitor_detail_button = document.querySelectorAll('.visitor_detail_button');
var exit_button_all = document.querySelectorAll('.exit_button');

// const template = Handlebars.compile(document.querySelector('#card').innerHTML);

// test code start. To be deleted

// console.log(document.querySelector('#card').innerHTML);

// const content = template({ name: "Cedric", age: "24" });

// const template1 = Handlebars.compile('<li class="{{ number }}">my name is {{ name }}</li> <h1>Let\'s go to the next {{ option }}</h1');

// const content1 = template1({ number: "3", name: "CedricMurairi", option: "level" });

// document.querySelector('#left-footer-component').onclick = function(){
// 	console.log('left-footer clicked');
// 	document.querySelector('#entries').innerHTML = content1;
// }


var source = Handlebars.compile(document.getElementById("entry-template").innerHTML);

var html = source({ title: "My New Post", body: "This is my first post!" });

console.log(html);
// test block, test code end of

// console.log(content1);

window.addEventListener('click', event => {
	if (event.target === document.querySelector('.cover')) {
		document.querySelector('.cover').style.display = "none";
		document.querySelectorAll('.show_details').forEach(card => {
			card.style.display = "none";
		})
	}
});

document.querySelector('#all_search').onsubmit = () => {
	alert('submitted');
	console.log('submitted');
	const input = document.querySelector('#search_input').value;

	var request = new XMLHttpRequest();

	request.onload = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				// document.querySelector('#entries').innerHTML = JSON.parse(request.responseText);
				console.log(JSON.parse(request.responseText));
			}
		}
		else
			console.log('No response for now');
	}

	request.open('POST', window.origin + '/search', true);

	var data = new FormData();
	data.append("visitor_name", input);

	request.send(data);

	return false;
}


document.querySelectorAll('.visitor_detail_button').forEach(function (button) {
	button.addEventListener('click', function () {
		var id = button.dataset.id;
		document.querySelectorAll('.show_details').forEach(function (card_detail) {
			if (card_detail.dataset.id === id) {
				card_detail.style.display = "block";
				document.querySelector('.cover').style.display = "block";
			}
		});
	})
});

exit_button_all.forEach(function (button) {
	button.addEventListener('click', function () {
		var visitor_id = this.dataset.id;
		// console.log(visitor_id);

		var httpRequest = new XMLHttpRequest();

		// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// httpRequest.open("POST", '/exit', true);

		httpRequest.onload = function () {
			try {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						console.log(JSON.parse(httpRequest.responseText));
						document.querySelectorAll('.card').forEach(function (card) {
							var id = card.dataset.id;
							if (id === visitor_id) {
								card.style.animationPlayState = "running";
							}
						});

						// history.pushState(null, 'exit', 'exit')
					}
					else
						console.log("nothing here little boy");
				}
			} catch (error) {
				console.log(error);
			}
		};

		// httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		var data = new FormData();
		data.append('id', visitor_id);

		httpRequest.open("POST", window.origin + '/exit', true);

		httpRequest.send(data);

		return false;
	});
})