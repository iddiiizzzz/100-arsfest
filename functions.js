function startCrawl() {
  const music = document.getElementById("crawlMusic");
  const videos = document.querySelectorAll("video");
  const startButton = document.querySelector(".start-button");
  const endScreen = document.getElementById("endScreen");

  endScreen.style.display = "none";

  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);

  const computerVideo = videos[0];
  const mobileVideo = videos[1];
  const chosenVideo = isMobile ? mobileVideo : computerVideo;

  videos.forEach(v => {
      v.style.display = "none";
      v.pause();
      v.currentTime = 0;
  });

  chosenVideo.style.display = "block";
  startButton.style.display = "none";

  music.currentTime = 0;
  music.play();

  // ⭐ Play video muted first to avoid the pause/play overlay
  chosenVideo.muted = true;

  chosenVideo.play().then(() => {
      // ⭐ Unmute AFTER playback starts
      chosenVideo.muted = false;
  });

  chosenVideo.onended = () => {
      endScreen.style.display = "flex";
  };
}
