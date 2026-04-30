// 音标学习模块
class PhoneticsModule {
    constructor() {
        this.currentTab = 'vowels';
        this.gameMode = false;
        this.currentQuestion = null;
        this.init();
    }

    init() {
        this.renderPhonetics();
        this.bindEvents();
        this.updateStarDisplay();
    }

    renderPhonetics() {
        this.renderVowels();
        this.renderConsonants();
    }

    renderVowels() {
        const grid = document.getElementById('vowelsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        vowelPhonetics.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'phonetic-card ripple';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="phonetic-symbol">${item.symbol}</div>
                <div class="phonetic-name">${item.name}</div>
                <div class="phonetic-example">${item.example[0]}</div>
            `;
            card.onclick = () => this.playPhonetic(item);
            grid.appendChild(card);
        });
    }

    renderConsonants() {
        const grid = document.getElementById('consonantsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        consonantPhonetics.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'phonetic-card ripple';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="phonetic-symbol">${item.symbol}</div>
                <div class="phonetic-name">${item.name}</div>
                <div class="phonetic-example">${item.example[0]}</div>
            `;
            card.onclick = () => this.playPhonetic(item);
            grid.appendChild(card);
        });
    }

    playPhonetic(item) {
        // 播放发音
        audioManager.speakPhonetic(item.symbol);

        // 显示详情
        this.showDetail(item);

        // 标记已学习
        storage.completePhonetic(item.symbol);
        this.updateStarDisplay();

        // 动画效果
        const cards = document.querySelectorAll('.phonetic-card');
        cards.forEach(card => {
            if (card.querySelector('.phonetic-symbol').textContent === item.symbol) {
                card.classList.add('playing');
                setTimeout(() => card.classList.remove('playing'), 600);
            }
        });
    }

    showDetail(item) {
        const detail = document.getElementById('phoneticDetail');
        detail.innerHTML = `
            <div class="detail-header">
                <div class="detail-symbol">${item.symbol}</div>
                <div class="detail-info">
                    <h3>${item.name}</h3>
                    <p>点击单词听发音</p>
                </div>
            </div>
            <div class="mouth-diagram">👄</div>
            <div class="example-words">
                <h4>示例单词</h4>
                <div class="word-list">
                    ${item.example.map(word => `
                        <div class="word-item" onclick="audioManager.speakWord('${word}')">
                            ${word}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        detail.classList.add('active');
    }

    bindEvents() {
        // Tab切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        // 更新按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // 切换面板
        document.querySelectorAll('.phonetics-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        document.getElementById(`${tab}-panel`).style.display = 'block';

        this.currentTab = tab;

        if (tab === 'game') {
            this.startPhoneticGame();
        }
    }

    startPhoneticGame() {
        const allPhonetics = [...vowelPhonetics, ...consonantPhonetics];
        const correct = allPhonetics[Math.floor(Math.random() * allPhonetics.length)];
        this.currentQuestion = correct;

        const questionEl = document.getElementById('gameQuestion');
        questionEl.textContent = `听发音，选择正确的音标`;

        // 播放正确音标发音
        audioManager.speakPhonetic(correct.symbol);

        // 生成选项
        const options = [correct];
        while (options.length < 4) {
            const random = allPhonetics[Math.floor(Math.random() * allPhonetics.length)];
            if (!options.find(o => o.symbol === random.symbol)) {
                options.push(random);
            }
        }

        // 打乱顺序
        options.sort(() => Math.random() - 0.5);

        const optionsEl = document.getElementById('gameOptions');
        optionsEl.innerHTML = options.map(opt => `
            <div class="game-option" onclick="phonetics.checkAnswer('${opt.symbol}', '${correct.symbol}')">
                ${opt.symbol}
            </div>
        `).join('');

        document.getElementById('gameResult').innerHTML = '';
    }

    checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.game-option');
        options.forEach(opt => {
            opt.classList.remove('correct', 'wrong');
            if (opt.textContent.trim() === correct) {
                opt.classList.add('correct');
            } else if (opt.textContent.trim() === selected && selected !== correct) {
                opt.classList.add('wrong');
            }
            opt.onclick = null; // 禁用点击
        });

        const resultEl = document.getElementById('gameResult');
        if (selected === correct) {
            resultEl.innerHTML = '<p style="color:green;font-size:20px;">✓ 正确！太棒了！</p>';
            audioManager.playSuccessSound();
            storage.addStars(5);
            this.updateStarDisplay();
        } else {
            resultEl.innerHTML = '<p style="color:red;font-size:20px;">✗ 再试试看！</p>';
            audioManager.playErrorSound();
        }

        // 2秒后下一题
        setTimeout(() => this.startPhoneticGame(), 2000);
    }

    updateStarDisplay() {
        const starCount = document.getElementById('starCount');
        if (starCount && storage) {
            starCount.textContent = storage.data.stars;
        }
    }
}

// 全局音标模块
let phonetics;
document.addEventListener('DOMContentLoaded', () => {
    phonetics = new PhoneticsModule();
});
