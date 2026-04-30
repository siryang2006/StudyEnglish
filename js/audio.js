// 音频处理模块 - 移动端适配版
class AudioManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentVoice = null;
        this.userInteracted = false;
        this.init();
    }

    init() {
        // 监听用户首次交互（移动端必需）
        this.setupUserInteraction();

        // 等待语音列表加载
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
                this.selectEnglishVoice();
            };
        }
        // 立即尝试获取
        this.voices = this.synth.getVoices();
        this.selectEnglishVoice();

        // 音标对应的示例单词（用于正确发音）
        this.phoneticWords = {
            'i:': 'sheep', 'I': 'ship', 'e': 'bed', 'ae': 'cat',
            'a:': 'car', 'D': 'hot', 'O:': 'door', 'U': 'book',
            'u:': 'moon', 'Q': 'bus', 'E:': 'bird', 'E': 'about',
            'eI': 'day', 'aI': 'eye', 'OI': 'boy', 'aU': 'now',
            'EU': 'go', 'Ie': 'ear', 'eE': 'air', 'UE': 'tour',
            'p': 'pen', 'b': 'boy', 't': 'tea', 'd': 'dog',
            'k': 'key', 'g': 'go', 'f': 'fish', 'v': 'voice',
            'T': 'think', 'D': 'this', 's': 'sun', 'z': 'zoo',
            'S': 'she', 'Z': 'pleasure', 'tS': 'chair', 'dZ': 'jump',
            'm': 'man', 'n': 'no', 'N': 'sing', 'l': 'like',
            'r': 'red', 'w': 'we', 'j': 'yes', 'h': 'he'
        };
    }

    setupUserInteraction() {
        const unlockAudio = () => {
            if (this.userInteracted) return;
            this.userInteracted = true;

            // 移动端：触发一次空发音以解锁音频
            if (this.synth) {
                const utterance = new SpeechSynthesisUtterance('');
                utterance.volume = 0;
                this.synth.speak(utterance);
                setTimeout(() => this.synth.cancel(), 100);
            }

            console.log('Audio unlocked for mobile');
        };

        // 监听多种交互事件
        ['touchstart', 'touchend', 'mousedown', 'click', 'keydown'].forEach(event => {
            document.addEventListener(event, unlockAudio, { once: true, passive: true });
        });
    }

    selectEnglishVoice() {
        const preferredVoices = [
            'Google US English',
            'Microsoft Zira - English (United States)',
            'Samantha',
            'Victoria'
        ];

        for (let name of preferredVoices) {
            let voice = this.voices.find(v => v.name === name);
            if (voice) {
                this.currentVoice = voice;
                return;
            }
        }

        this.currentVoice = this.voices.find(voice => voice.lang === 'en-US')
            || this.voices.find(voice => voice.lang.startsWith('en'));
    }

    speak(text, rate = 0.8, pitch = 1.1) {
        if (!this.synth) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // 用户未交互时，延迟重试
        if (!this.userInteracted) {
            console.warn('Waiting for user interaction...');
            setTimeout(() => this.speak(text, rate, pitch), 500);
            return;
        }

        // 取消当前正在朗读的内容
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.currentVoice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1;
        utterance.lang = 'en-US';

        utterance.onerror = (e) => {
            console.warn('Speech error:', e);
        };

        utterance.onstart = () => {
            console.log('Speaking:', text);
        };

        this.synth.speak(utterance);
    }

    speakPhonetic(symbol) {
        const word = this.phoneticWords[symbol];
        if (word) {
            this.speak(word, 0.7, 1.2);
        } else {
            this.speak(symbol, 0.6, 1.0);
        }
    }

    speakLetter(letter) {
        const letterData = alphabetData.find(item => item.letter === letter);
        if (letterData) {
            this.speak(letter, 0.7, 1.3);
            setTimeout(() => {
                this.speak(letterData.word, 0.8, 1.1);
            }, 800);
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
