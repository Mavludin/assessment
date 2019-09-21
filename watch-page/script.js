
function createThumbnails(imgObj) {

	let playListWrapper = document.getElementById('playlist-wrapper');

	let div = document.createElement('div');
	div.id = "card" + imgObj.id;
	div.class = 'playlist-card active-card';

	let img = document.createElement('img');
	img.className = 'thumbnail';
	img.src = imgObj.thumbnail;
	div.appendChild(img);

	let heading = document.createElement('h3');
	let headingText = document.createTextNode(imgObj.title);
	heading.appendChild(headingText);
	div.appendChild(heading);

	playListWrapper.appendChild(div);

}

function getThumbnails() {

	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var imgObj = JSON.parse (this.responseText);
				for (let i=0; i<imgObj.length; i++) {
					createThumbnails(imgObj[i]);
					console.log(imgObj[i]);
				} getVideos();
			} else console.log ('Call failed');
		}
	}

	http.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/playlist', true);
	http.send();
}

getThumbnails();


function getVideos() {

	let iframe = document.getElementById('video-player');
	let thumbs = document.querySelectorAll('#playlist-wrapper img');
	console.log(thumbs);

	for (let i=0; i<thumbs.length; i++) {

		thumbs[i].addEventListener('click', function() {

		let http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					var videoObj = JSON.parse (this.responseText);
					for (let i=0; i<videoObj.length; i++) {
						console.log(videoObj[i]);
					}
				} else console.log ('Call failed');
			}
		}

		http.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/video'+(i+1), true);
		http.send();
	})

}

}
