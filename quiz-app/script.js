$(function(){

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

	let localAnswers = [], right = 0;

	let counting = () => {
		++right;
		$('#aside-counter h3 span').html(`${right}/5`);
	}

	const getData = () => {
		$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/quiz', data => {
			
			const quizWrapper = document.getElementById('quiz-wrapper');
			quizWrapper.style.display = 'block'
			data.map(item => {
				createQuizSections(item);
			});

			localAnswers = data.map(item => {
				return item.answer;
			});

			let submitSection = '<section id="submit-section"></section>';
			$('form').append(submitSection);
			$('#submit-section').append('<input id="btn-submit" type="submit" value="Submit">');

			$('.option-wrapper').click(function(e){

				if ($(this).siblings().is('[style]')) e.preventDefault();

				const input = $(this).find('input[type="radio"]');
				
				if ( input.prop('checked') ) {
					let inputValue = parseInt(input.val());
					let inputName = parseInt(input.attr('name').substr(1,1));

					let flag = false;
					for (let i=0; i<localAnswers.length; i++) {
						if (localAnswers[i] == inputValue && i+1 == inputName) {
							counting();
							flag = true;
							break;
						}
					}

					if (flag) {
						$(this).css('background-color', 'green');
					} else {
						$(this).css('background-color', 'red');
						localAnswers.map((item, pos) => {
							if (pos+1 == inputName) {
								$(this).parent().find('.option-wrapper').eq(item-1).css('background-color', 'green');
							}
						});
					}
				}
			});

		});
		processAnswers();
	};
	getData();
});

const processAnswers = () => {

    $('form').submit(function(e) {
    	e.preventDefault();
	    $('#modal-wrapper').show();

		// let result = $(this).serialize();
		// result = result.substr(0, result.length).split("&");
		// let counter = 0;
		// for (let i=0;i<result.length;i++) {
		// 	if (result[i].substr(3,1) == localAnswers[i]) counter++;
		// }

		$('#result').html($('#aside-counter span').html());
	});

	$('#backdrop').click(function(){
		$('#modal-wrapper').fadeOut();
	});

	$(document).on('keyup', function(e) {
   		if (e.key == "Escape") {
			$('#modal-wrapper').fadeOut();
   		}
		});

};