document.addEventListener("DOMContentLoaded", function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'tr-TR'; 
    recognition.continuous = true;
    recognition.interimResults = true;

    var timeoutId;
    var isListening = false; 
    var toggleButton = document.getElementById('toggle-listening');
    var transcriptArea = document.getElementById('transcript');
    var saveButton = document.getElementById('save-text');
    var emailButton = document.getElementById('send-email');

    recognition.onresult = function(event) {
        clearTimeout(timeoutId);
        
        // Yeni konuşma parçasını mevcut metne ekle
        var currentTranscript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
        }
        transcriptArea.value += currentTranscript;

        // 2 saniye sessizlik sonrasında yeni bir satıra geç
        timeoutId = setTimeout(function() {
            transcriptArea.value += '\n';
        }, 2000);
    };

    recognition.onstart = function() {
        isListening = true;
        updateToggleButton();
    };

    recognition.onend = function() {
        isListening = false;
        updateToggleButton();
    };

    toggleButton.addEventListener('click', function() {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    function updateToggleButton() {
        if (isListening) {
            toggleButton.textContent = 'Dinleniyor...';
            toggleButton.style.backgroundColor = 'red';
        } else {
            toggleButton.textContent = 'Dinlemeyi Başlat/Durdur';
            toggleButton.style.backgroundColor = 'green';
        }
    }

    saveButton.addEventListener('click', function() {
        var textToSave = transcriptArea.value;
        var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "transcript.txt"); // 'FileSaver.js' kütüphanesi gereklidir
    });

    emailButton.addEventListener('click', function() {
        var emailBody = encodeURIComponent(transcriptArea.value);
        window.open('mailto:test@example.com?subject=Konuşma Metni&body=' + emailBody);
    });
});
