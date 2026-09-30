// Shared header + footer so every page stays in sync.
const SITE = {
  name: "Aaron",
  email: "Aaron3vp@gmail.com",
  phone: "312-446-2510",
  linkedin: "https://www.linkedin.com/in/aaronvpa",
};

const icons = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.2L3.4 6H3v.6l9 6.5 9-6.5V6h-.4L12 12.2z"/></svg>',
};

const page = location.pathname.split("/").pop() || "index.html";
const link = (href, label) =>
  `<a href="${href}" class="${page === href ? "active" : ""}">${label}</a>`;

document.getElementById("header").outerHTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="logo"><img class="logo-avatar" src="avatar.jpg" alt="">${SITE.name}</a>
      <button class="menu-toggle" aria-expanded="false">Menu</button>
      <nav class="nav">
        ${link("index.html", "About")}
        ${link("projects.html", "My Work")}
        ${link("case-studies.html", "Case Studies")}
        ${link("my-projects.html", "Projects")}
        ${link("contact.html", "Contact")}
        <a href="${SITE.linkedin}" target="_blank" rel="noopener" class="icon-link" aria-label="LinkedIn">${icons.linkedin}</a>
        <a href="contact.html" class="btn btn-primary btn-sm">Let's talk</a>
      </nav>
    </div>
  </header>`;

document.getElementById("footer").outerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <span>© ${new Date().getFullYear()} ${SITE.name} · Lead Product Manager, AI</span>
      <div class="footer-links">
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:+1${SITE.phone.replace(/-/g, "")}">${SITE.phone}</a>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>`;

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "Close" : "Menu";
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) nav.classList.remove("open");
});

addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 8), { passive: true });

// Fade sections in as they scroll into view.
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Count stat numbers up from zero the first time they appear.
const counters = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counters.unobserve(e.target);
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const { prefix = "", suffix = "" } = el.dataset;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
document.querySelectorAll("[data-count]").forEach((el) => counters.observe(el));
