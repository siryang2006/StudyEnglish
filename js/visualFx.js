// 视觉特效模块 - 粒子星空 + 3D卡片
(function() {
    "use strict";

    // ===== 1. 粒子星空背景 =====
    function initParticleStarfield() {
        var canvas = document.createElement('canvas');
        canvas.id = 'starfield';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
        document.body.insertBefore(canvas, document.body.firstChild);

        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouse = { x: -1000, y: -1000 };
        var particleCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 12000));
        var connectDist = 120;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        document.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        var colors = ['rgba(108,99,255,', 'rgba(255,107,154,', 'rgba(255,217,61,', 'rgba(0,210,160,', 'rgba(79,172,254,'];

        for (var i = 0; i < particleCount; i++) {
            var c = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: 1.5 + Math.random() * 2.5,
                color: c,
                alpha: 0.3 + Math.random() * 0.5,
                pulse: Math.random() * Math.PI * 2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.pulse += 0.02;
                var a = p.alpha + Math.sin(p.pulse) * 0.15;

                // mouse repel
                var dx = p.x - mouse.x;
                var dy = p.y - mouse.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    var force = (100 - dist) / 100 * 0.8;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                p.vx *= 0.99;
                p.vy *= 0.99;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + a + ')';
                ctx.fill();

                // glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                grad.addColorStop(0, p.color + (a * 0.3) + ')');
                grad.addColorStop(1, p.color + '0)');
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // connect lines
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var d = dx * dx + dy * dy;
                    if (d < connectDist * connectDist) {
                        var alpha = (1 - Math.sqrt(d) / connectDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(108,99,255,' + alpha + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // mouse connect
            for (var i = 0; i < particles.length; i++) {
                var dx = particles[i].x - mouse.x;
                var dy = particles[i].y - mouse.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 150) {
                    var alpha = (1 - d / 150) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(255,107,154,' + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ===== 2. 3D卡片悬浮 =====
    function init3DCards() {
        var cards = document.querySelectorAll('.menu-card');
        cards.forEach(function(card) {
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '800px';

            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / centerY * -12;
                var rotateY = (x - centerX) / centerX * 12;

                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.05)';
                card.style.boxShadow = (rotateY * -2) + 'px ' + (rotateX * 2 + 20) + 'px 40px rgba(0,0,0,0.2)';

                // shine effect
                var shine = card.querySelector('.card-shine');
                if (!shine) {
                    shine = document.createElement('div');
                    shine.className = 'card-shine';
                    shine.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;z-index:1;';
                    card.appendChild(shine);
                }
                var shineX = (x / rect.width) * 100;
                var shineY = (y / rect.height) * 100;
                shine.style.background = 'radial-gradient(circle at ' + shineX + '% ' + shineY + '%, rgba(255,255,255,0.25) 0%, transparent 60%)';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
                card.style.boxShadow = '';
                var shine = card.querySelector('.card-shine');
                if (shine) shine.style.background = 'none';
            });
        });
    }

    // ===== 3. 霓虹光效文字 =====
    function initNeonText() {
        var titles = document.querySelectorAll('.welcome-section h2, .main-header h1');
        titles.forEach(function(el) {
            el.classList.add('neon-glow');
        });
    }

    // ===== 4. 波浪动画 =====
    function initWaveAnimation() {
        var footer = document.querySelector('.main-footer');
        if (!footer) return;

        var wave = document.createElement('div');
        wave.className = 'wave-container';
        wave.innerHTML = '<svg class="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">' +
            '<path class="wave-path wave-1" d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"/>' +
            '<path class="wave-path wave-2" d="M0,80 C240,40 480,100 720,60 C960,20 1200,80 1440,50 L1440,120 L0,120 Z"/>' +
            '<path class="wave-path wave-3" d="M0,90 C180,60 360,100 540,70 C720,40 900,90 1080,60 C1260,30 1380,80 1440,70 L1440,120 L0,120 Z"/>' +
            '</svg>';
        footer.parentNode.insertBefore(wave, footer);
    }

    // ===== 初始化 =====
    document.addEventListener('DOMContentLoaded', function() {
        initParticleStarfield();
        init3DCards();
        initNeonText();
        initWaveAnimation();
    });
})();
