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

	let localAnswers = [];
	const getData = () => {
		$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', data => {
			
			data.map(item => {
				createQuizSections(item);
			});

			localAnswers = data.map(item => {
				return item.answer;
			});
			console.log(localAnswers);

			$('.option-wrapper').click(function(){
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

							}
						});
					}
				}

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

	    $('form').submit(function(e) {
	    	e.preventDefault();
		    $('#modal-wrapper').show();
		    var result = $(this).serialize();
    		result = result.substr(1, result.length).split("&");

			let counter = 0;
			for (let i=0;i<result.length;i++) {
				if (result[i].substr(3,1) == localAnswers[i]) counter++;
			}

			$('#result-modal h3').html( $(this).html()+counter + "/5" );

		});

	};

	getData();

});
