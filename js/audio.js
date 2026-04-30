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
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => {
                    this.voices = this.synth.getVoices();
                    this.selectEnglishVoice();
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

            var unlock = function() {
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
            };

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
    }

    window.audioManager = new AudioManager();
})();
