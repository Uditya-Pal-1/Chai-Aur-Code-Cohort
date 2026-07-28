const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';
const videoGrid = document.getElementById('videoGrid')
const searchInput = document.getElementById('searchInput')

let allVideos = []

async function fetchVideos() {
    try {
        const response = await fetch(API_URL)
        const result = await response.json();

        if (result.success && result.data && result.data.data) {
            allVideos = result.data.data;
        } else {
            allVideos = result.data || result || [];
        }
        renderVideos(allVideos)
    } catch (error) {
        console.error("Error fetching videos:", error)
        videoGrid.innerHTML = '<h3 style = "color:red; grid-column:1/-1">Failed to load Vidoes. Please try again later.</h3>';
    }
}

function renderVideos(videosToRender) {
    videoGrid.innerHTML = ''
    if (videosToRender.length === 0) {
        videoGrid.innerHTML = '<h3 style="grid-column:1/-1;">No videos found.</h3>';
        return;
    }
    videosToRender.forEach(video => {
        const title = video?.items?.snippet?.title || video?.title || 'Unknown Title';
        const channelName = video?.items?.snippet?.channelTitle || video?.channelName || video?.channel?.name || 'Unknown Channel';
        const thumbnail = video?.items?.snippet?.thumbnails?.high?.url || video?.thumbnail?.url || video?.thumbnail || 'https://via.placeholder.com/320x180?text=No+Image';

        const videoId = video?.items?.id?.videoId || video?.id?.videoId || video?.videoId || '';
        const youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#';

        const card = document.createElement('div')
        card.className = 'video-card'

        card.addEventListener('click', () => {
            if (youtubeLink !== '#') window.open(youtubeLink, '_blank')
        })
        card.innerHTML = `
<div class = 'thumbnail-container'>
<img src='${thumbnail}' alt='${title}' class='thumbnail'>
</div>
<div class='video-info'>
<h3 class= 'video-title'>${title}</h3>
<p class='channel-name'>${channelName}</p>
</div>`
        videoGrid.appendChild(card)
    })
}
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVideos = allVideos.filter(video => {
        const title = (video?.items?.snippet?.title || video?.title || '').toLowerCase();
        const channelName = (video?.items?.snippet?.channelTitle || video?.channelName || video?.channel?.name || '').toLowerCase();

        return title.includes(searchTerm) || channelName.includes(searchTerm);
    });

    renderVideos(filteredVideos);
});

fetchVideos();