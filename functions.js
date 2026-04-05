const crawl = document.querySelector('.crawl');
const endScreen = document.getElementById('endScreen');
const startButton = document.querySelector('.start-button');
const crawlMusic = document.getElementById('crawlMusic');
const centerImage = document.querySelector('.center-image');

function runCrawl() {
  endScreen.style.display = 'none';

  crawl.style.animation = 'none';
  crawl.offsetHeight; // force reflow

  setTimeout(() => {
    crawl.style.animation = 'crawlMove 90s linear forwards';
    crawl.style.animationPlayState = 'running';
  }, 7000);

  crawlMusic.currentTime = 1.5;
  crawlMusic.play();

  crawl.addEventListener('animationend', showEndScreen, { once: true });
}

function startCrawl() {
  startButton.style.display = 'none';
  runImageAnimation();
  runCrawl();
}

function replayCrawl() {
  runImageAnimation();
  runCrawl();
}

function showEndScreen() {
  endScreen.style.display = 'flex';
}

document.addEventListener('click', function (e) {
  if (e.target.closest('.start-button') || e.target.closest('.replay-button')) return;

  const isPaused = crawl.style.animationPlayState === 'paused';
  crawl.style.animationPlayState = isPaused ? 'running' : 'paused';

  if (isPaused) {
    crawlMusic.play();
  } else {
    crawlMusic.pause();
  }
});

function runImageAnimation() {
  centerImage.style.display = 'block';
  centerImage.style.animation = 'none';
  centerImage.offsetHeight;
  centerImage.style.animation = 'imageSequence 7s ease-in-out forwards';
}