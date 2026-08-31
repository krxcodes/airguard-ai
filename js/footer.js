/* ========================================
   AirGuard AI — Footer
   Multi-column footer with links, newsletter
   ======================================== */

function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
    <div class="container">
        <div class="footer-grid" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:var(--space-10);margin-bottom:var(--space-12)">
            <!-- Brand -->
            <div>
                <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-4)">
                    <span style="font-size:1.8rem">🛡️</span>
                    <span style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:800;color:white">AirGuard<span style="color:var(--green-400)">AI</span></span>
                </div>
                <p style="color:var(--gray-400);font-size:var(--text-sm);margin-bottom:var(--space-6);max-width:300px">
                    AI-powered compressed air leak detection. Reduce energy costs and improve compressor efficiency using just your smartphone.
                </p>
                <a href="#" class="btn btn-outline" style="border-color:var(--gray-600);color:var(--gray-300)" onclick="event.preventDefault()">
                    📥 Download Brochure
                </a>
            </div>

            <!-- Quick Links -->
            <div>
                <h5 style="color:white;margin-bottom:var(--space-4)">Quick Links</h5>
                <ul style="display:flex;flex-direction:column;gap:var(--space-3)">
                    <li><a href="#home" style="color:var(--gray-400);font-size:var(--text-sm)">Home</a></li>
                    <li><a href="#problem" style="color:var(--gray-400);font-size:var(--text-sm)">Problem</a></li>
                    <li><a href="#solution" style="color:var(--gray-400);font-size:var(--text-sm)">Solution</a></li>
                    <li><a href="#demo" style="color:var(--gray-400);font-size:var(--text-sm)">Live Demo</a></li>
                    <li><a href="#dashboard" style="color:var(--gray-400);font-size:var(--text-sm)">Dashboard</a></li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h5 style="color:white;margin-bottom:var(--space-4)">Resources</h5>
                <ul style="display:flex;flex-direction:column;gap:var(--space-3)">
                    <li><a href="#ai-features" style="color:var(--gray-400);font-size:var(--text-sm)">AI Features</a></li>
                    <li><a href="#tech" style="color:var(--gray-400);font-size:var(--text-sm)">Tech Stack</a></li>
                    <li><a href="#benefits" style="color:var(--gray-400);font-size:var(--text-sm)">Benefits</a></li>
                    <li><a href="#about" style="color:var(--gray-400);font-size:var(--text-sm)">About</a></li>
                    <li><a href="#contact" style="color:var(--gray-400);font-size:var(--text-sm)">Contact</a></li>
                    <li><a href="#blog" style="color:var(--gray-400);font-size:var(--text-sm)">Blog</a></li>
                </ul>
            </div>

            <!-- Newsletter -->
            <div>
                <h5 style="color:white;margin-bottom:var(--space-4)">Stay Updated</h5>
                <p style="color:var(--gray-400);font-size:var(--text-sm);margin-bottom:var(--space-4)">
                    Get the latest updates on AI leak detection technology.
                </p>
                <form onsubmit="event.preventDefault();this.querySelector('input').value='';alert('Subscribed successfully!')" style="display:flex;gap:var(--space-2)">
                    <input type="email" placeholder="Your email" required style="flex:1;padding:var(--space-2) var(--space-3);background:var(--gray-800);border:1px solid var(--gray-700);border-radius:var(--radius-md);color:white;font-size:var(--text-sm);outline:none;font-family:var(--font-body)">
                    <button type="submit" class="btn btn-success btn-sm">→</button>
                </form>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom" style="display:flex;justify-content:space-between;align-items:center;padding-top:var(--space-6);border-top:1px solid var(--gray-800)">
            <p style="color:var(--gray-500);font-size:var(--text-sm)">© 2026 AirGuard AI. All rights reserved.</p>
            <div style="display:flex;gap:var(--space-4)">
                <a href="#" style="color:var(--gray-500);font-size:var(--text-sm)" onclick="event.preventDefault()">Privacy Policy</a>
                <a href="#" style="color:var(--gray-500);font-size:var(--text-sm)" onclick="event.preventDefault()">Terms of Service</a>
            </div>
        </div>
    </div>`;
}
