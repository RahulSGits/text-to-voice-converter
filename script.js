const textArea = document.getElementById('text');
const speakButton = document.getElementById('speakButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const saveButton = document.getElementById('saveButton');
const rateInput = document.getElementById('rate');
const voiceSelect = document.getElementById('voice');
const themeToggle = document.getElementById('themeToggle');

let utterance = null;

// Load voices and populate the dropdown
function populateVoices() {
    const voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

// Convert text to speech
function textToSpeech() {
    const text = textArea.value;
    if (text.trim() === '') {
        alert('Please enter some text.');
        return;
    }
    window.speechSynthesis.cancel();
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rateInput.value;
    const selectedVoice = voiceSelect.value;
    if (selectedVoice) {
        utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
    }
    window.speechSynthesis.speak(utterance);
}

// Pause speech
function pauseSpeech() {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
}

// Resume speech
function resumeSpeech() {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
}

// Save text as a .txt file
function saveText() {
    const text = textArea.value;
    if (text.trim() === '') {
        alert('No text to save.');
        return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text-to-speech.txt';
    link.click();
}

// Event Listeners
window.speechSynthesis.onvoiceschanged = populateVoices;
speakButton.addEventListener('click', textToSpeech);
pauseButton.addEventListener('click', pauseSpeech);
resumeButton.addEventListener('click', resumeSpeech);
saveButton.addEventListener('click', saveText);
themeToggle.addEventListener('change', toggleTheme);

// Initial setup
populateVoices();

