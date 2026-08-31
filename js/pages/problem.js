/* ============================================================
   PROBLEM PAGE — renderProblem()
   Populates the #problem section with problem cards and a
   callout highlighting the annual cost of compressed air leaks.
   ============================================================ */

function renderProblem() {
  const section = document.getElementById('problem');
  if (!section) return;

  // Add alternate background class
  section.classList.add('section-alt');

  /* ---------- Problem Cards ---------- */
  const problems = MOCK_DATA.problems || [];
  const cardsHTML = problems
    .map(
      (p, i) => `
      <div class="gradient-card problem-card reveal delay-${i + 1}">
        <div class="problem-icon">${p.icon}</div>
        <div class="problem-stat">${p.stat}</div>
        <h4 class="problem-title">${p.title}</h4>
        <p class="problem-desc">${p.desc}</p>
      </div>`
    )
    .join('');

  /* ---------- Assemble Full HTML ---------- */
  section.innerHTML = `
    <div class="container">
      ${Components.sectionHeader(
        '⚠️ The Problem',
        'The Hidden Cost of Compressed Air Leaks',
        'Industrial facilities lose billions annually due to undetected air leaks'
      )}

      <div class="grid-3">
        ${cardsHTML}
      </div>

      <!-- Callout CTA -->
      <div style="background: linear-gradient(135deg, var(--blue-800), var(--blue-900)); border-radius: var(--radius-xl); padding: var(--space-10); text-align: center; margin-top: var(--space-10);">
        <h3 style="color: white; margin-bottom: var(--space-4)">The total cost of compressed air leaks in Indian industries exceeds ₹10,000 Crore annually</h3>
        <a href="#solution" class="btn btn-success btn-lg">See Our Solution →</a>
      </div>
    </div>
  `;

  /* ---------- Post-render: Scroll Reveal ---------- */
  Utils.initScrollReveal();
}
