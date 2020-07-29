var visitor_detail_button = document.querySelectorAll('.visitor_detail_button');
var exit_button_all = document.querySelectorAll('.exit_button');

var source = Handlebars.compile(document.getElementById("entry-template").innerHTML);

// compile the visitor card template blueprint for futute usage
var template_card_blueprint = Handlebars.compile(document.getElementById("template_card").innerHTML);

// var html = source({ title: "My New Post", body: "This is my first post!" });

// console.log(html);

window.addEventListener('click', event => {
	// check if the user clicks the cover abckground of the show-detail card to hide both the card and the cover
	if (event.target === document.querySelector('.cover')) {
		document.querySelector('.cover').style.display = "none";
		document.querySelectorAll('.show_details').forEach(card => {
			card.style.display = "none";
		})
	}

});


if(document.querySelector('#all_search') !== null){

	document.querySelector('#all_search').onsubmit = () => {

		let visitor_result = [];
		const input = document.querySelector('#search_input').value;

		var request = new XMLHttpRequest();

		request.onload = function () {

			if (request.readyState === XMLHttpRequest.DONE) {

				if (request.status === 200) {
					// document.querySelector('#entries').innerHTML = JSON.parse(request.responseText);
					let response = JSON.parse(request.responseText);
					// console.log(response);
					try{
						// loop over the array json returned by the server and check for the boolean value *visiot_exist
						response.forEach((element_response) => {

							if(element_response.visitor_exist){
								visitor_result.push(element_response);
							}

						});
						// console.log(visitor_result);
						let final_card_template = template_card_blueprint({ visitor: visitor_result });
						// console.log(final_card_template);
						document.getElementById('main_section').innerHTML = final_card_template;

					}catch(e){
						console.log({'message': 'No such a visitor in our records'});
						console.log(e);
					}
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
}


document.querySelectorAll('.visitor_detail_button').forEach((button) => {
	button.addEventListener('click', () => {
		showCardDetail(button);
	})
});


function showCardDetail(button){
	console.log('print details')
	var id = button.dataset.id;
	document.querySelectorAll('.show_details').forEach(function (card_detail) {
		// check if the visitor card data-id is equal to the clicked button's id to display details about that specif user id
		if (card_detail.dataset.id === id) {
			card_detail.style.display = "block";
			document.querySelector('.cover').style.display = "block";
		}

	});
}


exit_button_all.forEach(function (button) {
	button.addEventListener('click', function () {
		exitCampus(button);
	});
})


function exitCampus(button){
	// visitor id is the id of the clicked button
	var visitor_id = button.dataset.id;
	console.log(visitor_id);

	var httpRequest = new XMLHttpRequest();

	httpRequest.onload = function () {
		try {

			if (httpRequest.readyState === XMLHttpRequest.DONE) {

				if (httpRequest.status === 200) {
					console.log(JSON.parse(httpRequest.responseText));
					document.querySelectorAll('.card').forEach(function (card) {
						var id = card.dataset.id;
						// check if the data-id of the card holding the button is the same as the button's data-id -> visitor_id to change it's animation to running and remove the card
						if (id === visitor_id) {
							card.style.animationPlayState = "running";
						}

					});

				}

				else
					console.log("nothing here little boy");
			}

		} catch (error) {
			console.log(error);
		}
	};

	var data = new FormData();
	data.append('id', visitor_id);

	httpRequest.open("POST", window.origin + '/exit', true);

	httpRequest.send(data);

	return false;
}