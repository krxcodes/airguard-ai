/* ========================================
   AirGuard AI — App Initializer
   Theme, navbar, routing, scroll, modals
   ======================================== */

(function() {
    'use strict';

    // ---- Theme Management ----
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('airguard-theme');

    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('airguard-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        // Re-draw dashboard charts on theme change (colors adapt)
        if (typeof renderDashboardCharts === 'function') {
            setTimeout(renderDashboardCharts, 100);
        }
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    });

    // ---- Active Nav Link (Intersection Observer) ----
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-page') === id);
                });
            }
        });
    }, { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ---- Mobile Menu ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- Demo Request Modal ----
    const modalOverlay = document.getElementById('demo-modal');
    const modalClose = document.getElementById('modal-close');
    const demoForm = document.getElementById('demo-form');

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.remove('open');
            mobileMenuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('🎉 Demo request submitted! We\'ll contact you within 24 hours.');
        demoForm.reset();
        modalOverlay.classList.remove('open');
    });

    // ---- Render All Pages ----
    renderHome();
    renderProblem();
    renderSolution();
    renderDemo();
    renderDashboard();
    renderAIFeatures();
    renderBenefits();
    renderTechStack();
    renderAbout();
    renderContact();
    renderBlog();
    renderFooter();

    // ---- Global Scroll Reveal ----
    Utils.initScrollReveal();

    // ---- Smooth Scroll for Anchor Links ----
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
                const y = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    });

    // ---- Hide Loading Screen ----
    function hideLoader() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => { loader.style.display = 'none'; }, 600);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(hideLoader, 600);
    });

    // Fallback: always hide after 3s
    setTimeout(hideLoader, 3000);

    // ---- Window Resize: Redraw Charts ----
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Redraw dashboard charts on resize
            const savingsCanvas = document.getElementById('savings-chart');
            if (savingsCanvas && savingsCanvas.offsetParent) {
                Utils.drawBarChart(savingsCanvas,
                    MOCK_DATA.monthlySavings.map(d => ({ label: d.month, value: d.savings })),
                    { prefix: '₹', barColor1: '#3B82F6', barColor2: '#1D4ED8' }
                );
            }
            const severityCanvas = document.getElementById('severity-chart');
            if (severityCanvas && severityCanvas.offsetParent) {
                Utils.drawDonutChart(severityCanvas, MOCK_DATA.leakSeverity);
            }
            const gaugeCanvas = document.getElementById('health-gauge');
            if (gaugeCanvas && gaugeCanvas.offsetParent) {
                Utils.drawGauge(gaugeCanvas, MOCK_DATA.compressorHealth, { label: 'Health Score' });
            }
            const energyCanvas = document.getElementById('energy-chart');
            if (energyCanvas && energyCanvas.offsetParent) {
                Utils.drawLineChart(energyCanvas,
                    [
                        { data: MOCK_DATA.energyTrend.map(d => d.consumed), color: '#3B82F6', fill: false },
                        { data: MOCK_DATA.energyTrend.map(d => d.saved), color: '#10B981', fill: true, fillColor: 'rgba(16,185,129,0.1)' }
                    ],
                    MOCK_DATA.energyTrend.map(d => d.month)
                );
            }
        }, 300);
    });

    console.log('🛡️ AirGuard AI initialized successfully!');
})();
