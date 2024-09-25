const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Cẩm Tú Cầu', 'Anh Tự Do Nhưng Đơn Côi ', 'Xin Lỗi Vì Đã Xuất Hiện', 'Cause I Love You', 'Đi Giữa Trời Rực Rỡ', 'Cánh Đồng Yêu Thương', 'Nổi Gió Rồi', 'Tự Em Sai', 'Vườn Hoa Con Cá', 'Chiều Hôm Ấy'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Bắt đầu thực hiện khi DOM được load hoàn thành
window.onload = function() {
	// Lấy file, audio và canvas element
	var fileElm = document.querySelector("#input-file");
	var audioElm = document.querySelector("#audio");
	var canvasElm = document.querySelector("canvas");
	canvasElm.width = window.innerWidth;
	canvasElm.height = window.innerHeight;
		
	// Thực hiện xử lý khi một file audio được chọn
	fileElm.onchange = function() {
	  // Gắn đường source cho audio element với file đầu tiên trong danh sách các file đã chọn
	  // File object thường là 1 array do input type file có thể chấp nhận thuộc tính multiple
	  // để chúng ta có thể chọn nhiều hơn một file. URL.createObjectURL sẽ giúp chúng ta tạo ra một
	  // DOMString chứa URL đại diện cho Object được đưa vào. Bạn có thể xem chi tiết tại: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  audioElm.src = URL.createObjectURL(this.files[0]);
	  
	  // Tiếp theo, tải file và thực hiện play file đã được chọn
	  audioElm.load();
	  audioElm.play();
	  
	  // Tiếp, khởi tạo AudioContext
	  var audioContext = new AudioContext();
	  // Khởi tạo AudioContext source
	  var audioContextSrc = audioContext.createMediaElementSource(audio);
	  // Khởi tạo Analyser
	  var audioAnalyser = audioContext.createAnalyser();
	  // Khởi tạo 2D canvas
	  canvasContext = canvasElm.getContext("2d");
	  
	  // Kết nối AudioContext source với Analyser
	  audioContextSrc.connect(audioAnalyser);
	  // Kết nối Analyser với AudioDestinationNode
	  audioAnalyser.connect(audioContext.destination);
	  
	  // Gán FFT size là 256 cho Analyser
	  // Các bạn có thể xem thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
	  audioAnalyser.fftSize = 256;
	  
	  // Lấy dữ liệu tần số từ Analyser
	  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
	  var analyserFrequencyLength = audioAnalyser.frequencyBinCount;
	  
	  // Khởi tạo một mảng số nguyên dương 8-bit có số lượng phần tử bằng analyserFrequencyLength
	  var frequencyDataArray = new Uint8Array(analyserFrequencyLength);
	  
	  // Lấy width và height của canvas
	  var canvasWith = canvasElm.width;
	  var canvasHeight = canvasElm.height;
	  
	  // Tính toán barWidth và barHeight
	  var barWidth = (canvasWith / analyserFrequencyLength) * 2.5;
	  var barHeight;
	  var barIndex = 0;
	  
	  function renderFrame() {
		// Thông báo với trình duyệt rằng chúng ta đang chuẩn bị thực hiện một animation với method là như này. Hãy chuẩn bị đi =)
		// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
		window.requestAnimationFrame(renderFrame);
		
		// Reset lại barIndex trở về 0
		barIndex = 0;
		
		// Điền dữ liệu tần số vào mảng
		audioAnalyser.getByteFrequencyData(frequencyDataArray);
		
		// Vẽ một hình chữ nhật với nền màu đen
		canvasContext.fillStyle = "#000";
		canvasContext.fillRect(0, 0, canvasWith, canvasHeight);
		
		// Chạy lần lượt từ 0 đến hết dữ liệu tần số của Analyser
		for (var i = 0; i < analyserFrequencyLength; i++) {
		  barHeight = frequencyDataArray[i];
		  // Tạo màu cho thanh bar
		  var rgbRed = barHeight + (25 * (i / analyserFrequencyLength));
		  var rgbGreen = 250 * (i / analyserFrequencyLength);
		  var rgbBlue = 50;
		  
		  // Điền màu và vẽ bar
		  canvasContext.fillStyle = "rgb("+ rgbRed +", "+ rgbGreen +", "+ rgbBlue +")";
		  canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);
  
		  barIndex += (barWidth + 1);
		}
	  }
	  // Gọi method để render vào canvas
	  renderFrame();
	}
  }
  

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
