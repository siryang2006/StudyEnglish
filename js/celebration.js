// 庆祝和动画效果增强模块

class CelebrationManager {
    constructor() {
        this.overlay = null;
        this.isAnimating = false;
    }

    // 超级庆祝效果（完成重要内容时触发）
    superCelebration(message = '太棒了！', icon = '🎉') {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 创建覆盖层
        this.overlay = document.createElement('div');
        this.overlay.className = 'celebration-overlay';
        document.body.appendChild(this.overlay);

        // 1. 闪光效果
        this.createFlash();

        // 2. 烟花效果
        this.createFireworks(15);

        // 3. 星星雨
        this.createStarRain(30);

        // 4. 彩带
        this.createConfetti(50);

        // 5. 显示奖励弹窗
        setTimeout(() => {
            this.showRewardPopup(message, icon);
        }, 500);

        // 6. 播放庆祝音效
        if (window.audioManager) {
            this.playCelebrationSound();
        }

        // 7. 清理
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.remove();
            }
            this.isAnimating = false;
        }, 4000);
    }

    createFlash() {
        const flash = document.createElement('div');
        flash.className = 'success-flash';
        this.overlay.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
    }

    createFireworks(count) {
        const colors = ['#FF6B9A', '#6C63FF', '#FFD93D', '#00D2A0', '#FF8C00'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                // 发射点
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                // 创建烟花粒子
                for (let j = 0; j < 20; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'firework-burst';
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    const angle = (Math.PI * 2 * j) / 20;
                    const distance = 50 + Math.random() * 100;
                    particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                    particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                    particle.style.animationDelay = `${Math.random() * 0.3}s`;
                    
                    this.overlay.appendChild(particle);
                    setTimeout(() => particle.remove(), 1000);
                }
            }, i * 200);
        }
    }

    createStarRain(count) {
        const stars = ['⭐', '🌟', '✨', '💫', '⭐'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star-rain';
                star.textContent = stars[Math.floor(Math.random() * stars.length)];
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDelay = `${Math.random() * 0.5}s`;
                star.style.fontSize = `${20 + Math.random() * 20}px`;
                this.overlay.appendChild(star);
                setTimeout(() => star.remove(), 3000);
            }, i * 100);
        }
    }

    createConfetti(count) {
        const colors = ['#FF6B9A', '#6C63FF', '#FFD93D', '#00D2A0', '#FF8C00', '#a18cd1'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                confetti.style.width = `${8 + Math.random() * 8}px`;
                confetti.style.height = `${8 + Math.random() * 8}px`;
                this.overlay.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 60);
        }
    }

    showRewardPopup(message, icon) {
        const popup = document.createElement('div');
        popup.className = 'reward-popup';
        popup.innerHTML = `
            <div class="reward-icon">${icon}</div>
            <div class="reward-text">${message}</div>
            <div class="reward-subtext">+10 ⭐ 星星</div>
        `;
        this.overlay.appendChild(popup);
        
        setTimeout(() => {
            if (popup.parentNode) popup.remove();
        }, 3000);
    }

    playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 播放上升音阶
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.5);
                }, index * 150);
            });
        } catch (e) {
            console.warn('Audio not supported');
        }
    }

    // 简单成功效果（小奖励）
    simpleSuccess(x, y) {
        // 创建小星星
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'score-popup-enhanced';
            star.textContent = '⭐';
            star.style.left = `${x + (Math.random() - 0.5) * 100}px`;
            star.style.top = `${y}px`;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1200);
        }

        // 播放简单音效
        if (window.audioManager) {
            window.audioManager.playSuccessSound();
        }
    }

    // 完成某个模块时的庆祝
    moduleComplete(moduleName) {
        this.superCelebration(`${moduleName} 完成！`, '🎓');
    }

    // 连续学习庆祝
    streakCelebration(days) {
        this.superCelebration(`${days}天连续学习！`, '🔥');
    }
}

// 全局庆祝管理器
window.celebration = new CelebrationManager();

// 页面过渡动画
function pageTransition(callback) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        if (callback) callback();
    }, 400);
    
    setTimeout(() => {
        if (transition.parentNode) transition.remove();
    }, 800);
}

// 增强的导航函数
function navigateToWithAnimation(page) {
    pageTransition(() => {
        window.location.href = page;
    });
}

// 点击波纹效果
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// 导出
window.pageTransition = pageTransition;
window.navigateToWithAnimation = navigateToWithAnimation;
window.createRipple = createRipple;
