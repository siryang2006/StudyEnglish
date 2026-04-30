// 音频处理模块 - 移动端优化版
(function() {
    'use strict';

    class AudioManager {
        constructor() {
            this.synth = window.speechSynthesis;
            this.voices = [];
            this.currentVoice = null;
            this.unlocked = false;
            this.init();
        }

        init() {
            // 等待语音列表加载
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => {
                    this.voices = this.synth.getVoices();
                    this.selectEnglishVoice();
                };
            }
            this.voices = this.synth.getVoices();
            this.selectEnglishVoice();

            // 音标对应的示例单词（使用ASCII表示音标）
            this.phoneticWords = {
                'i:': 'sheep', 'I': 'ship', 'e': 'bed', 'ae': 'cat',
                'a:': 'car', 'o': 'hot', 'o:': 'door', 'U': 'book',
                'u:': 'moon', 'Q': 'bus', 'E:': 'bird', 'E': 'about',
                'eI': 'day', 'aI': 'eye', 'oI': 'boy', 'aU': 'now',
                'EU': 'go', 'Ie': 'ear', 'eE': 'air', 'UE': 'tour',
                'p': 'pen', 'b': 'boy', 't': 'tea', 'd': 'dog',
                'k': 'key', 'g': 'go', 'f': 'fish', 'v': 'voice',
                'T': 'think', 'D': 'this', 's': 'sun', 'z': 'zoo',
                'S': 'she', 'Z': 'pleasure', 'tS': 'chair', 'dZ': 'jump',
                'm': 'man', 'n': 'no', 'N': 'sing', 'l': 'like',
                'r': 'red', 'w': 'we', 'j': 'yes', 'h': 'he'
            };

            this.setupUnlock();
        }

        setupUnlock() {
            var self = this;
            var events = ['touchstart', 'touchend', 'mousedown', 'click', 'keydown'];
            var done = false;

            var unlock = function() {
                if (done) return;
                done = true;

                try {
                    // 方法1: 空发音解锁
                    var utterance = new SpeechSynthesisUtterance('');
                    utterance.volume = 0;
                    self.synth.speak(utterance);
                    setTimeout(function() {
                        self.synth.cancel();
                    }, 200);
                } catch (e) {}

                try {
                    // 方法2: AudioContext解锁
                    var AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (AudioContext) {
                        var ctx = new AudioContext();
                        if (ctx.state === 'suspended') {
                            ctx.resume();
                        }
                    }
                } catch (e) {}

                self.unlocked = true;
                console.log('Audio unlocked for mobile');
            };

            events.forEach(function(evt) {
                document.addEventListener(evt, unlock, { once: true, passive: true });
            });
        }

        selectEnglishVoice() {
            var preferred = [
                'Google US English',
                'Microsoft Zira - English (United States)',
                'Samantha',
                'Victoria'
            ];

            for (var i = 0; i < preferred.length; i++) {
                var voice = this.voices.find(function(v) { return v.name === preferred[i]; });
                if (voice) {
                    this.currentVoice = voice;
                    return;
                }
            }

            this.currentVoice = this.voices.find(function(v) { return v.lang === 'en-US'; })
                || this.voices.find(function(v) { return v.lang.startsWith('en'); });
        }

        speak(text, rate, pitch) {
            if (!this.synth || !text) return;

            rate = rate || 0.8;
            pitch = pitch || 1.1;

            var self = this;

            // iOS需要延迟
            setTimeout(function() {
                self.synth.cancel();

                var utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = self.currentVoice;
                utterance.rate = rate;
                utterance.pitch = pitch;
                utterance.volume = 1;
                utterance.lang = 'en-US';

                utterance.onerror = function(e) {
                    console.warn('Speech error:', e);
                };

                utterance.onstart = function() {
                    console.log('Speaking:', text);
                };

                self.synth.speak(utterance);
            }, 100);
        }

        speakPhonetic(symbol) {
            var word = this.phoneticWords[symbol];
            if (word) {
                this.speak(word, 0.7, 1.2);
            } else {
                this.speak(symbol, 0.6, 1.0);
            }
        }

        speakLetter(letter) {
            var letterData = alphabetData.find(function(item) { return item.letter === letter; });
            if (letterData) {
                this.speak(letter, 0.7, 1.3);
                var self = this;
                setTimeout(function() {
                    self.speak(letterData.word, 0.8, 1.1);
                }, 1000);
            }
        }

        speakWord(word) {
            this.speak(word, 0.75, 1.1);
        }

        speakSentence(sentence) {
            this.speak(sentence, 0.8, 1.0);
        }
    }

    // 全局音频管理器
    window.audioManager = new AudioManager();
})();
