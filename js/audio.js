// 音频处理模块 - 移动端优化版
(function() {
    "use strict";

    class AudioManager {
        constructor() {
            this.synth = window.speechSynthesis;
            this.voices = [];
            this.currentVoice = null;
            this.unlocked = false;
            this.init();
        }

        init() {
            var self = this;
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = function() {
                    self.voices = self.synth.getVoices();
                    self.selectEnglishVoice();
                };
            }
            this.voices = this.synth.getVoices();
            this.selectEnglishVoice();
            this.setupUnlock();
        }

        setupUnlock() {
            var self = this;
            var events = ["touchstart", "touchend", "mousedown", "click", "keydown"];
            var done = false;

            function unlock() {
                if (done) return;
                done = true;
                try {
                    var u = new SpeechSynthesisUtterance("");
                    u.volume = 0;
                    self.synth.speak(u);
                    setTimeout(function() { self.synth.cancel(); }, 200);
                } catch(e) {}
                self.unlocked = true;
                console.log("Audio unlocked for mobile");
            }

            events.forEach(function(evt) {
                document.addEventListener(evt, unlock, { once: true, passive: true });
            });
        }

        selectEnglishVoice() {
            var preferred = [
                "Google US English",
                "Microsoft Zira - English (United States)",
                "Samantha",
                "Victoria"
            ];
            for (var i = 0; i < preferred.length; i++) {
                var voice = this.voices.find(function(v) { return v.name === preferred[i]; });
                if (voice) { this.currentVoice = voice; return; }
            }
            this.currentVoice = this.voices.find(function(v) { return v.lang === "en-US"; }) ||
                this.voices.find(function(v) { return v.lang.startsWith("en"); });
        }

        speak(text, rate, pitch) {
            if (!this.synth || !text) return;
            var self = this;
            setTimeout(function() {
                self.synth.cancel();
                var u = new SpeechSynthesisUtterance(text);
                u.voice = self.currentVoice;
                u.rate = rate || 0.8;
                u.pitch = pitch || 1.1;
                u.volume = 1;
                u.lang = "en-US";
                u.onerror = function(e) { console.warn("Speech error:", e); };
                u.onstart = function() { console.log("Speaking:", text); };
                self.synth.speak(u);
            }, 100);
        }

        speakWord(word) { this.speak(word, 0.75, 1.1); }
        speakLetter(letter) { this.speak(letter, 0.7, 1.2); }
        speakSentence(text) { this.speak(text, 0.8, 1.0); }
        speakPhonetic(symbol) { this.speak(symbol, 0.6, 1.0); }

        _playTone(freq, duration, type) {
            try {
                var ctx = new (window.AudioContext || window.webkitAudioContext)();
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = type || "sine";
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + duration);
            } catch(e) { console.warn("Tone error:", e); }
        }

        playSuccessSound() {
            var self = this;
            this._playTone(523, 0.15, "sine");
            setTimeout(function() { self._playTone(659, 0.15, "sine"); }, 100);
            setTimeout(function() { self._playTone(784, 0.3, "sine"); }, 200);
        }

        playErrorSound() {
            this._playTone(200, 0.4, "sawtooth");
        }

        playClickSound() {
            this._playTone(1000, 0.08, "sine");
        }
    }

    window.audioManager = new AudioManager();
})();
