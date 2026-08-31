/* ========================================
   AirGuard AI — Utility Functions
   Shared helpers, observers, counters
   ======================================== */

const Utils = {
    /**
     * Scroll-reveal observer: adds 'visible' class when elements enter viewport
     */
    initScrollReveal: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Don't unobserve — re-enter triggers if user scrolls back up
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    },

    /**
     * Animated counter — counts up from 0 to target
     * @param {HTMLElement} el - Element to animate
     * @param {number} target - Target number
     * @param {string} suffix - Suffix to append (e.g., '%', '+')
     * @param {number} duration - Animation duration in ms
     */
    animateCounter: function(el, target, suffix = '', duration = 2000) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !el.dataset.counted) {
                    el.dataset.counted = 'true';
                    const start = 0;
                    const startTime = performance.now();
                    const isFloat = target % 1 !== 0;

                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = start + (target - start) * eased;

                        if (isFloat) {
                            el.textContent = current.toFixed(1) + suffix;
                        } else {
                            el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }
                    requestAnimationFrame(update);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(el);
    },

    /**
     * Format number to Indian locale
     */
    formatIndian: function(num) {
        return num.toLocaleString('en-IN');
    },

    /**
     * Format currency in INR
     */
    formatCurrency: function(num) {
        return '₹' + num.toLocaleString('en-IN');
    },

    /**
     * Simple debounce function
     */
    debounce: function(fn, delay = 250) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Draw a simple bar chart on a canvas element
     */
    drawBarChart: function(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const maxVal = Math.max(...data.map(d => d.value)) * 1.2;
        const barWidth = (chartW / data.length) * 0.6;
        const gap = (chartW / data.length) * 0.4;

        // Background
        ctx.fillStyle = options.bg || 'transparent';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = options.gridColor || 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = options.labelColor || '#94A3B8';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            const val = Math.round(maxVal - (maxVal / 4) * i);
            ctx.fillText(options.prefix ? options.prefix + Utils.formatIndian(val) : Utils.formatIndian(val), padding.left - 8, y + 4);
        }

        // Bars
        data.forEach((d, i) => {
            const x = padding.left + (chartW / data.length) * i + gap / 2;
            const barH = (d.value / maxVal) * chartH;
            const y = padding.top + chartH - barH;

            // Gradient bar
            const grad = ctx.createLinearGradient(x, y, x, y + barH);
            grad.addColorStop(0, options.barColor1 || '#3B82F6');
            grad.addColorStop(1, options.barColor2 || '#2563EB');
            ctx.fillStyle = grad;

            // Rounded top
            const r = Math.min(6, barWidth / 2);
            ctx.beginPath();
            ctx.moveTo(x, y + barH);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.arcTo(x + barWidth, y, x + barWidth, y + r, r);
            ctx.lineTo(x + barWidth, y + barH);
            ctx.closePath();
            ctx.fill();

            // X-axis label
            ctx.fillStyle = options.labelColor || '#94A3B8';
            ctx.font = '11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(d.label, x + barWidth / 2, height - padding.bottom + 20);
        });
    },

    /**
     * Draw a line chart on a canvas element
     */
    drawLineChart: function(canvas, datasets, labels, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const allValues = datasets.flatMap(ds => ds.data);
        const maxVal = Math.max(...allValues) * 1.2;

        // Grid
        ctx.strokeStyle = options.gridColor || 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            ctx.fillStyle = options.labelColor || '#94A3B8';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 8, y + 4);
        }

        // X labels
        labels.forEach((label, i) => {
            const x = padding.left + (chartW / (labels.length - 1)) * i;
            ctx.fillStyle = options.labelColor || '#94A3B8';
            ctx.font = '11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, height - padding.bottom + 20);
        });

        // Lines
        datasets.forEach(ds => {
            ctx.beginPath();
            ctx.strokeStyle = ds.color;
            ctx.lineWidth = 2.5;
            ctx.lineJoin = 'round';

            ds.data.forEach((val, i) => {
                const x = padding.left + (chartW / (labels.length - 1)) * i;
                const y = padding.top + chartH - (val / maxVal) * chartH;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Area fill
            if (ds.fill) {
                const lastX = padding.left + chartW;
                ctx.lineTo(lastX, padding.top + chartH);
                ctx.lineTo(padding.left, padding.top + chartH);
                ctx.closePath();
                ctx.fillStyle = ds.fillColor || 'rgba(59, 130, 246, 0.1)';
                ctx.fill();
            }

            // Dots
            ds.data.forEach((val, i) => {
                const x = padding.left + (chartW / (labels.length - 1)) * i;
                const y = padding.top + chartH - (val / maxVal) * chartH;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = ds.color;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            });
        });
    },

    /**
     * Draw a donut chart on a canvas element
     */
    drawDonutChart: function(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) / 2 - 30;
        const innerRadius = radius * 0.6;
        const total = data.reduce((sum, d) => sum + d.value, 0);

        let startAngle = -Math.PI / 2;

        data.forEach(d => {
            const sliceAngle = (d.value / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = d.color;
            ctx.fill();

            // Label
            const midAngle = startAngle + sliceAngle / 2;
            const labelR = radius + 18;
            const lx = cx + Math.cos(midAngle) * labelR;
            const ly = cy + Math.sin(midAngle) * labelR;
            ctx.fillStyle = options.labelColor || '#94A3B8';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(d.label + ' (' + d.value + ')', lx, ly);

            startAngle += sliceAngle;
        });

        // Center text
        ctx.fillStyle = options.centerColor || '#E2E8F0';
        ctx.font = 'bold 24px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText(total, cx, cy + 4);
        ctx.font = '12px Inter';
        ctx.fillStyle = options.labelColor || '#94A3B8';
        ctx.fillText('Total Leaks', cx, cy + 22);
    },

    /**
     * Draw frequency spectrum animation
     */
    drawSpectrum: function(canvas, isActive) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const bars = 64;
        const barW = width / bars - 1;

        function draw() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < bars; i++) {
                const h = isActive.value ? (Math.random() * height * 0.8 + height * 0.05) : (Math.sin(Date.now() / 500 + i * 0.3) * 10 + 15);
                const x = i * (barW + 1);
                const y = height - h;

                const grad = ctx.createLinearGradient(x, y, x, height);
                grad.addColorStop(0, '#3B82F6');
                grad.addColorStop(1, '#10B981');
                ctx.fillStyle = grad;
                ctx.fillRect(x, y, barW, h);
            }

            if (isActive.animating) {
                requestAnimationFrame(draw);
            }
        }
        draw();
    },

    /**
     * Draw waveform animation
     */
    drawWaveform: function(canvas, isActive) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth = 2;

            const mid = height / 2;
            const amplitude = isActive.value ? height * 0.35 : height * 0.08;

            for (let x = 0; x < width; x++) {
                const t = Date.now() / 300;
                const y = mid +
                    Math.sin(x * 0.02 + t) * amplitude * 0.5 +
                    Math.sin(x * 0.05 + t * 1.3) * amplitude * 0.3 +
                    (isActive.value ? Math.sin(x * 0.1 + t * 2) * amplitude * 0.2 : 0) +
                    (isActive.value ? (Math.random() - 0.5) * amplitude * 0.15 : 0);

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Second wave (lighter)
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 1;
            for (let x = 0; x < width; x++) {
                const t = Date.now() / 400;
                const y = mid +
                    Math.sin(x * 0.03 + t + 1) * amplitude * 0.4 +
                    Math.sin(x * 0.07 + t * 0.8) * amplitude * 0.2;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            if (isActive.animating) {
                requestAnimationFrame(draw);
            }
        }
        draw();
    },

    /**
     * Draw a gauge/meter
     */
    drawGauge: function(canvas, value, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const cx = width / 2;
        const cy = height * 0.65;
        const radius = Math.min(width, height) * 0.4;

        const startAngle = Math.PI * 0.8;
        const endAngle = Math.PI * 2.2;
        const valueAngle = startAngle + (value / 100) * (endAngle - startAngle);

        // Background arc
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.strokeStyle = options.trackColor || 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Value arc
        const grad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
        if (value > 70) {
            grad.addColorStop(0, '#10B981');
            grad.addColorStop(1, '#34D399');
        } else if (value > 40) {
            grad.addColorStop(0, '#F59E0B');
            grad.addColorStop(1, '#FBBF24');
        } else {
            grad.addColorStop(0, '#EF4444');
            grad.addColorStop(1, '#F87171');
        }

        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, valueAngle);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Center text
        ctx.fillStyle = options.textColor || '#E2E8F0';
        ctx.font = 'bold 28px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText(value + '%', cx, cy + 5);
        ctx.font = '12px Inter';
        ctx.fillStyle = options.labelColor || '#94A3B8';
        ctx.fillText(options.label || 'Health', cx, cy + 25);
    }
};
