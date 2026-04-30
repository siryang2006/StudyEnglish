// 音频处理模块 - 简化版，适配HTTPS
class AudioManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentVoice = null;
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
        // 立即尝试获取
        this.voices = this.synth.getVoices();
        this.selectEnglishVoice();
        
        // 预定义正确的发音映射（解决音标发音不准问题）
        this.phoneticWords = {
            'i:': 'sheep', 'ɪ': 'ship', 'e': 'bed', 'æ': 'cat',
            'ɑ:': 'car', 'ɒ': 'hot', 'ɔ:': 'door', 'ʊ': 'book',
            'u:': 'moon', 'ʌ': 'bus', 'ɜ:': 'bird', 'ə': 'about',
            'eɪ': 'day', 'aɪ': 'eye', 'ɔɪ': 'boy', 'aʊ': 'now',
            'əʊ': 'go', 'ɪə': 'ear', 'eə': 'air', 'ʊə': 'tour',
            'p': 'pen', 'b': 'boy', 't': 'tea', 'd': 'dog',
            'k': 'key', 'g': 'go', 'f': 'fish', 'v': 'voice',
            'θ': 'think', 'ð': 'this', 's': 'sun', 'z': 'zoo',
            'ʃ': 'she', 'ʒ': 'pleasure', 'tʃ': 'chair', 'dʒ': 'jump',
            'm': 'man', 'n': 'no', 'ŋ': 'sing', 'l': 'like',
            'r': 'red', 'w': 'we', 'j': 'yes', 'h': 'he'
        };
    }

    selectEnglishVoice() {
        // 优先选择儿童友好的美式英语发音
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
        
        // 回退到任何美式英语
        this.currentVoice = this.voices.find(voice =>
            voice.lang === 'en-US'
        ) || this.voices.find(voice =>
            voice.lang.startsWith('en')
        );
    }

    // 朗读文本
    speak(text, rate = 0.8, pitch = 1.1) {
        if (!this.synth) {
            console.warn('Speech synthesis not supported');
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

        this.synth.speak(utterance);
    }

    // 播放音标发音
    speakPhonetic(symbol) {
        const word = this.phoneticWords[symbol];
        if (word) {
            this.speak(word, 0.7, 1.2);
        } else {
            this.speak(symbol, 0.6, 1.0);
        }
    }

    // 播放字母发音
    speakLetter(letter) {
        const letterData = alphabetData.find(item => item.letter === letter);
        if (letterData) {
            this.speak(letter, 0.7, 1.3);
            setTimeout(() => {
                this.speak(letterData.word, 0.8, 1.1);
            }, 800);
        }
    }

    // 播放单词发音
    speakWord(word) {
        this.speak(word, 0.75, 1.1);
    }

    // 播放句子发音
    speakSentence(sentence) {
        this.speak(sentence, 0.8, 1.0);
    }

    // 播放成功音效 - 简化版
    playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.warn('Audio context not supported');
        }
    }

    // 播放错误音效
    playErrorSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.warn('Audio context not supported');
        }
    }

    // 播放点击音效
    playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // 忽略错误
        }
    }
}

// 全局音频管理器
window.audioManager = new AudioManager();
