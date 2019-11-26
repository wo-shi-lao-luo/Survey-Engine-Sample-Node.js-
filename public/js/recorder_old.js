//Track different buttons
var buttonID = 0;

//Check if webpage needs to record audios
var audio_need = true;
var audio_check = false;

var recordButton = document.querySelector('#recordButton' + buttonID);
var stopButton = document.querySelector('#stopButton' + buttonID);
// var pauseButton = document.querySelector('#pauseButton');

//webkitURL is deprecated but nevertheless 
URL = window.URL || window.webkitURL;

var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 

// var AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioContext = new AudioContext();

//new audio context to help us record 

// var recordButton = document.getElementById("recordButton");
// var stopButton = document.getElementById("stopButton");
// var pauseButton = document.getElementById("pauseButton");

//add events to those 3 buttons 

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
// pauseButton.addEventListener("click", pauseRecording);


function startRecording() { 

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();

	console.log("recordButton clicked"); 

	/* Simple constraints object, for more advanced audio features see

	https://addpipe.com/blog/audio-constraints-getusermedia/ */

	var constraints = {
	    audio: true,
	    video: false
	} 
	/* Disable the record button until we get a success or fail from getUserMedia() */

	recordButton.disabled = true;
	recordButton.classList.remove("btn-primary");
	recordButton.classList.add("btn-secondary");
	stopButton.disabled = false;
	stopButton.classList.remove("btn-secondary");
	stopButton.classList.add("btn-primary");
	// pauseButton.disabled = false;

	/* We're using the standard promise based getUserMedia()

	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
	    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
	    /* assign to gumStream for later use */
	    gumStream = stream;
	    /* use the stream */
	    input = audioContext.createMediaStreamSource(stream);
	    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
	    rec = new Recorder(input, {
	        numChannels: 1
	    }) 
	    //start the recording process 
	    rec.record()
	    console.log("Recording started");
	}).catch(function(err) {
	    //enable the record button if getUserMedia() fails 
	    // recordButton.disabled = false;
	    // stopButton.disabled = true;
	    stopButton.disabled = true;
		stopButton.classList.remove("btn-primary");
		stopButton.classList.add("btn-secondary");
	    recordButton.disabled = false;
	    recordButton.classList.remove("btn-secondary");
		recordButton.classList.add("btn-primary");
	    // pauseButton.disabled = true;
	});
}

// function pauseRecording() {
//     console.log("pauseButton clicked rec.recording=", rec.recording);
//     if (rec.recording) {
//         //pause 
//         rec.stop();
//         pauseButton.innerHTML = "Resume";
//     } else {
//         //resume 
//         rec.record()
//         pauseButton.innerHTML = "Pause";
//     }
// }

function stopRecording() {
    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings 
    stopButton.disabled = true;
	stopButton.classList.remove("btn-primary");
	stopButton.classList.add("btn-secondary");
    recordButton.disabled = true;

    // pauseButton.disabled = true;
    //reset button just in case the recording is stopped while paused 
    // pauseButton.innerHTML = "Pause";
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink 
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;
    au.setAttribute("name", "audio" + buttonID);
    au.setAttribute("id", "audio" + buttonID);

    var label = document.createElement("label");
    label.setAttribute("for", "audio" + buttonID);
	label.textContent = "audio" + buttonID;

    //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;

    //add the new audio and a elements to the li element 
    li.appendChild(au);
    li.appendChild(link);
    li.appendChild(label);

    //add the li element to the ordered list 
    // recordingsList.appendChild(li);

    // var test = document.getElementById("name");
    // test.appendChild(li);
    var audioFile = recordButton.parentNode;
    audioFile.appendChild(li);

    //change buttonID
    buttonID ++;
    recordButton = document.querySelector('#recordButton' + buttonID);
	stopButton = document.querySelector('#stopButton' + buttonID);
	recordButton.addEventListener("click", startRecording);
	stopButton.addEventListener("click", stopRecording);

	//allows to click next page button
	audio_check = true;
}


