// 主应用逻辑
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
    }

    updateStarDisplay() {
        const starCount = document.getElementById('starCount');
        if (starCount) {
            starCount.textContent = this.stars;
        }
    }

    showStarAnimation(count) {
        const animation = document.createElement('div');
        animation.className = 'star-collect';
        animation.textContent = `⭐ +${count}`;
        animation.style.cssText = `
            position: fixed;
            top: 100px;
            right: 50px;
            font-size: 24px;
            font-weight: bold;
            color: #FFD93D;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(animation);
        setTimeout(() => animation.remove(), 600);
    }

    bindEvents() {
        // 为所有菜单卡片添加点击波纹效果
        document.querySelectorAll('.menu-card').forEach(card => {
            card.classList.add('ripple');
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
    }
}

// 页面导航
function navigateTo(page) {
    // 添加页面切换动画
    const app = document.getElementById('app');
    app.classList.add('page-exit');

    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

// 显示设置
function showSettings() {
    alert('设置功能开发中...\n\n将支持：\n- 音效开关\n- 难度选择\n- 学习提醒');
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KidsEnglishApp();
});
