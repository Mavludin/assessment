$(document).ready(function(){

	const createQuizSections = obj => {

		let section = document.createElement('section');
		section.className = 'quiz-item';

		let heading = document.createElement('h3');
		heading.innerHTML = `Q${obj.id}. ${obj.question}`;
		section.appendChild(heading);

<<<<<<< HEAD
			obj.options.map((item, pos) => {
=======
			obj.options.map((item,pos) => {
>>>>>>> 4f4d84f2b13e59a769e552cf2966f3da8890e5d4
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
<<<<<<< HEAD
			console.log(localAnswers);

			$('.option-wrapper').click(function(e){
				const input = $(this).find('input[type="radio"]');
			
				if ( input.prop('checked') ) {
					var inputValue = parseInt(input.val());
					var inputName = parseInt(input.attr('name').substr(1,1));

					let flag = false;
					for (let i=0; i<localAnswers.length; i++) {
						if (localAnswers[i] == inputValue && i+1 == inputName) {
							flag = true;
							break;
						} else {
							flag = false;
						}
					}

					if (flag) {
						$(this).css('background-color', 'green');
					} else {
						$(this).css('background-color', 'red');
						localAnswers.map((item, pos) => {
							if (pos+1 == inputName) {
								// console.log($(this).parent().find('.option-wrapper'));
								console.log(input);
								console.log(pos+1)
							}
						});
					}


				}

			});

=======
>>>>>>> 4f4d84f2b13e59a769e552cf2966f3da8890e5d4
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

<<<<<<< HEAD
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
=======
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
