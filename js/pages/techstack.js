// ============================================
// AirGuard AI - Technology Stack Page Module
// ============================================
// Renders the Technology Stack section displaying
// the tools and frameworks powering AirGuard AI.
// Depends on: MOCK_DATA, Utils, Components (globals)
// ============================================

function renderTechStack() {
    const section = document.getElementById('tech');
    if (!section) return;

    // Add alternate section styling
    section.classList.add('section-alt');

    // Build section content
    section.innerHTML = `
        ${Components.sectionHeader('🛠️ Technology', 'Our Technology Stack', 'Built with industry-leading tools and frameworks')}
        <div class="container">
            <div class="tech-grid">
                ${MOCK_DATA.techStack.map((t, i) => `
                    <div class="tech-item reveal delay-${(i % 5) + 1}">
                        <div class="tech-item-icon">${t.icon}</div>
                        <div class="tech-item-name">${t.name}</div>
                        <div class="tech-item-desc">${t.desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize scroll reveal animations
    Utils.initScrollReveal();
}
