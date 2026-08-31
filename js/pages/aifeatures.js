// ============================================
// AirGuard AI - AI Features Page Module
// ============================================
// Renders the AI Features section showcasing
// machine learning capabilities for leak detection.
// Depends on: MOCK_DATA, Utils, Components (globals)
// ============================================

function renderAIFeatures() {
    const section = document.getElementById('ai-features');
    if (!section) return;

    // Add alternate section styling
    section.classList.add('section-alt');

    // Build section content
    section.innerHTML = `
        ${Components.sectionHeader('🤖 AI Features', 'Powered by Advanced AI', 'Cutting-edge machine learning technology for precise leak detection')}
        <div class="container">
            <div class="grid-3">
                ${MOCK_DATA.aiFeatures.map((f, i) => `
                    <div class="gradient-card ai-feature-card reveal delay-${(i % 3) + 1}">
                        ${Components.iconBox(f.icon, i % 2 === 0 ? 'blue' : 'green', 'lg')}
                        <h4 class="feature-title">${f.title}</h4>
                        <p class="feature-desc">${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize scroll reveal animations
    Utils.initScrollReveal();
}
