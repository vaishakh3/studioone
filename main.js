/* ========================================
   STUDIO ONE — Main JavaScript
   ======================================== */

import './style.css';

// ==========================================
// 1. SCROLL SPY — Sticky Side Nav
// ==========================================
function initScrollSpy() {
    const links = document.querySelectorAll('.side-nav__link');
    const sections = [];

    links.forEach(link => {
        const id = link.getAttribute('data-section');
        const section = document.getElementById(id);
        if (section) sections.push({ id, el: section, link });
    });

    function updateActive() {
        const scrollY = window.scrollY + window.innerHeight / 3;

        let current = sections[0];
        for (const s of sections) {
            if (scrollY >= s.el.offsetTop) {
                current = s;
            }
        }

        links.forEach(l => l.classList.remove('side-nav__link--active'));
        if (current) current.link.classList.add('side-nav__link--active');
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // Smooth scroll on click
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute('data-section'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==========================================
// 2. INTERSECTION OBSERVER — Fade-in
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

// ==========================================
// 3. CONTRIBUTION GRAPH — GitHub-style
// ==========================================
function initActivityGraph() {
    const container = document.getElementById('activityGraph');
    if (!container) return;

    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const weeks = 52;
    const daysPerWeek = 7;
    let totalContributions = 0;

    // Generate random activity data with realistic patterns
    // More activity in recent months
    function getActivityLevel(weekIndex) {
        const recency = weekIndex / weeks; // 0 to 1 (earlier to later)
        const random = Math.random();

        // Base probability increases towards recent weeks
        const baseProbability = 0.3 + recency * 0.3;

        if (random > baseProbability + 0.3) return 0;
        if (random > baseProbability) return 1;
        if (random > baseProbability - 0.15) return 2;
        if (random > baseProbability - 0.25) return 3;
        return 4;
    }

    // Months row
    const monthsHtml = `
    <div class="activity-graph__months" style="padding-left: 0;">
      ${months.map(m => `<span class="activity-graph__month" style="width: ${(weeks / 12) * 15}px;">${m}</span>`).join('')}
    </div>
  `;

    // Grid
    let gridHtml = '<div class="activity-graph__grid">';
    for (let w = 0; w < weeks; w++) {
        gridHtml += '<div class="activity-graph__week">';
        for (let d = 0; d < daysPerWeek; d++) {
            const level = getActivityLevel(w);
            if (level > 0) totalContributions++;
            gridHtml += `<div class="activity-graph__cell" data-level="${level}" title="${level} contributions"></div>`;
        }
        gridHtml += '</div>';
    }
    gridHtml += '</div>';

    // Footer
    const footerHtml = `
    <div class="activity-graph__footer">
      <span>${totalContributions} contributions in the last year</span>
      <div class="activity-graph__legend">
        <span>Less</span>
        <div class="activity-graph__legend-cell" style="background: var(--bg-secondary);"></div>
        <div class="activity-graph__legend-cell" style="background: #1a0f00;"></div>
        <div class="activity-graph__legend-cell" style="background: #4d2600;"></div>
        <div class="activity-graph__legend-cell" style="background: #993d00;"></div>
        <div class="activity-graph__legend-cell" style="background: var(--accent);"></div>
        <span>More</span>
      </div>
    </div>
  `;

    container.innerHTML = monthsHtml + gridHtml + footerHtml;
}

// ==========================================
// 4. HERO BANNER PARALLAX
// ==========================================
function initParallax() {
    const banner = document.querySelector('.hero-banner');
    if (!banner) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < 400) {
            banner.style.transform = `translateY(${scrollY * 0.4}px)`;
            banner.style.opacity = 1 - (scrollY / 400);
        }
    }, { passive: true });
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initScrollAnimations();
    initActivityGraph();
    initParallax();
});
