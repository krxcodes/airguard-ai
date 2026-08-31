// ============================================
// AirGuard AI - About Page Module
// ============================================
// Renders the About section including mission,
// company stats, values, and team members.
// Depends on: MOCK_DATA, Utils, Components (globals)
// ============================================

function renderAbout() {
    const section = document.getElementById('about');
    if (!section) return;

    // Stat entries for the decorative card
    const stats = [
        { label: '95.6% Detection Accuracy', value: '95.6%' },
        { label: '500+ Leaks Found', value: '500+' },
        { label: '₹2.4M+ Saved for Clients', value: '₹2.4M+' },
        { label: '50+ Facilities Served', value: '50+' }
    ];

    // Build section content
    section.innerHTML = `
        ${Components.sectionHeader('🏢 About Us', 'Our Mission', 'Helping MSMEs reduce energy waste using AI')}

        <!-- Mission Split -->
        <div class="container">
            <div class="about-mission-split">
                <div class="about-mission-text">
                    <h3>Empowering Indian Industries with AI</h3>
                    <p>AirGuard AI was born from a simple observation: small and medium enterprises in India waste crores on compressed air leaks every year, yet lack access to affordable detection technology.</p>
                    <blockquote class="mission-quote">"Helping MSMEs reduce energy waste using AI-powered ultrasonic leak detection — no expensive equipment needed, just your smartphone."</blockquote>
                    <p>Our team of AI researchers and industrial engineers built a solution that puts enterprise-grade leak detection in the palm of your hand.</p>
                </div>
                <div>
                    <div class="glass-card-static" style="padding: var(--space-10)">
                        ${stats.map(s => `
                            <div style="display:flex;justify-content:space-between;padding:var(--space-3) 0;border-bottom:1px solid var(--border-color)">
                                <span class="text-muted">${s.label}</span>
                                <span class="font-bold text-accent">${s.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Values -->
        <div class="container">
            <div class="about-values">
                <h3 class="text-center" style="margin-bottom:var(--space-8)">Our Values</h3>
                <div class="grid-3">
                    ${MOCK_DATA.values.map((v, i) => `
                        <div class="gradient-card reveal delay-${(i % 3) + 1}">
                            ${Components.iconBox(v.icon, v.color || 'blue', 'lg')}
                            <h4 style="margin-bottom: var(--space-3)">${v.title}</h4>
                            <p class="text-sm text-muted">${v.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Team -->
        <div class="container">
            <h3 class="text-center" style="margin: var(--space-12) 0 var(--space-8)">Meet the Team</h3>
            <div class="about-team-grid">
                ${MOCK_DATA.team.map(m => `
                    <div class="card team-card reveal">
                        <div class="team-avatar">${m.avatar}</div>
                        <div class="team-name">${m.name}</div>
                        <div class="team-role">${m.role}</div>
                        <div class="team-bio">${m.bio}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize scroll reveal animations
    Utils.initScrollReveal();
}
