const links = { home: 'index.html', projects: 'projects.html', competitions: 'competitions.html', photography: 'photography.html', chess: 'chess.html', about: 'aboutMe.html' };
const page = location.pathname.split('/').pop() || 'index.html';
const active = (file) => page === file ? ' aria-current="page"' : '';

class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="navbar"><div class="name"><a class="hub-button" href="../index.html">Web Hub</a><h1><a href="${links.home}">Nick Ze Kun<br>Lei</a></h1></div><button class="nav-toggle" type="button" aria-expanded="false">Menu</button><nav class="menu" aria-label="Primary navigation"><a class="mobile-hub" href="../index.html">Web Hub</a><a href="${links.home}"${active(links.home)}>Home</a><div class="nav-group"><button class="nav-submenu-toggle" type="button" aria-expanded="false">Personal Activities</button><div class="nav-submenu"><a href="${links.projects}"${active(links.projects)}>Projects</a><a href="${links.competitions}"${active(links.competitions)}>Competitions</a></div></div><div class="nav-group"><button class="nav-submenu-toggle" type="button" aria-expanded="false">Interests</button><div class="nav-submenu"><a href="${links.photography}"${active(links.photography)}>Photography</a><a href="${links.chess}"${active(links.chess)}>Chess</a></div></div><a href="${links.about}"${active(links.about)}>More About Me</a></nav><div class="headerRight"><span class="location">Canada, BC</span><button class="theme-toggle" type="button" aria-label="Toggle color theme"><img class="iconTheme" src="images/icons/iconLightMode.png" alt=""></button></div></header>`;
        const menu = this.querySelector('.menu');
        const navToggle = this.querySelector('.nav-toggle');
        navToggle.addEventListener('click', () => navToggle.setAttribute('aria-expanded', String(menu.classList.toggle('is-open'))));
        this.querySelectorAll('.nav-submenu-toggle').forEach((toggle) => toggle.addEventListener('click', () => {
            const group = toggle.closest('.nav-group');
            const open = group.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        }));
        this.querySelector('.theme-toggle').addEventListener('click', () => transitionTheme(document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark'));
    }
}

class SiteFooter extends HTMLElement { connectedCallback() { this.textContent = '© 2026 All Rights Reserved'; } }

function setTheme(theme) { document.documentElement.classList.remove('dark-theme', 'light-theme'); document.body.classList.remove('dark-theme', 'light-theme'); document.documentElement.classList.add(`${theme}-theme`); document.body.classList.add(`${theme}-theme`); localStorage.setItem('theme', theme); }
function transitionTheme(theme) {
    const update = () => setTheme(theme);
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(update);
    } else {
        update();
    }
}
customElements.define('site-navbar', SiteNavbar);
customElements.define('site-footer', SiteFooter);
document.addEventListener('click', (event) => { if (event.target.closest('site-navbar .nav-group')) return; document.querySelectorAll('site-navbar .nav-group.is-open').forEach((group) => group.classList.remove('is-open')); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('site-navbar .nav-group.is-open').forEach((group) => group.classList.remove('is-open')); });
document.querySelectorAll('header.navbar').forEach((header) => header.replaceWith(document.createElement('site-navbar')));
document.querySelectorAll('footer.site-footer').forEach((footer) => {
    const component = document.createElement('site-footer');
    if (footer.classList.contains('home-copyright')) component.dataset.fixed = '';
    footer.replaceWith(component);
});
