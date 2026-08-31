// ============================================
// AirGuard AI - Benefits Page Module
// ============================================
// Renders the Benefits section highlighting
// tangible advantages of AirGuard AI for businesses.
// Depends on: MOCK_DATA, Utils, Components (globals)
// ============================================

function renderBenefits() {
    const section = document.getElementById('benefits');
    if (!section) return;

    // Build section content
    section.innerHTML = `
        ${Components.sectionHeader('🌟 Benefits', 'Why AirGuard AI?', 'Tangible benefits that impact your bottom line')}
        <div class="container">
            <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
                ${MOCK_DATA.benefits.map((b, i) => `
                    <div class="gradient-card reveal delay-${(i % 4) + 1}">
                        ${Components.iconBox(b.icon, b.color, 'lg')}
                        <h4 style="margin-bottom: var(--space-3)">${b.title}</h4>
                        <p class="text-sm text-muted">${b.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize scroll reveal animations
    Utils.initScrollReveal();
}
