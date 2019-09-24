$(document).ready(function() {


	const createThumbnails = imgObj => {

		let playlist = document.getElementById('playlist-wrapper');

		let div = document.createElement('div');
		div.id = "card" + imgObj.id;
		div.className = 'playlist-card';

		let img = document.createElement('img');
		img.className = 'thumbnail';
		img.src = imgObj.thumbnail;
		div.appendChild(img);

		let heading = document.createElement('h3');
		let headingText = document.createTextNode(imgObj.title);
		heading.appendChild(headingText);
		div.appendChild(heading);

		playlist.appendChild(div);
		let thumbs = document.querySelectorAll('#playlist-wrapper img');
	}

	$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/playlist', (data, status) => {
		var imgObj = data;
		for (let i=0; i<imgObj.length; i++) {
			createThumbnails(imgObj[i]);
		}

		let iframe = document.getElementById('video-player');

		let linkLastHash = iframe.src.lastIndexOf("/")+1;
		let iframeLinkId = iframe.src.substr(linkLastHash, iframe.src.length - linkLastHash);

		let thumbs = document.querySelectorAll('#playlist-wrapper img');
		let div = document.querySelectorAll(".playlist-card");

		div[0].classList.toggle("active-card");

		for (let i=0; i<thumbs.length; i++) {
		thumbs[i].addEventListener('click', function() {
			$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/video/'+(i+1), (data, status) => {
				let videoObj = data;
				iframe.src = iframe.src.substr(0,linkLastHash);
				iframe.src += videoObj.vimeoId;
				$('#video-title').html(videoObj.title);
				$('#video-description').html(videoObj.description);
				$('#views-count').html(videoObj.views);

				let current = document.getElementsByClassName("active-card");
				current[0].className = current[0].className.replace(" active-card", "");
				div[i].className += " active-card";
				$(window).scrollTop(0);
			})
		})
		}

	})

})