document.addEventListener("DOMContentLoaded", function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'tr-TR'; // Türkçe dil ayarı
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById('transcript').textContent = transcript;
    };

    document.getElementById('start-btn').addEventListener('click', function() {
        recognition.start();
    });
});
