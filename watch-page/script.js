$(document).ready(function() {

	const createThumbnails = (obj, pos) => {

		let div = document.createElement('div');
		div.id = "card" + obj.id;
		div.className = 'playlist-card';

		let img = document.createElement('img');
		img.className = 'thumbnail';
		img.src = obj.thumbnail;
		div.appendChild(img);

		if (pos === 0) {
			div.classList.add('active-card');
		}

		div.onclick = () => {
			updateVideoData(obj.id);
			$('.playlist-card').removeClass('active-card');
			div.classList.add('active-card');
		};

		let heading = document.createElement('h3');
		heading.innerHTML = obj.title;
		div.appendChild(heading);

		return div;
	};

	$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/playlist', (data) => {
		data.map ((item, pos) => {
			$('#playlist-wrapper').append(createThumbnails(item, pos));
		})

	});

	const updateVideoData = (videoId) => {
		$.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/video/${videoId}`, (data) => {
				$('iframe').attr('src', `https://player.vimeo.com/video/${data.vimeoId}`);
				$('#video-title').html(data.title);
				$('#video-description').html(data.description);
				$('#views-count').html(data.views);
				$(window).scrollTop(0);
		});
	}

});
