var visitor_detail_button = document.querySelectorAll('.visitor_detail_button');
var exit_button_all = document.querySelectorAll('.exit_button');

var search_form = document.querySelector('#all_search').onsubmit = ()=>{
	alert('submitted');
	console.log('submitted');
	const input = document.querySelector('#search_input').value;
	console.log(input);

	var request = new XMLHttpRequest();

	request.onload = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				document.querySelector('')
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


document.querySelectorAll('.visitor_detail_button').forEach(function(button){
	button.addEventListener('click', function(){
		var id = button.dataset.id;
		document.querySelectorAll('.show_details').forEach(function(card_detail){
			if(card_detail.dataset.id === id){
				card_detail.style.display = "block";
				document.querySelector('.cover').style.display = "block";
			}
		});
	})
});

exit_button_all.forEach(function(button){
	button.addEventListener('click', function(){
		var visitor_id = this.dataset.id;
		// console.log(visitor_id);

		var httpRequest = new XMLHttpRequest();

		// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// httpRequest.open("POST", '/exit', true);

		httpRequest.onload = function(){
			try{
				if(httpRequest.readyState === XMLHttpRequest.DONE){
					if(httpRequest.status === 200){
						console.log(JSON.parse(httpRequest.responseText));
						document.querySelectorAll('.card').forEach(function(card){
							var id = card.dataset.id;
							if(id === visitor_id){
								card.style.animationPlayState = "running";
							}
						});

						// history.pushState(null, 'exit', 'exit')
					}
					else
						console.log("nothing here little boy");
				}
			}catch(error){
				console.log(error);
			}
		};

		// httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		var data = new FormData();
		data.append('id', visitor_id);

		httpRequest.open("POST", window.origin + '/exit', true);

		httpRequest.send(data);

		return false;
});})