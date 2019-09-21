let skinImage = document.querySelectorAll('#select-skin-card img');
let emojiImage = document.querySelectorAll('#emoji img');

let selectEyes = document.getElementById('select-eyes-card');
let selectSkin = document.getElementById('select-skin-card');
let selectMouth = document.getElementById('select-mouth-card');

for (let i=0; i<skinImage.length; i++) {
	let leftSrc = skinImage[i].src;
	skinImage[i].addEventListener('click', function() {
		emojiImage[0].src = leftSrc;
		selectSkin.style.display = 'none';
		selectEyes.style.display = 'block';
	})
}

let eyesImg = document.querySelectorAll('#select-eyes-card img');

for (let i=0; i<eyesImg.length; i++) {
	let eyeSrc = eyesImg[i].src;
	eyesImg[i].addEventListener('click', function() {
		emojiImage[1].src = eyeSrc;
		selectEyes.style.display = 'none';
		selectMouth.style.display = 'block';
	})
}

let mouthImg = document.querySelectorAll('#select-mouth-card img');

for (let i=0; i<mouthImg.length; i++) {
	let mouthSrc = mouthImg[i].src;
	mouthImg[i].addEventListener('click', function() {
		emojiImage[2].src = mouthSrc;
	})
}

let mouthArrow = document.querySelector('#select-mouth-card i');

mouthArrow.addEventListener('click', function() {

	selectMouth.style.display = 'none';
	selectEyes.style.display = 'block';
})

eyesArrow = document.querySelectorAll('#select-eyes-card i');

eyesArrow[0].addEventListener('click', function() {

	selectEyes.style.display = 'none';
	selectSkin.style.display = 'block';
})

eyesArrow[1].addEventListener('click', function() {

	selectEyes.style.display = 'none';
	selectMouth.style.display = 'block';
})

selectArrow = document.querySelector('#select-skin-card i');

selectArrow.addEventListener('click', function() {

	selectSkin.style.display = 'none';
	selectEyes.style.display = 'block';
})