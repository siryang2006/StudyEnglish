// 主应用逻辑 - 增强炫酷版
class KidsEnglishApp {
    constructor() {
        this.stars = 0;
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.loadProgress();
        this.bindEvents();
        this.animateOnLoad();
        this.addPageTransitions();
    }

    loadProgress() {
        const saved = localStorage.getItem('kidsEnglishProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.stars = data.stars || 0;
        }
        this.updateStarDisplay();
    }

    saveProgress() {
        const data = {
            stars: this.stars,
            lastVisit: new Date().toISOString()
        };
        localStorage.setItem('kidsEnglishProgress', JSON.stringify(data));
    }

    addStars(count) {
        this.stars += count;
        this.updateStarDisplay();
        this.saveProgress();
        this.showStarAnimation(count);
        
        // 每获得50星星触发庆祝
        if (this.stars % 50 === 0 && window.celebration) {
            window.celebration.superCelebration(`太棒了！${this.stars}颗星星！`, '⭐');
        }
    }

    updateStarDisplay() {
        const starCount = document.getElementById('starCount');
        if (starCount) {
            starCount.textContent = this.stars;
        }
    }

    showStarAnimation(count) {
        // 使用增强的庆祝效果
        if (window.celebration && count >= 10) {
            window.celebration.simpleSuccess(event?.clientX || window.innerWidth/2, event?.clientY || window.innerHeight/2);
        }
    }

    bindEvents() {
        // 为所有菜单卡片添加点击波纹效果
        document.querySelectorAll('.menu-card').forEach(card => {
            card.classList.add('ripple');
            card.addEventListener('click', function(e) {
                if (window.createRipple) {
                    window.createRipple(e, this);
                }
            });
        });

        // 为所有按钮添加点击效果
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (window.createRipple) {
                    window.createRipple(e, this);
                }
            });
        });
    }

    animateOnLoad() {
        // 菜单卡片依次出现
        const cards = document.querySelectorAll('.menu-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // 欢迎文字动画
        const welcome = document.querySelector('.welcome-section h2');
        if (welcome) {
            welcome.style.background = 'linear-gradient(90deg, #6C63FF, #FF6B9A, #FFD93D, #00D2A0)';
            welcome.style.webkitBackgroundClip = 'text';
            welcome.style.webkitTextFillColor = 'transparent';
            welcome.style.backgroundClip = 'text';
        }
    }

    addPageTransitions() {
        // 为所有导航链接添加过渡动画
        document.querySelectorAll('a[href], .menu-card[onclick]').forEach(link => {
            link.addEventListener('click', function(e) {
                // 不阻止默认行为，只是添加动画
                if (window.pageTransition) {
                    e.preventDefault();
                    const href = this.href || (this.onclick ? this.onclick.toString().match(/'([^']+)'/)?.[1] : null);
                    if (href) {
                        window.pageTransition(() => {
                            window.location.href = href;
                        });
                    }
                }
            });
        });
    }
}

// 页面导航 - 带超酷动画
function navigateTo(page) {
    if (window.pageTransition) {
        window.pageTransition(() => {
            window.location.href = page;
        });
    } else {
        window.location.href = page;
    }
}

// 显示设置
function showSettings() {
    if (window.celebration) {
        window.celebration.simpleSuccess(window.innerWidth/2, window.innerHeight/2);
    }
    alert('设置功能开发中...\n\n将支持：\n- 音效开关\n- 难度选择\n- 学习提醒');
}

// 每日一句点击发音
function initDailySentence() {
    const sentenceElem = document.getElementById('dailySentence');
    if (sentenceElem) {
        sentenceElem.addEventListener('click', function() {
            if (window.audioManager) {
                window.audioManager.speakSentence(this.textContent);
            }
            if (window.celebration) {
                window.celebration.simpleSuccess(event.clientX, event.clientY);
            }
        });
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KidsEnglishApp();
    initDailySentence();
    
    // 页面加载完成后的炫酷效果
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    }, 100);
});
