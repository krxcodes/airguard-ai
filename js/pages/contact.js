/* ========================================
   AirGuard AI — Contact Page
   ======================================== */

function renderContact() {
    const section = document.getElementById('contact');
    if (!section) return;

    section.classList.add('section-alt');

    section.innerHTML = `
        ${Components.sectionHeader('📬 Contact', 'Get in Touch', 'Ready to reduce your energy costs? Reach out to us.')}
        <div class="container">
            <div class="contact-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-10)">
                <!-- LEFT: Contact Form -->
                <div class="card" data-reveal>
                    <form id="contact-form">
                        <div class="form-group">
                            <label for="contact-name">Full Name</label>
                            <input type="text" id="contact-name" name="name" placeholder="Your full name" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Email</label>
                            <input type="email" id="contact-email" name="email" placeholder="you@example.com" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-phone">Phone</label>
                            <input type="tel" id="contact-phone" name="phone" placeholder="+91 98765 43210">
                        </div>
                        <div class="form-group">
                            <label for="contact-company">Company Name</label>
                            <input type="text" id="contact-company" name="company" placeholder="Your company">
                        </div>
                        <div class="form-group">
                            <label for="contact-message">Message</label>
                            <textarea id="contact-message" name="message" rows="4" placeholder="Tell us about your needs..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Send Message</button>
                    </form>
                    <p class="text-center text-sm text-muted mt-4">Or <a href="#" onclick="document.getElementById('demo-modal').classList.add('open');event.preventDefault()">request a demo</a></p>
                </div>

                <!-- RIGHT: Contact Info + Social + Map -->
                <div>
                    <div class="card" data-reveal style="margin-bottom:var(--space-6)">
                        <h4 style="margin-bottom: var(--space-6)">Contact Information</h4>
                        <div class="contact-info-item">
                            <span class="contact-info-icon">📧</span>
                            <div>
                                <strong>Email</strong>
                                <p>contact@airguard-ai.com</p>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <span class="contact-info-icon">📞</span>
                            <div>
                                <strong>Phone</strong>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <span class="contact-info-icon">🔗</span>
                            <div>
                                <strong>LinkedIn</strong>
                                <p>linkedin.com/company/airguard-ai</p>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <span class="contact-info-icon">📍</span>
                            <div>
                                <strong>Address</strong>
                                <p>Tech Hub, Hinjewadi, Pune 411057</p>
                            </div>
                        </div>

                        <div class="contact-social" style="display:flex;gap:var(--space-3);margin-top:var(--space-6)">
                            <a href="#" class="social-link" onclick="event.preventDefault()" title="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="#" class="social-link" onclick="event.preventDefault()" title="Twitter/X">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="#" class="social-link" onclick="event.preventDefault()" title="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                            </a>
                            <a href="#" class="social-link" onclick="event.preventDefault()" title="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Map Placeholder -->
                    <div class="card map-placeholder" data-reveal style="padding:0;overflow:hidden;border-radius:var(--radius-xl)">
                        <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
                            <!-- Background -->
                            <rect width="400" height="250" fill="#1a1f2e"/>
                            <!-- Grid lines -->
                            <line x1="0" y1="50" x2="400" y2="50" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="0" y1="100" x2="400" y2="100" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="0" y1="200" x2="400" y2="200" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="80" y1="0" x2="80" y2="250" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="160" y1="0" x2="160" y2="250" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="240" y1="0" x2="240" y2="250" stroke="#2a3040" stroke-width="0.5"/>
                            <line x1="320" y1="0" x2="320" y2="250" stroke="#2a3040" stroke-width="0.5"/>
                            <!-- Roads -->
                            <line x1="50" y1="125" x2="350" y2="125" stroke="#3a4560" stroke-width="3"/>
                            <line x1="200" y1="30" x2="200" y2="220" stroke="#3a4560" stroke-width="3"/>
                            <line x1="100" y1="80" x2="300" y2="180" stroke="#3a4560" stroke-width="2" stroke-dasharray="4,4"/>
                            <line x1="120" y1="200" x2="280" y2="60" stroke="#3a4560" stroke-width="2" stroke-dasharray="4,4"/>
                            <!-- Buildings -->
                            <rect x="140" y="85" width="30" height="25" rx="3" fill="#2d3a50" stroke="#4a5a7a" stroke-width="0.5"/>
                            <rect x="230" y="95" width="40" height="20" rx="3" fill="#2d3a50" stroke="#4a5a7a" stroke-width="0.5"/>
                            <rect x="110" y="140" width="25" height="30" rx="3" fill="#2d3a50" stroke="#4a5a7a" stroke-width="0.5"/>
                            <rect x="270" y="140" width="35" height="25" rx="3" fill="#2d3a50" stroke="#4a5a7a" stroke-width="0.5"/>
                            <!-- Pin marker -->
                            <g transform="translate(200, 100)">
                                <ellipse cx="0" cy="22" rx="8" ry="3" fill="rgba(16,185,129,0.3)"/>
                                <path d="M0-20 C-11-20-20-11-20 0 C-20 11 0 25 0 25 C0 25 20 11 20 0 C20-11 11-20 0-20Z" fill="#10b981"/>
                                <circle cx="0" cy="-2" r="6" fill="#ffffff"/>
                            </g>
                            <!-- Label -->
                            <text x="200" y="240" text-anchor="middle" fill="#6b7a94" font-size="11" font-family="sans-serif">📍 Hinjewadi, Pune</text>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <h3 class="text-center" style="margin: var(--space-16) 0 var(--space-8)">Frequently Asked Questions</h3>
            <div style="max-width:800px;margin:0 auto">
                ${MOCK_DATA.faq.map((f, i) => Components.accordionItem(f.q, f.a, i)).join('')}
            </div>
        </div>
    `;

    // Post-render: Contact form submit handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Init scroll reveal
    Utils.initScrollReveal();
}
