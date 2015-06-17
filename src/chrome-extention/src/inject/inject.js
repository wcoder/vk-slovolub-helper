(function(){

	'use strict';


	var BACKEND_URL = 'http://.../api.php';

	window.helperStart = function() {
		try {
			var chars = '';

			$('#lettersList').each(function(indx, element){
				chars += $(element).text();
			});

			var wordLength = $('#wordArea').find('.btn').length;

			console.log(chars);
			console.log(wordLength);
			$.ajax({
				url: BACKEND_URL,
				dataType: 'jsonp',
				data: {
					word: chars,
					length: wordLength
				},
				//jsonpCallback: 'showData',
				success: function(response){
					window.showData(response);
				},
				error: function(){
					alert('Error request');
				}
			});
		} catch (e) {
			alert(e);
		}
	};

	window.showData = function(response){
		try {
			if (response.error == false) {
				
				// поиск вариантов
				var results = response.data.match(/(<p>)(.*)(<\/p>)/gi);
				var data = '';

				if (results) {
					// перебор вариантов, отброс последнего (лишний абзац)
					for (var i = 0; i < results.length-1; i++) {
						data += results[i];
					}

					$('#helper').html(data);
				} else {
					window.helperStart();
				}
				
			} else {
				alert('Error: ' + response.message);
			}
		} catch (e) {
			alert(e);
		}
	};

	$(window).ready(function(){
		window.helperStart();

		$('body').append('<div id="helper"></div>');
		$('#helper').css({
			'position': 'fixed',
			'top': '40px',
			'left': '0',
			'width': '200px',
			'background': '#fff',
			'color': '#000',
			'padding': '20px',
			'height': '100%',
			'overflow': 'scroll'
		});

		$('body').append('<button id="helper-refresh">Refresh</button>');
		$('#helper-refresh').css({
			'position': 'fixed',
			'top': '0',
			'left': '0',
			'height': '40px',
			'width': '200px',
			'background': '#ff0000',
			'color': '#000',
			'padding': '10px',
		});
	});

	$(document).on('click', '#helper-refresh', function(){
		window.helperStart();
	});

})();




