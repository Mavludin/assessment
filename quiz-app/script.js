
function createQuizSections(quizObj) {

	let form = document.querySelector('form');
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

	form.appendChild(section);
}

var localAnswers = [];
function getData() {
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var quizObj = JSON.parse (this.responseText);
				for (let i=0; i<quizObj.length; i++) {
					createQuizSections(quizObj[i]);
					console.log(quizObj[i]);
					localAnswers.push(quizObj[i].answer);
				}
				console.log(localAnswers)
				createSubmitButton();
				processAnswers(quizObj);
			} else console.log ('Call failed');
		}
	}

	http.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', true);
	http.send();
}

getData();

function createSubmitButton() {

	let form = document.querySelector('form');
	let submitSection = document.createElement('section');
	submitSection.id = "submit-section";
	let submitBtn = document.createElement('input');
	submitBtn.id = "btn-submit";
	submitBtn.type = "submit";
	submitBtn.value = "Submit";
	submitSection.appendChild(submitBtn);

	form.appendChild(submitSection);

}

function processAnswers(quizObj){

	let form = document.querySelector('form');
	let submitBtn = document.getElementById('btn-submit');
	let modal = document.getElementById('modal-wrapper');

	let result = location.search;
	result = result.substr(1, result.length).split("&");

	let counter = 0;
	for (let i=0;i<result.length;i++) {
		if (result[i].substr(3,1) == localAnswers[i]) counter++;
	}

	let heading = document.querySelector('#modal-wrapper h3');
	heading.innerHTMl+=counter;

}
