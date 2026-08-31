/* ========================================
   AirGuard AI — Shared Components
   Reusable rendering helpers
   ======================================== */

const Components = {
    /**
     * Section header with badge, title, and subtitle
     */
    sectionHeader: function(badge, title, subtitle) {
        return `
        <div class="section-header reveal">
            <span class="section-badge">${badge}</span>
            <h2 class="section-title">${title}</h2>
            <p class="section-subtitle">${subtitle}</p>
        </div>`;
    },

    /**
     * Icon box
     */
    iconBox: function(icon, variant = 'blue', size = '') {
        const sizeClass = size === 'lg' ? ' icon-box-lg' : '';
        return `<div class="icon-box icon-box-${variant}${sizeClass}">${icon}</div>`;
    },

    /**
     * Feature card
     */
    featureCard: function(icon, title, desc, delay = 0) {
        return `
        <div class="gradient-card reveal delay-${delay}">
            ${Components.iconBox(icon, 'blue', 'lg')}
            <h4 style="margin-bottom: var(--space-3)">${title}</h4>
            <p class="text-sm text-muted">${desc}</p>
        </div>`;
    },

    /**
     * Stat card with animated counter
     */
    statCard: function(value, suffix, label, id) {
        return `
        <div class="hero-stat-card reveal">
            <div class="hero-stat-value">
                <span class="count-up" id="${id}" data-target="${value}" data-suffix="${suffix}">0${suffix}</span>
            </div>
            <div class="hero-stat-label">${label}</div>
        </div>`;
    },

    /**
     * KPI card for dashboard
     */
    kpiCard: function(kpi, index) {
        return `
        <div class="card dashboard-kpi reveal delay-${index + 1}">
            <div class="kpi-icon" style="background: ${kpi.bg}; color: ${kpi.color}">${kpi.icon}</div>
            <div class="kpi-value count-up" data-target="${kpi.value}" data-suffix="">${kpi.value.toLocaleString('en-IN')}</div>
            <div class="kpi-label">${kpi.label}</div>
            <span class="kpi-change ${kpi.positive ? 'positive' : 'negative'}">${kpi.positive ? '↑' : '↓'} ${kpi.change}</span>
        </div>`;
    },

    /**
     * Blog card
     */
    blogCard: function(post, delay) {
        return `
        <div class="blog-card reveal delay-${delay}">
            <div class="blog-card-image">${post.icon}</div>
            <div class="blog-card-body">
                <div class="blog-card-meta">
                    <span class="badge badge-blue">${post.category}</span>
                    <span>${post.date}</span>
                    <span>·</span>
                    <span>${post.readTime} read</span>
                </div>
                <h4 class="blog-card-title">${post.title}</h4>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="#" class="blog-read-more" onclick="event.preventDefault()">Read more →</a>
            </div>
        </div>`;
    },

    /**
     * Testimonial slide
     */
    testimonialSlide: function(t) {
        return `
        <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${t.avatar}</div>
                <div>
                    <div class="testimonial-author-name">${t.name}</div>
                    <div class="testimonial-author-role">${t.role}</div>
                </div>
            </div>
        </div>`;
    },

    /**
     * Accordion item
     */
    accordionItem: function(question, answer, index) {
        return `
        <div class="accordion-item" id="faq-${index}">
            <button class="accordion-header" onclick="Components.toggleAccordion('faq-${index}')">
                <span>${question}</span>
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-body">
                <div class="accordion-body-inner">${answer}</div>
            </div>
        </div>`;
    },

    /**
     * Toggle accordion
     */
    toggleAccordion: function(id) {
        const item = document.getElementById(id);
        const body = item.querySelector('.accordion-body');
        const inner = item.querySelector('.accordion-body-inner');
        const isOpen = item.classList.contains('open');

        // Close all first
        document.querySelectorAll('.accordion-item.open').forEach(openItem => {
            if (openItem.id !== id) {
                openItem.classList.remove('open');
                openItem.querySelector('.accordion-body').style.maxHeight = '0';
            }
        });

        if (isOpen) {
            item.classList.remove('open');
            body.style.maxHeight = '0';
        } else {
            item.classList.add('open');
            body.style.maxHeight = inner.scrollHeight + 20 + 'px';
        }
    },

    /**
     * Sound wave bars (decorative)
     */
    soundWaveBars: function(count = 5) {
        let bars = '';
        for (let i = 0; i < count; i++) {
            bars += `<div class="sound-wave-bar" style="animation-delay: ${i * 0.15}s"></div>`;
        }
        return `<div class="flex items-center gap-1" style="height: 40px; align-items: flex-end">${bars}</div>`;
    }
};
