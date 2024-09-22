document.getElementById('toggleMenuButton').addEventListener('click', function() {
    const menu = document.querySelector('.menu');


    menu.classList.toggle('open');


    const isOpen = menu.classList.contains('open');
    this.textContent = isOpen ? '✖' : '☰'; 
});

function validateAndLoad() {
    const url = document.getElementById('youtubeUrl').value.trim();
    const videoId = url.split('v=')[1]?.split('&')[0];

    const channelInput = document.getElementById('twitchChannel').value.trim();
    const channelName = channelInput.includes('twitch.tv/') ? channelInput.split('twitch.tv/')[1] : channelInput;

    const videoPlayer = document.getElementById('videoPlayer');
    const chat = document.getElementById('chat');

    if (!videoId) {
        alert('Por favor, insira uma URL válida do YouTube.');
        document.getElementById('youtubeUrl').focus();
        return;
    }

    videoPlayer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1" frameborder="0" allowfullscreen></iframe>`;

    if (!channelName) {
        alert('Por favor, insira um nome de canal válido.');
        document.getElementById('twitchChannel').focus();
        return;
    }

    const parentDomain = window.location.hostname;
    const chatUrl = `https://www.twitch.tv/embed/${channelName}/chat?darkpopout&parent=${parentDomain}`;
    
    chat.innerHTML = `
    <iframe id="twitch-chat-embed" 
            src="${chatUrl}" 
            height="100%" 
            width="100%" 
            frameborder="0" 
            scrolling="no"
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals">
    </iframe>`;


    const menu = document.querySelector('.menu');
    menu.classList.remove('open');
    document.getElementById('toggleMenuButton').textContent = '☰';

    document.getElementById('youtubeUrl').value = '';
    document.getElementById('twitchChannel').value = '';
}

document.getElementById('aboutButton').addEventListener('click', function() {
    document.getElementById('aboutPopup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('aboutPopup').style.display = 'none';
});

document.getElementById('closeAboutPopup').addEventListener('click', function() {
    document.getElementById('aboutPopup').style.display = 'none';
});

document.getElementById('loadButton').addEventListener('click', validateAndLoad);

document.getElementById('youtubeUrl').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        validateAndLoad();
    }
});

document.getElementById('twitchChannel').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        validateAndLoad();
    }
});
