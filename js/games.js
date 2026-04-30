// 游戏引擎 - 包含气球游戏、拼图游戏等

// ========== 气球游戏引擎 ==========
class BalloonGame {
    constructor() {
        this.score = 0;
        this.timer = 60;
        this.interval = null;
        this.currentTarget = '';
        this.container = null;
        this.isActive = false;
    }

    init() {
        this.container = document.getElementById('balloonsContainer');
        if (!this.container) {
            // 如果不在游戏页面，创建容器
            this.createBalloonContainer();
            return;
        }
        
        this.score = 0;
        this.timer = 60;
        this.isActive = true;
        
        document.getElementById('balloonScore').textContent = 0;
        document.getElementById('balloonTimer').textContent = 60;
        
        this.generateBalloons();
        this.startTimer();
    }

    createBalloonContainer() {
        const gameArea = document.getElementById('balloonGame');
        if (!gameArea) return;
        
        gameArea.innerHTML = `
            <div class="game-header">
                <h3>🎈 气球单词</h3>
                <div class="game-score">分数: <span id="balloonScore">0</span></div>
                <div class="game-timer">时间: <span id="balloonTimer">60</span>s</div>
            </div>
            <p style="text-align: center; margin-bottom: 15px; color: var(--text-light);">
                点击正确的单词气球！目标：<span id="balloonTarget">cat</span>
            </p>
            <div class="balloons-container" id="balloonsContainer"></div>
            <button class="back-to-games tab-btn" onclick="showGamesList()">返回游戏列表</button>
        `;
        
        this.container = document.getElementById('balloonsContainer');
        this.score = 0;
        this.timer = 60;
        this.isActive = true;
        
        document.getElementById('balloonScore').textContent = 0;
        document.getElementById('balloonTimer').textContent = 60;
        
        this.generateBalloons();
        this.startTimer();
    }

