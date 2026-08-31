/* ========================================
   AirGuard AI — Blog Page
   Blog card grid with sample posts
   ======================================== */

function renderBlog() {
    const section = document.getElementById('blog');
    section.classList.add('section-alt');
    section.innerHTML = `
    <div class="container">
        ${Components.sectionHeader('📝 Blog', 'Latest Insights', 'Stay updated with the latest in compressed air technology and AI')}

        <div class="blog-grid">
            ${MOCK_DATA.blogPosts.map((post, i) => Components.blogCard(post, (i % 3) + 1)).join('')}
        </div>

        <div class="text-center" style="margin-top: var(--space-10)">
            <a href="#" class="btn btn-outline btn-lg" onclick="event.preventDefault()">View All Articles →</a>
        </div>
    </div>`;

    Utils.initScrollReveal();
}
