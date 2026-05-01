// 游戏特效模块 - 3D爆炸、裂屏、震动
(function() {
    "use strict";

    var fx = {};

    // 屏幕震动
    fx.shake = function(intensity, duration) {
        intensity = intensity || 8;
        duration = duration || 400;
        var el = document.body;
        var start = Date.now();
        var orig = el.style.transform || '';
        function step() {
            var elapsed = Date.now() - start;
            if (elapsed > duration) { el.style.transform = orig; return; }
            var decay = 1 - elapsed / duration;
            var x = (Math.random() - 0.5) * 2 * intensity * decay;
            var y = (Math.random() - 0.5) * 2 * intensity * decay;
            el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    };

    // 3D爆炸粒子
    fx.explode3D = function(x, y, opts) {
        opts = opts || {};
        var count = opts.count || 20;
        var emojis = opts.emojis || ['💥','⭐','✨','🔥','💫'];
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;perspective:600px;';
        document.body.appendChild(container);

        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            var angle = (Math.PI * 2 * i) / count;
            var dist = 80 + Math.random() * 150;
            var tx = Math.cos(angle) * dist;
            var ty = Math.sin(angle) * dist;
            var tz = (Math.random() - 0.5) * 200;
            var rot = Math.random() * 720 - 360;
            var size = 16 + Math.random() * 20;
            p.textContent = emojis[i % emojis.length];
            p.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;font-size:' + size + 'px;' +
                'transition:all 0.8s cubic-bezier(0.25,0.46,0.45,0.94);opacity:1;transform:translate3d(0,0,0) rotate(0deg);';
            container.appendChild(p);

            (function(el, tx, ty, tz, rot) {
                requestAnimationFrame(function() {
                    el.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,' + tz + 'px) rotate(' + rot + 'deg) scale(0.2)';
                    el.style.opacity = '0';
                });
            })(p, tx, ty, tz, rot);
        }

        setTimeout(function() { container.remove(); }, 1000);
    };

    // 裂屏效果
    fx.crackScreen = function(duration) {
        duration = duration || 1500;
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;';

        var svg = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><filter id="crack-glow"><feGaussianBlur stdDeviation="1" result="blur"/>' +
            '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';

        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        for (var i = 0; i < 12; i++) {
            var angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.3;
            var len = 150 + Math.random() * 250;
            var ex = cx + Math.cos(angle) * len;
            var ey = cy + Math.sin(angle) * len;
            var mid1x = cx + Math.cos(angle) * len * 0.3 + (Math.random() - 0.5) * 40;
            var mid1y = cy + Math.sin(angle) * len * 0.3 + (Math.random() - 0.5) * 40;
            var mid2x = cx + Math.cos(angle) * len * 0.6 + (Math.random() - 0.5) * 30;
            var mid2y = cy + Math.sin(angle) * len * 0.6 + (Math.random() - 0.5) * 30;
            svg += '<path d="M' + cx + ',' + cy + ' Q' + mid1x + ',' + mid1y + ' ' + mid2x + ',' + mid2y +
                ' T' + ex + ',' + ey + '" stroke="rgba(255,255,255,0.8)" stroke-width="' + (1 + Math.random() * 2) +
                '" fill="none" filter="url(#crack-glow)"/>';

            if (Math.random() > 0.5) {
                var bx = mid2x + (Math.random() - 0.5) * 60;
                var by = mid2y + (Math.random() - 0.5) * 60;
                svg += '<path d="M' + mid2x + ',' + mid2y + ' L' + bx + ',' + by +
                    '" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="none"/>';
            }
        }
        svg += '</svg>';
        overlay.innerHTML = svg;
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.5s';
        document.body.appendChild(overlay);

        setTimeout(function() { overlay.style.opacity = '0'; }, duration - 500);
        setTimeout(function() { overlay.remove(); }, duration);
    };

    // 组合特效：震动 + 3D爆炸
    fx.impact = function(x, y) {
        fx.shake(10, 300);
        fx.explode3D(x, y, { count: 15, emojis: ['💥','🔥','⭐','✨'] });
    };

    // 超级特效：震动 + 3D爆炸 + 裂屏
    fx.superImpact = function(x, y) {
        fx.shake(15, 500);
        fx.explode3D(x, y, { count: 25, emojis: ['💥','🔥','⭐','✨','💫','🌟'] });
        fx.crackScreen(2000);
    };

    // 连击特效
    fx.comboEffect = function(combo, x, y) {
        if (combo >= 10) {
            fx.superImpact(x, y);
        } else if (combo >= 5) {
            fx.impact(x, y);
        } else if (combo >= 3) {
            fx.shake(5, 200);
            fx.explode3D(x, y, { count: 10, emojis: ['⭐','✨','💫'] });
        }
    };

    window.gameFx = fx;
})();
