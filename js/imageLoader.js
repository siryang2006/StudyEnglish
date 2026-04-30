// 图片加载管理器 - 支持真实图片和emoji备用方案

class ImageLoader {
    constructor() {
        this.cache = new Map();
        this.useEmojiFallback = true; // 如果图片加载失败，使用emoji
    }

    // 加载图片，带emoji备用
    loadImage(src, emoji, alt = '') {
        return new Promise((resolve, reject) => {
            // 如果已经是emoji或者没有真实图片路径，直接返回emoji
            if (!src || this.useEmojiFallback) {
                resolve({ type: 'emoji', value: emoji || '🖼️' });
                return;
            }

            // 检查缓存
            if (this.cache.has(src)) {
                resolve(this.cache.get(src));
                return;
            }

            const img = new Image();
            img.onload = () => {
                const result = { type: 'image', value: src };
                this.cache.set(src, result);
                resolve(result);
            };
            img.onerror = () => {
                // 图片加载失败，使用emoji
                console.warn(`Image not found: ${src}, using emoji fallback`);
                const result = { type: 'emoji', value: emoji || '🖼️' };
                resolve(result);
            };
            img.src = src;
        });
    }

    // 创建图片元素（自动处理emoji和真实图片）
    async createImageElement(src, emoji, alt = '', className = '') {
        const result = await this.loadImage(src, emoji, alt);
        
        if (result.type === 'image') {
            const img = document.createElement('img');
            img.src = result.value;
            img.alt = alt;
            img.className = className;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            return img;
        } else {
            const span = document.createElement('span');
            span.className = className;
            span.textContent = result.value;
            span.style.fontSize = '64px';
            return span;
        }
    }

    // 批量预加载图片
    preloadImages(imageList) {
        const promises = imageList.map(({ src, emoji }) => 
            this.loadImage(src, emoji)
        );
        return Promise.all(promises);
    }

    // 检查真实图片是否可用
    async checkImageAvailable(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }
}

// 全局图片加载器
window.imageLoader = new ImageLoader();

// 导出数据格式示例
window.imageData = {
    alphabet: [
        { letter: 'A', word: 'Apple', imageSrc: 'assets/images/letters/A.png', emoji: '🍎' },
        { letter: 'B', word: 'Ball', imageSrc: 'assets/images/letters/B.png', emoji: '⚽' },
        // ...
    ],
    words: {
        animals: [
            { word: 'cat', chinese: '猫', imageSrc: 'assets/images/animals/cat.png', emoji: '🐱' },
            { word: 'dog', chinese: '狗', imageSrc: 'assets/images/animals/dog.png', emoji: '🐶' },
            // ...
        ]
    }
};
