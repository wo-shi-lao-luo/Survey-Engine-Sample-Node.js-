//Track different buttons
var buttonID = 0;

//Check if webpage needs to record audios
var audio_need = true;
var audio_check = false;

var record = document.querySelector('#recordButton' + buttonID);
var stop = document.querySelector('#stopButton' + buttonID);

var soundClips = document.querySelector('.sound-clips');

function recordStart() {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	   console.log('getUserMedia supported.');
	   navigator.mediaDevices.getUserMedia (
	      // constraints - only audio needed for this app
			{
				audio: true
			})

	      // Success callback
	      	.then(function(stream) {
				var mediaRecorder = new MediaRecorder(stream);

				record.onclick = function() {
					mediaRecorder.start();
					record.disabled = true;
					record.classList.remove("btn-primary");
					record.classList.add("btn-secondary");
					stop.disabled = false;
					stop.classList.remove("btn-secondary");
					stop.classList.add("btn-primary");
					console.log(mediaRecorder.state);
					console.log("recorder started");

				}

				var chunks = [];

				mediaRecorder.ondataavailable = function(e) {
					chunks.push(e.data);
				}

				stop.onclick = function() {
					mediaRecorder.stop();
					console.log(mediaRecorder.state);
					console.log("recorder stopped");

				}

				mediaRecorder.onstop = function(e) {
					console.log("recorder stopped");

					// var clipContainer = document.createElement('article');
					// var clipLabel = document.createElement('p');
					// var audio = document.createElement('audio');
					// var deleteButton = document.createElement('button');
					       
					// clipContainer.classList.add('clip');
					// audio.setAttribute('controls', '');
					// deleteButton.innerHTML = "Delete";
					// clipLabel.innerHTML = "clip" + buttonID;

					// clipContainer.appendChild(audio);
					// clipContainer.appendChild(clipLabel);
					// clipContainer.appendChild(deleteButton);
					// var audioFile = record.parentNode;
	    			// audioFile.appendChild(clipContainer);
					// soundClips.appendChild(clipContainer);

					var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
					
					formData.append("audio" + buttonID, blob, "audioFile" + buttonID);
					console.log(Array.from(formData));

					chunks = [];
					var audioURL = window.URL.createObjectURL(blob);
					// audio.src = audioURL;

				    stop.disabled = true;
					stop.classList.remove("btn-primary");
					stop.classList.add("btn-secondary");
					record.disabled = true;

					//change buttonID
				    buttonID ++;
				    record = document.querySelector('#recordButton' + buttonID);
					stop = document.querySelector('#stopButton' + buttonID);

					//enable next page button
					audio_check = true;

					// deleteButton.onclick = function(e) {
					// 	var evtTgt = e.target;
					// 	evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
					// }

					recordStart();
				}
	        
	      })

	      // Error callback
			.catch(function(err) {
				console.log('The following getUserMedia error occured: ' + err);
			}
	   );
	} else {
	   console.log('getUserMedia not supported on your browser!');
	}
}

recordStart();