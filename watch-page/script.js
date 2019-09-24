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
		heading.innerHTML = imgObj.title;
		div.appendChild(heading);

		playlist.appendChild(div);
		let thumbs = document.querySelectorAll('#playlist-wrapper img');
	}

	$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/playlist', (data, status) => {
		var imgObj = data;
		for (let i=0; i<imgObj.length; i++) {
			createThumbnails(imgObj[i]);
		}

		let thumbs = document.querySelectorAll('#playlist-wrapper img');
		let div = document.querySelectorAll(".playlist-card");

		$('.playlist-card:first').addClass('active-card');

		for (let i=0; i<thumbs.length; i++) {
		thumbs[i].addEventListener('click', function() {
			$.get('http://5d76bf96515d1a0014085cf9.mockapi.io/video/'+(i+1), (data, status) => {
				let videoObj = data;
				$('iframe').attr('src', `https://player.vimeo.com/video/${videoObj.vimeoId}`)
				$('#video-title').html(videoObj.title);
				$('#video-description').html(videoObj.description);
				$('#views-count').html(videoObj.views);

				$('.playlist-card').removeClass('active-card');
				div[i].className += " active-card";

				$(window).scrollTop(0);
			})
		})
		}

	})

})