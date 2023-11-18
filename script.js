document.addEventListener("DOMContentLoaded", function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'tr-TR'; // Türkçe dil ayarı
    recognition.continuous = true;
    recognition.interimResults = true;

    var timeoutId;
    var transcript = '';

    recognition.onresult = function(event) {
        // Mevcut zamanlayıcıyı sıfırla
        clearTimeout(timeoutId);

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('transcript').textContent = transcript;

        // 2 saniye bekleyip yeni satıra geç
        timeoutId = setTimeout(function() {
            transcript += '\n'; // Yeni satıra geç
            document.getElementById('transcript').textContent = transcript;
        }, 2000); // 2 saniye beklemeyi ayarla
    };

    recognition.onend = function() {
        recognition.start(); // Dinleme sona erdiğinde tekrar başlat
    };

    document.getElementById('start-btn').addEventListener('click', function() {
        recognition.start();
    });
});
