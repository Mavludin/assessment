$(document).ready(function(){

	const createQuizSections = obj => {

		let section = document.createElement('section');
		section.className = 'quiz-item';

		let heading = document.createElement('h3');
		heading.innerHTML = `Q${obj.id}. ${obj.question}`;
		section.appendChild(heading);

			obj.options.map((item,pos) => {
				let div = document.createElement('div');
				div.className = "option-wrapper";
				let label = document.createElement('label');
				let input = document.createElement('input');
				input.type = 'radio';
				input.required = true;
				input.name = `q${obj.id}`;
				input.value = pos+1;
				let par = document.createElement('p');
				par.innerHTML = item;
				label.appendChild(input);
				label.appendChild(par);

				div.appendChild(label);
				section.appendChild(div);
			});

		$('form').append(section);

	};

	var localAnswers = [];
	const getData = () => {
		$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', data => {
			
			data.map(item => {
				createQuizSections(item);
			});

			localAnswers = data.map(item => {
				return item.answer;
			});
			createSubmitButton();
			processAnswers();
		});

	};

	const createSubmitButton = () => {

		let submitSection = '<section id="submit-section"></section>';
		$('form').append(submitSection);
		$('#submit-section').append('<input id="btn-submit" type="submit" value="Submit">');
	};

	const processAnswers = () => {

			let asideCounter = 0;

			$('.quiz-item:first input[type="radio"]').on('change', function () {
				if ( $(this).val() == 3 ) {
					$('.quiz-item:first .option-wrapper:nth-of-type(3)').css('background-color', 'green');
					asideCounter++;
				} else {
					$('.quiz-item:first .option-wrapper:nth-of-type(3)').css('background-color', 'inherit');
				}
				$('#aside-counter span').html(`${asideCounter}/5`);
			});

			$('.quiz-item:nth-of-type(2) input[type="radio"]').on('change', function () {
				if ( ( $(this).val() == 1 ) ) {
					$('.quiz-item:nth-of-type(2) .option-wrapper:first').css('background-color', 'green');
					asideCounter++;
				} else {
					$('.quiz-item:nth-of-type(2) .option-wrapper:first').css('background-color', 'inherit');
				}
				$('#aside-counter span').html(`${asideCounter}/5`);
			});

			$('.quiz-item:nth-of-type(3) input[type="radio"]').on('change', function () {
				if ( ( $(this).val() == 3 ) ) {
					$('.quiz-item:nth-of-type(3) .option-wrapper:nth-of-type(3)').css('background-color', 'green');
					asideCounter++;
				} else {
					$('.quiz-item:nth-of-type(3) .option-wrapper:nth-of-type(3)').css('background-color', 'inherit');
				}
				$('#aside-counter span').html(`${asideCounter}/5`);
			});

			$('.quiz-item:nth-of-type(4) input[type="radio"]').on('change', function () {
				if ( ( $(this).val() == 3 ) ) {
					$('.quiz-item:nth-of-type(4) .option-wrapper:nth-of-type(3)').css('background-color', 'green');
					asideCounter++;
				} else {
					$('.quiz-item:nth-of-type(4) .option-wrapper:nth-of-type(3)').css('background-color', 'inherit');
				}
				$('#aside-counter span').html(`${asideCounter}/5`);
			});

			$('.quiz-item:last input[type="radio"]').on('change', function () {
				if ( $(this).val() == 2 ) {
					$('.quiz-item:last .option-wrapper:nth-of-type(2)').css('background-color', 'green');
					asideCounter++;
				} else {
					$('.quiz-item:last .option-wrapper:nth-of-type(2)').css('background-color', 'inherit');
				}
				$('#aside-counter span').html(`${asideCounter}/5`);
			});

		    $('form').submit(function(e) {
		    	e.preventDefault();
			    $('#modal-wrapper').show();
			    var result = $(this).serialize();
	    		result = result.substr(0, result.length).split("&");

				let counter = 0;
				for (let i=0;i<result.length;i++) {
					if (result[i].substr(3,1) == localAnswers[i]) counter++;
				}

				$('#result-modal h3').html( $('#result-modal h3').html()+counter + "/5" );

			 });
		
	};

	getData();

});
