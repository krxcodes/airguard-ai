/* ============================================================
   HOME PAGE — renderHome()
   Populates the #home section with hero, features preview,
   and testimonials carousel.
   ============================================================ */

function renderHome() {
  const section = document.getElementById('home');
  if (!section) return;

  /* ---------- Hero Stats ---------- */
  const statsHTML = MOCK_DATA.heroStats
    .map(
      (s, i) => `
      <div class="hero-stat-card">
        <div class="hero-stat-value">
          <span class="count-up" id="hero-stat-${i}" data-target="${s.value}" data-suffix="${s.suffix || ''}">0</span>
        </div>
        <div class="hero-stat-label">${s.label}</div>
      </div>`
    )
    .join('');

  /* ---------- Features Preview ---------- */
  const features = [
    {
      icon: '📱',
      title: 'Phone-Based Detection',
      desc: 'No expensive equipment needed. Use your existing smartphone to detect leaks anywhere in your facility.'
    },
    {
      icon: '🧠',
      title: 'AI-Powered Analysis',
      desc: 'Machine learning models trained on thousands of leak audio samples deliver 95%+ detection accuracy.'
    },
    {
      icon: '📊',
      title: 'Instant Analytics',
      desc: 'Real-time dashboards showing cost savings, energy analytics, and maintenance recommendations.'
    }
  ];

  const featuresHTML = features
    .map((f, i) => Components.featureCard(f.icon, f.title, f.desc, i))
    .join('');

  /* ---------- Testimonials ---------- */
  const testimonials = MOCK_DATA.testimonials || [];
  const slidesHTML = testimonials
    .map((t) => Components.testimonialSlide(t))
    .join('');

  const dotsHTML = testimonials
    .map(
      (_, i) =>
        `<button class="testimonial-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
    )
    .join('');

  /* ---------- Inline SVG ---------- */
  const heroSVG = `
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
      <defs>
        <linearGradient id="compGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1E3A8A"/>
          <stop offset="100%" stop-color="#3B82F6"/>
        </linearGradient>
        <style>
          @keyframes leakPulse1 { 0%{r:8;opacity:1} 100%{r:28;opacity:0} }
          @keyframes leakPulse2 { 0%{r:12;opacity:.8} 100%{r:36;opacity:0} }
          @keyframes leakPulse3 { 0%{r:6;opacity:.9} 100%{r:24;opacity:0} }
          @keyframes floatParticle { 0%{transform:translateY(0);opacity:.7} 50%{opacity:1} 100%{transform:translateY(-18px);opacity:0} }
        </style>
      </defs>

      <!-- Compressor Body -->
      <rect x="40" y="120" width="160" height="140" rx="18" fill="url(#compGrad)" opacity=".92"/>
      <text x="120" y="200" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="sans-serif">Compressor</text>

      <!-- Pipes -->
      <line x1="200" y1="190" x2="340" y2="190" stroke="#64748B" stroke-width="8" stroke-linecap="round"/>
      <line x1="340" y1="190" x2="340" y2="310" stroke="#64748B" stroke-width="8" stroke-linecap="round"/>
      <line x1="340" y1="310" x2="460" y2="310" stroke="#64748B" stroke-width="8" stroke-linecap="round"/>

      <!-- Leak Point -->
      <circle cx="340" cy="190" r="6" fill="#10B981"/>
      <circle cx="340" cy="190" r="8" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="4 3" style="animation:leakPulse1 1.6s ease-out infinite"/>
      <circle cx="340" cy="190" r="12" fill="none" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" style="animation:leakPulse2 2s ease-out infinite .3s"/>
      <circle cx="340" cy="190" r="6" fill="none" stroke="#10B981" stroke-width="1" stroke-dasharray="3 3" style="animation:leakPulse3 2.4s ease-out infinite .6s"/>

      <!-- Floating Particles -->
      <circle cx="350" cy="175" r="2.5" fill="#10B981" style="animation:floatParticle 2s ease-in-out infinite"/>
      <circle cx="330" cy="170" r="2" fill="#3B82F6" style="animation:floatParticle 2.4s ease-in-out infinite .5s"/>
      <circle cx="355" cy="182" r="1.8" fill="#10B981" style="animation:floatParticle 1.8s ease-in-out infinite .8s"/>
      <circle cx="325" cy="178" r="2.2" fill="#3B82F6" style="animation:floatParticle 2.2s ease-in-out infinite 1.1s"/>
      <circle cx="345" cy="168" r="1.5" fill="#10B981" style="animation:floatParticle 2.6s ease-in-out infinite 1.4s"/>

      <!-- Label -->
      <text x="340" y="155" text-anchor="middle" fill="#10B981" font-size="12" font-weight="700" font-family="sans-serif">⚠ Leak Detected</text>
    </svg>`;

  /* ---------- Assemble Full HTML ---------- */
  section.innerHTML = `
    <!-- ===== HERO ===== -->
    <div class="hero" style="min-height:100vh;background:var(--bg-hero);">
      <div class="hero-bg"><div class="hero-bg-pattern"></div></div>
      <div class="container">
        <div class="hero-grid">

          <!-- Left Column -->
          <div class="hero-content">
            <span class="hero-badge">🛡️ AI-Powered Leak Detection</span>
            <h1 class="hero-title">Detect Compressed Air Leaks Using Just Your <span class="highlight">Smartphone</span></h1>
            <p class="hero-description">Reduce energy costs, improve compressor efficiency, and minimize air leakage using AI-powered ultrasonic leak detection.</p>
            <div class="hero-actions">
              <a href="#demo" class="btn btn-success btn-lg">🎯 Start Detection</a>
              <button class="btn btn-ghost btn-lg" onclick="document.getElementById('demo-modal').classList.add('open')">▶ Watch Demo</button>
            </div>
          </div>

          <!-- Right Column -->
          <div class="hero-visual">
            <div class="hero-visual-inner">
              ${heroSVG}
            </div>
          </div>

        </div>

        <!-- Stats Bar -->
        <div class="hero-stats">
          ${statsHTML}
        </div>
      </div>
    </div>

    <!-- ===== FEATURES PREVIEW ===== -->
    <div class="features-preview">
      <div class="container">
        ${Components.sectionHeader('✨ Core Features', 'Why Choose AirGuard AI?', 'Enterprise-grade leak detection technology, accessible to everyone')}
        <div class="features-preview-grid">
          ${featuresHTML}
        </div>
      </div>
    </div>

    <!-- ===== TESTIMONIALS ===== -->
    <div class="section-alt">
      <div class="container">
        ${Components.sectionHeader('💬 Testimonials', 'Trusted by Industry Leaders', 'See what our clients say about AirGuard AI')}
        <div class="testimonials-container">
          <div class="testimonials-track">
            ${slidesHTML}
          </div>
        </div>
        <div class="testimonial-dots">
          ${dotsHTML}
        </div>
      </div>
    </div>
  `;

  /* ---------- Post-render: Animated Counters ---------- */
  document.querySelectorAll('.count-up').forEach((el) => {
    Utils.animateCounter(
      el,
      parseFloat(el.dataset.target),
      el.dataset.suffix || ''
    );
  });

  /* ---------- Post-render: Testimonial Carousel ---------- */
  if (testimonials.length > 1) {
    let currentSlide = 0;
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dot');

    const goToSlide = (index) => {
      currentSlide = index;
      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    };

    // Dot click handlers
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index, 10));
      });
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
      goToSlide((currentSlide + 1) % testimonials.length);
    }, 5000);
  }

  /* ---------- Post-render: Scroll Reveal ---------- */
  Utils.initScrollReveal();
}
