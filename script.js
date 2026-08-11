document.addEventListener('DOMContentLoaded', () => {
    const mainAudioPlayer = document.getElementById('globalAudioPlayer');
    const mainAudioPlayBtn = document.getElementById('mainAudioPlayBtn');
    const currentAudioTitle = document.getElementById('currentAudioTitle');
    const audioSeeker = document.getElementById('audioSeeker');
    const currentTimeText = document.getElementById('currentTimeText');
    const durationText = document.getElementById('durationText');
    const playButtons = document.querySelectorAll('.btn-audio-play');

    // Toggle Play/Pause on Main Button
    mainAudioPlayBtn.addEventListener('click', () => {
        if (mainAudioPlayer.paused) {
            mainAudioPlayer.play();
            mainAudioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            mainAudioPlayer.pause();
            mainAudioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Handle Track Selection from Tracklist
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const audioSrc = e.target.getAttribute('data-src');
            const audioTitle = e.target.getAttribute('data-title');

            if (audioSrc) {
                mainAudioPlayer.src = audioSrc;
                currentAudioTitle.textContent = audioTitle;
                mainAudioPlayer.play();
                mainAudioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });
    });

    // Update Progress Bar
    mainAudioPlayer.addEventListener('timeupdate', () => {
        if (mainAudioPlayer.duration) {
            const progress = (mainAudioPlayer.currentTime / mainAudioPlayer.duration) * 100;
            audioSeeker.value = progress;
            currentTimeText.textContent = formatTime(mainAudioPlayer.currentTime);
            durationText.textContent = formatTime(mainAudioPlayer.duration);
        }
    });

    // Seek Audio
    audioSeeker.addEventListener('input', () => {
        if (mainAudioPlayer.duration) {
            const seekTime = (audioSeeker.value / 100) * mainAudioPlayer.duration;
            mainAudioPlayer.currentTime = seekTime;
        }
    });

    // Format Seconds to MM:SS
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
});

