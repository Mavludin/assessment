$(document).ready(function(){

	const createQuizSections = quizObj => {

		let section = document.createElement('section');
		section.className = 'quiz-item';

		let heading = document.createElement('h3');
		let headingText = document.createTextNode('Q'+quizObj.id+'.'+quizObj.question);
		heading.appendChild(headingText);
		section.appendChild(heading);

		for (let i=0; i<quizObj.options.length; i++) {

			let div = document.createElement('div');
			div.className = "option-wrapper";
			let label = document.createElement('label');
			let input = document.createElement('input');
			input.type = 'radio';
			input.required = true;
			input.name = 'q'+quizObj.id;
			input.value = i+1;
			let par = document.createElement('p');
			let parText = document.createTextNode(quizObj.options[i]);
			par.appendChild(parText);
			label.appendChild(input);
			label.appendChild(par);

			div.appendChild(label);
			section.appendChild(div);
		}

		$('form').append(section);
	}

	var localAnswers = [];
	const getData = () => {
		$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', function (data, status) {
			var quizObj = data;
			for (let i=0; i<quizObj.length; i++) {
				createQuizSections(quizObj[i]);
				console.log(quizObj[i]);
				localAnswers.push(quizObj[i].answer);
			}
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
