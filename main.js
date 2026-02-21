/* ========================================
   STUDIO ONE — Main JavaScript
   ======================================== */

import './style.css';
import emailjs from '@emailjs/browser';

// ==========================================
// PROJECT DATA
// ==========================================
const projectData = {
    'oasis-lite': {
        title: 'OASIS LITE',
        image: '/images/project-1.webp',
        github: 'https://github.com/studio-one/oasis-lite',
        tags: [
            { label: 'FLUTTER', class: 'tag--flutter' },
            { label: 'SUPABASE', class: 'tag--supabase' }
        ],
        description: `
      <p>Oasis Lite is a full-scale project and operations management system developed for an organization to streamline project execution and financial workflows. The platform integrates project tracking, task and epic management, team role administration, and invoice/request approvals into a unified system.</p>
      <p>It features structured work hierarchies (Projects → Epics → Jobs → Tasks), real-time status tracking (TODO, In Progress, Done), role-based access control, and an approval pipeline for financial requests with partial and full settlement handling. A visual workflow canvas enables node-based project mapping, improving operational visibility across teams.</p>
      <p>The system was designed to centralize execution, accountability, and finance tracking within a single scalable interface.</p>
    `
    },
    'glitch': {
        title: 'GLITCH',
        image: '/images/project-2.webp',
        github: 'https://github.com/anima-regem/glitch',
        tags: [
            { label: 'FLUTTER', class: 'tag--flutter' },
            { label: 'RIVERPOD', class: 'tag--riverpod' },
            { label: 'HIVE', class: 'tag--hive' }
        ],
        description: `
      <p>Glitch is a personal productivity and project tracking application designed to manage milestones, habits, and daily execution in a structured way. The system supports hierarchical project organization with milestones, recurring habits, and one-off chores, along with time estimation and completion tracking.</p>
      <p>It includes persistent local data storage, a day-completion heatmap for visual progress analytics, streak tracking for habits, and customizable interface options (AMOLED dark mode, high contrast, adjustable text scaling). The application was built to prioritize focused execution and long-term consistency through measurable daily progress.</p>
    `
    },
    'volt': {
        title: 'VOLT',
        image: '/images/project-3.webp',
        github: 'https://github.com/ashiqrahman10/volt-code',
        tags: [
            { label: 'KUBERNETES', class: 'tag--kubernetes' },
            { label: 'PYTHON', class: 'tag--python' },
            { label: 'REACT', class: 'tag--react' },
            { label: 'PROMETHEUS', class: 'tag--prometheus' }
        ],
        description: `
      <p>Volt is an AI-powered incident response system for Kubernetes designed to bridge the gap between observability and automated remediation. The system continuously ingests cluster metrics (Prometheus) and logs (Loki) into an external analysis engine, where anomaly detection models (Isolation Forest, keyword-based analysis) identify issues such as memory leaks, latency spikes, or abnormal pod behavior.</p>
      <p>An LLM-driven Root Cause Analysis (RCA) orchestrator evaluates contextual telemetry and proposes actionable remediation steps. These actions are executed through a controlled in-cluster executor with optional human approval for high-risk operations, ensuring safe automation within production environments.</p>
      <p>The project demonstrates applied AI agents, production-grade observability integration, anomaly detection, and safe autonomous remediation workflows.</p>
    `
    },
    'echolink': {
        title: 'ECHOLINK',
        image: '/images/project-4.webp',
        github: 'https://github.com/anima-regem/EchoLinkDispatcherAI',
        tags: [
            { label: 'PYTHON', class: 'tag--python' },
            { label: 'FASTAPI', class: 'tag--fastapi' },
            { label: 'NEXT.JS', class: 'tag--next' },
            { label: 'WEBSOCKETS', class: 'tag--websocket' }
        ],
        description: `
      <p>EchoLink is an AI-augmented emergency dispatch and voice processing system implemented in Python with a desktop UI and backend service. The project combines real-time audio capture, voice analysis, and AI-driven conversational processing to monitor and classify incoming voice calls, record interactions, and support dispatch workflows through a web dashboard.</p>
      <p>It includes modules for audio input handling, AI agent orchestration, database management (SQLite), and a FastAPI backend that supports conversation storage and analytics. A React/Next.js dashboard provides visual insights and interaction history, making it easier to inspect call analytics and emotion detection.</p>
      <p>The system was built as a proof-of-concept for intelligent voice dispatching with extensible components for AI analysis, real-time processing, and multi-interface integration.</p>
    `
    },
    'vyajan': {
        title: 'VYAJAN',
        image: '/images/project-5.webp',
        github: 'https://github.com/anima-regem/Vyajan',
        tags: [
            { label: 'FLUTTER', class: 'tag--flutter' },
            { label: 'FIREBASE', class: 'tag--firebase' }
        ],
        description: `
      <p>Vyajan is a cross-platform mobile application built with Flutter, using Firebase as the backend for authentication and real-time data storage. The application is designed to manage and categorize user-saved URLs into structured sections such as Inbox, Important, Archive, and All Links.</p>
      <p>It integrates metadata extraction and automatic thumbnail rendering (including YouTube previews) to enhance link visualization. The project demonstrates structured state management, cloud database integration, and scalable mobile app architecture, with a focus on clean UI and responsive design.</p>
    `
    },
    'helixapi': {
        title: 'HELIXAPI',
        image: '/images/project-6.webp',
        github: 'https://github.com/anima-regem/HelixAPI',
        tags: [
            { label: 'PYTHON', class: 'tag--python' },
            { label: 'FASTAPI', class: 'tag--fastapi' },
            { label: 'POSTGRESQL', class: 'tag--postgres' }
        ],
        description: `
      <p>HelixAPI is the backend service of a comprehensive hospital management platform designed to handle core clinical and administrative operations. Built with a RESTful architecture, the API provides endpoints for managing patients, appointments, medical records, billing, staff, inventory, and other critical healthcare workflows.</p>
      <p>It implements structured routing, authentication/authorization, validation, and relational data modeling to support scalable and consistent interactions between clients and the database. The API serves as a robust foundation for future web or mobile applications, encapsulating business logic and domain models required for a full hospital management solution.</p>
    `
    },
    'rune': {
        title: 'RUNE',
        image: '/images/project-7.webp',
        github: 'https://github.com/anima-regem/rune',
        tags: [
            { label: 'PYTHON', class: 'tag--python' },
            { label: 'IBM WATSONX', class: 'tag--watsonx' }
        ],
        description: `
      <p>Rune is an AI-driven educational platform powered by IBM watsonx, designed to generate personalized quizzes, smart notes, flashcards, summaries, and academic project support tools. It transforms syllabus inputs and reference materials into structured, adaptive study resources tailored to a student's learning pace.</p>
    `
    }
};

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

    function getActivityLevel(weekIndex) {
        const recency = weekIndex / weeks;
        const random = Math.random();
        const baseProbability = 0.3 + recency * 0.3;

        if (random > baseProbability + 0.3) return 0;
        if (random > baseProbability) return 1;
        if (random > baseProbability - 0.15) return 2;
        if (random > baseProbability - 0.25) return 3;
        return 4;
    }

    const monthsHtml = `
    <div class="activity-graph__months" style="padding-left: 0;">
      ${months.map(m => `<span class="activity-graph__month" style="width: ${(weeks / 12) * 15}px;">${m}</span>`).join('')}
    </div>
  `;

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
// 5. PROJECT MODAL
// ==========================================
function initProjectModal() {
    const overlay = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalTags = document.getElementById('modalTags');
    const modalDesc = document.getElementById('modalDesc');
    const modalGithub = document.getElementById('modalGithub');

    if (!overlay) return;

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Populate modal
        modalTitle.textContent = project.title;

        // Image
        if (project.image) {
            modalImage.innerHTML = `<img src="${project.image}" alt="${project.title} screenshot" />`;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }

        // Tags
        modalTags.innerHTML = project.tags
            .map(t => `<span class="tag ${t.class}">${t.label}</span>`)
            .join('');

        // Description
        modalDesc.innerHTML = project.description;

        // GitHub link
        modalGithub.href = project.github;

        // Show modal
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Click handlers on all project elements
    document.querySelectorAll('[data-project]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(el.dataset.project);
        });
    });

    // Close handlers
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ==========================================
// 6. CONTACT FORM — EmailJS
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmit');
    const status = document.getElementById('contactStatus');
    const submitText = form?.querySelector('.contact-form__submit-text');
    const submitLoading = form?.querySelector('.contact-form__submit-loading');

    if (!form) return;

    // ⚠️ Replace these with your EmailJS credentials
    const EMAILJS_PUBLIC_KEY = 'Ze3-Yvj7W9rC29_jZ';
    const EMAILJS_SERVICE_ID = 'service_v7qssfa';
    const EMAILJS_TEMPLATE_ID = 'template_d1vo6ci';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        status.textContent = '';
        status.className = 'contact-form__status';

        try {
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

            status.textContent = '✓ MESSAGE SENT SUCCESSFULLY';
            status.classList.add('contact-form__status--success');
            form.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            status.textContent = '✗ FAILED TO SEND. PLEASE TRY AGAIN.';
            status.classList.add('contact-form__status--error');
        } finally {
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    });
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initScrollAnimations();
    initActivityGraph();
    initParallax();
    initProjectModal();
    initContactForm();
});
