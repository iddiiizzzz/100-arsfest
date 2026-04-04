




const crawl = document.querySelector('.crawl');
const endScreen = document.getElementById('endScreen');
const startButton = document.querySelector('.start-button');
const crawlMusic = document.getElementById('crawlMusic');
const centerImage = document.querySelector('.center-image');




function runCrawl() {
  endScreen.style.display = 'none';

  // reset animation so it can run again
  crawl.style.animation = 'none';
  crawl.offsetHeight; // force reflow
  setTimeout(() => {
    crawl.style.animation = 'crawl 85s linear forwards';
    crawl.style.animationPlayState = 'running';
  }, 7000); // second delay

  // restart music from the beginning
  crawlMusic.currentTime = 1.5;
  crawlMusic.play();

  // IMPORTANT: attach the end listener for THIS run
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
  // ignore clicks on buttons
  if (e.target.closest('.start-button') || e.target.closest('.replay-button')) return;

  const isPaused = crawl.style.animationPlayState === 'paused';

  crawl.style.animationPlayState = isPaused ? 'running' : 'paused';

  // keep music synced
  if (isPaused) {
    crawlMusic.play();
  } else {
    crawlMusic.pause();
  }
});



function runImageAnimation() {
  centerImage.style.display = 'block';
  centerImage.style.animation = 'none';
  centerImage.offsetHeight; // force reflow
  centerImage.style.animation = 'imageSequence 7s ease-in-out forwards';
}







function updateCrawlScale() {
  const designWidth = 1080;
  const screenWidth = window.innerWidth;

  // scale down on smaller screens, keep normal size on larger ones
  const scale = Math.min(screenWidth / designWidth, 1);

  document.documentElement.style.setProperty('--crawl-scale', scale);
}

updateCrawlScale();
window.addEventListener('resize', updateCrawlScale);
