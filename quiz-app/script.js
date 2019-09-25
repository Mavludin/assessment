$(document).ready(function(){

	const createQuizSections = obj => {

		let section = document.createElement('section');
		section.className = 'quiz-item';

		let heading = document.createElement('h3');
		heading.innerHTML = `Q${obj.id}. ${obj.question}`;
		section.appendChild(heading);

			obj.options.map(item => {
				let div = document.createElement('div');
				div.className = "option-wrapper";
				let label = document.createElement('label');
				let input = document.createElement('input');
				input.type = 'radio';
				input.required = true;
				input.name = `q${item.id}`;
				input.value = item.id;
				let par = document.createElement('p');
				par.innerHTML = item;
				label.appendChild(input);
				label.appendChild(par);

				div.appendChild(label);
				section.appendChild(div);
			})

		$('form').append(section);

	}

	var localAnswers = [];
	const getData = () => {
		$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', data => {
			
			data.map(item => {
				createQuizSections(item);
			});

			localAnswers = data.map(item => {
				return item.answer;
			});
			console.log(localAnswers)
			createSubmitButton();
			processAnswers();
		});

	}

	const createSubmitButton = () => {

		let submitSection = '<section id="submit-section"></section>';
		$('form').append(submitSection);
		$('#submit-section').append('<input id="btn-submit" type="submit" value="Submit">');
	}

	const processAnswers = () => {

			$('.quiz-item:nth-child(1) input').on('change', function() {
				if ( $("input[type='radio']").eq(2).is(':checked') ) {
					console.log('3');
					$('.quiz-item:nth-child(1) .option-wrapper').eq(2).css('background-color', 'green');
				} else $('.quiz-item:nth-child(1) .option-wrapper').eq(2).css('background-color', 'inherit');
			})

			$('.quiz-item:nth-of-type(2) input').on('change', function() {
			
				if ( $("input[type='radio']:nth-of-type(1)").is(':checked') ) {
					console.log('1');
					$('.quiz-item:nth-of-type(2) .option-wrapper:nth-of-type(1)').css('background-color', 'green');
				} else $('.quiz-item:nth-of-type(2) .option-wrapper:nth-of-type(1)').css('background-color', 'inherit');
			})

			$('.quiz-item:nth-of-type(3) input').on('change', function() {
			
				if ( $("input[type='radio']:nth-of-type(3)").is(':checked') ) {
					$('.quiz-item:nth-of-type(3) .option-wrapper:nth-of-type(3)').css('background-color', 'green');
				} else $('.quiz-item:nth-of-type(3) .option-wrapper:nth-of-type(3)').css('background-color', 'inherit');
			})

			// $('.quiz-item:nth-child(4) input').on('change', function() {
			
			// 	if ( $("input[type='radio']:nth-of-type(3)").is(':checked') ) {
			// 		$('.quiz-item:nth-child(4) .option-wrapper:nth-of-type(3)').css('background-color', 'green');
			// 	} else $('.quiz-item:nth-child(4) .option-wrapper:nth-of-type(3)').css('background-color', 'inherit');
			// })

			$('.quiz-item:nth-of-type(5) input').on('change', function() {
			
				if ( $("input[type='radio']:first").is(':checked') ) {
					$('.quiz-item:nth-of-type(5) .option-wrapper:first').css('background-color', 'green');
				} else $('.quiz-item:nth-of-type(5) .option-wrapper:first').css('background-color', 'inherit');
			});

		    $('form').submit(function(e) {
		    	e.preventDefault();
			    $('#modal-wrapper').show();
			    var result = $(this).serialize();
	    		result = result.substr(1, result.length).split("&");

				let counter = 0;
				for (let i=0;i<result.length;i++) {
					if (result[i].substr(3,1) == localAnswers[i]) counter++;
				}

				$('#result-modal h3').html( $('#result-modal h3').html()+counter + "/5" );

			 });
		
	}

	getData();

});
