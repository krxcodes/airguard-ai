/* ============================================================
   SOLUTION PAGE — renderSolution()
   Populates the #solution section with a vertical timeline
   showing the AirGuard AI workflow steps and a closing CTA.
   ============================================================ */

function renderSolution() {
  const section = document.getElementById('solution');
  if (!section) return;

  /* ---------- Timeline Items ---------- */
  const steps = MOCK_DATA.solutionSteps || [];
  const timelineHTML = steps
    .map(
      (step) => `
      <div class="timeline-item reveal delay-${step.num}">
        <div class="timeline-number">${step.num}</div>
        <div class="timeline-content">
          <div style="font-size: 2rem; margin-bottom: var(--space-2)">${step.icon}</div>
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
        </div>
      </div>`
    )
    .join('');

  /* ---------- Assemble Full HTML ---------- */
  section.innerHTML = `
    <div class="container">
      ${Components.sectionHeader(
        '💡 Our Solution',
        'How AirGuard AI Works',
        'From scan to savings in minutes — no hardware required'
      )}

      <div class="solution-timeline">
        ${timelineHTML}
      </div>

      <!-- CTA -->
      <div class="text-center reveal" style="margin-top: var(--space-12)">
        <p style="font-size: var(--text-lg); color: var(--text-secondary); margin-bottom: var(--space-6)">Ready to start detecting leaks?</p>
        <a href="#demo" class="btn btn-primary btn-lg">Try Live Demo →</a>
      </div>
    </div>
  `;

  /* ---------- Post-render: Scroll Reveal ---------- */
  Utils.initScrollReveal();
}
