document.addEventListener("DOMContentLoaded", function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'tr-TR'; 
    recognition.continuous = true;
    recognition.interimResults = true;

    var timeoutId;
    var transcript = '';
    var isListening = false; // Dinleme durumu
    var startButton = document.getElementById('start-btn');

    recognition.onresult = function(event) {
        clearTimeout(timeoutId);
        transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('transcript').textContent = transcript;

        timeoutId = setTimeout(function() {
            transcript += '\n';
            document.getElementById('transcript').textContent = transcript;
        }, 2000);
    };

    recognition.onstart = function() {
        isListening = true;
        updateButton();
    };

    recognition.onend = function() {
        isListening = false;
        updateButton();
        recognition.start(); // Sürekli dinlemeyi sağla
    };

    startButton.addEventListener('click', function() {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    function updateButton() {
        if (isListening) {
            startButton.textContent = 'Dinleniyor...';
            startButton.style.backgroundColor = 'red';
        } else {
            startButton.textContent = 'Dinlemeyi Başlat';
            startButton.style.backgroundColor = 'green';
        }
    }
});