    generateBalloons() {
        if (!this.container) return;
        this.container.innerHTML = '';
        
        const words = ['cat', 'dog', 'bird', 'fish', 'book', 'ball', 'tree', 'sun', 'moon', 'star'];
        this.currentTarget = words[Math.floor(Math.random() * words.length)];
        
        const targetElem = document.getElementById('balloonTarget');
        if (targetElem) targetElem.textContent = this.currentTarget;
        
        // 创建1个正确答案 + 7个干扰项
        const allWords = [this.currentTarget];
        while (allWords.length < 8) {
            const random = words[Math.floor(Math.random() * words.length)];
            if (!allWords.includes(random)) {
                allWords.push(random);
            }
        }
        
        // 打乱顺序
        allWords.sort(() => Math.random() - 0.5);
        
        // 创建气球
        allWords.forEach((word, index) => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = word;
            balloon.style.left = `${5 + (index * 11.5)}%`;
            balloon.style.top = `${10 + Math.random() * 60}%`;
            balloon.style.background = this.getRandomGradient();
            balloon.style.animationDelay = `${index * 0.2}s`;
            
            // 点击事件
            balloon.onclick = (e) => this.popBalloon(balloon, word, e);
            
            this.container.appendChild(balloon);
        });
    }

    popBalloon(balloon, word, event) {
        if (!this.isActive) return;
        
        const rect = balloon.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        
        if (word === this.currentTarget) {
            // 正确气球 - 超级爆炸效果
            this.createExplosion(x, y, balloon.style.background);
            this.score += 10;
            document.getElementById('balloonScore').textContent = this.score;
            
            // 播放成功音效
            if (window.audioManager) {
                window.audioManager.playSuccessSound();
            }
            
            // 移除气球并生成新的一轮
            setTimeout(() => {
                this.generateBalloons();
            }, 500);
        } else {
            // 错误气球 - 摇晃效果
            balloon.classList.add('shake');
            if (window.audioManager) {
                window.audioManager.playErrorSound();
            }
            setTimeout(() => {
                balloon.classList.remove('shake');
            }, 500);
        }
        
        // 气球破裂动画
        balloon.classList.add('popping');
        setTimeout(() => {
            balloon.remove();
        }, 400);
    }

    createExplosion(x, y, color) {
        // 1. 闪光效果
        const flash = document.createElement('div');
        flash.className = 'explosion-flash';
        flash.style.left = `${x - 50}px`;
        flash.style.top = `${y - 50}px`;
        this.container.appendChild(flash);
        setTimeout(() => flash.remove(), 400);
        
        // 2. 粒子效果（20个粒子）
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = this.getRandomColor();
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.animationDelay = `${Math.random() * 0.2}s`;
            
            this.container.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
        
        // 3. 碎片效果（10个碎片）
        for (let i = 0; i < 10; i++) {
            const debris = document.createElement('div');
            debris.className = 'debris';
            debris.style.left = `${x}px`;
            debris.style.top = `${y}px`;
            debris.style.background = color;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 50; // 向上抛
            
            debris.style.setProperty('--tx', `${tx}px`);
            debris.style.setProperty('--ty', `${ty}px`);
            debris.style.animationDelay = `${Math.random() * 0.3}s`;
            
            this.container.appendChild(debris);
            setTimeout(() => debris.remove(), 1000);
        }
        
        // 4. 星星效果（5个星星）
        const stars = ['⭐', '🌟', '✨', '💫', '⭐'];
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'star-burst';
            star.textContent = stars[i % stars.length];
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 60 + Math.random() * 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            star.style.setProperty('--tx', `${tx}px`);
            star.style.setProperty('--ty', `${ty}px`);
            star.style.animationDelay = `${Math.random() * 0.2}s`;
            
            this.container.appendChild(star);
            setTimeout(() => star.remove(), 800);
        }
        
        // 5. 得分弹出
        const scorePop = document.createElement('div');
        scorePop.className = 'score-popup';
        scorePop.textContent = '+10 ⭐';
        scorePop.style.left = `${x - 30}px`;
        scorePop.style.top = `${y - 20}px`;
        this.container.appendChild(scorePop);
        setTimeout(() => scorePop.remove(), 1000);
    }

    startTimer() {
        if (this.interval) clearInterval(this.interval);
        
        this.interval = setInterval(() => {
            this.timer--;
            const timerElem = document.getElementById('balloonTimer');
            if (timerElem) timerElem.textContent = this.timer;
            
            if (this.timer <= 0) {
                this.stop();
                alert(`游戏结束！你的得分是：${this.score}`);
                if (window.storage) {
                    window.storage.addStars(Math.floor(this.score / 10));
                }
            }
        }, 1000);
    }

    stop() {
        this.isActive = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    getRandomGradient() {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#FFD93D'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// ========== 拼图游戏引擎 ==========
class PuzzleGame {
    constructor() {
        this.currentWord = null;
        this.letters = [];
        this.blanks = [];
    }

    init() {
        const words = [
            { word: 'CAT', hint: '🐱 猫', letters: ['C', 'A', 'T'] },
            { word: 'DOG', hint: '🐶 狗', letters: ['D', 'O', 'G'] },
            { word: 'SUN', hint: '☀️ 太阳', letters: ['S', 'U', 'N'] },
            { word: 'FISH', hint: '🐟 鱼', letters: ['F', 'I', 'S', 'H'] },
            { word: 'BIRD', hint: '🐦 鸟', letters: ['B', 'I', 'R', 'D'] }
        ];
        
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        
        this.renderPuzzle();
    }

    renderPuzzle() {
        // 创建字母池（打乱顺序）
        const shuffledLetters = [...this.currentWord.letters].sort(() => Math.random() - 0.5);
        
        const lettersContainer = document.getElementById('puzzleLetters');
        if (!lettersContainer) return;
        lettersContainer.innerHTML = '';
        
        shuffledLetters.forEach((letter, index) => {
            const div = document.createElement('div');
            div.className = 'puzzle-letter';
            div.textContent = letter;
            div.dataset.letter = letter;
            div.onclick = () => this.selectLetter(div);
            lettersContainer.appendChild(div);
        });
        
        // 创建空位
        const blanksContainer = document.getElementById('puzzleBlanks');
        if (!blanksContainer) return;
        blanksContainer.innerHTML = '';
        
        for (let i = 0; i < this.currentWord.letters.length; i++) {
            const div = document.createElement('div');
            div.className = 'puzzle-blank';
            div.dataset.index = i;
            blanksContainer.appendChild(div);
        }
        
        // 显示提示
        const hintElem = document.getElementById('puzzleHint');
        if (hintElem) hintElem.textContent = this.currentWord.hint;
        
        const wordElem = document.getElementById('puzzleWord');
        if (wordElem) wordElem.textContent = this.currentWord.word;
    }

    selectLetter(letterDiv) {
        if (letterDiv.classList.contains('used')) return;
        
        letterDiv.classList.add('used');
        
        const blanks = document.querySelectorAll('.puzzle-blank:not(.filled)');
        if (blanks.length > 0) {
            blanks[0].textContent = letterDiv.dataset.letter;
            blanks[0].classList.add('filled');
            blanks[0].dataset.letter = letterDiv.dataset.letter;
            
            // 检查是否完成
            setTimeout(() => this.checkPuzzle(), 300);
        }
    }

    checkPuzzle() {
        const filledBlanks = document.querySelectorAll('.puzzle-blank.filled');
        if (filledBlanks.length < this.currentWord.letters.length) return;
        
        const answer = Array.from(filledBlanks).map(el => el.dataset.letter).join('');
        
        if (answer === this.currentWord.word) {
            alert('正确！太棒了！');
            if (window.audioManager) {
                window.audioManager.playSuccessSound();
            }
            if (window.storage) {
                window.storage.addStars(10);
            }
            
            // 重置游戏
            setTimeout(() => this.init(), 1000);
        } else {
            alert('再试试看！');
            if (window.audioManager) {
                window.audioManager.playErrorSound();
            }
            
            // 清空空位
            const blanks = document.querySelectorAll('.puzzle-blank');
            blanks.forEach(blank => {
                blank.textContent = '';
                blank.classList.remove('filled');
                delete blank.dataset.letter;
            });
            
            // 重置字母
            document.querySelectorAll('.puzzle-letter').forEach(el => {
                el.classList.remove('used');
            });
        }
    }
}

// 全局游戏实例
window.balloonGame = new BalloonGame();
window.puzzleGame = new PuzzleGame();
