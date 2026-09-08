const EASYCHART_URL = 'https://easychart-omega.vercel.app/';
const modalOverlay = document.getElementById('easychartModal');
const modal = modalOverlay.querySelector('.modal');
const closeModalButton = modalOverlay.querySelector('[data-close-modal]');
let previousFocus = null;

function scaleIframePreviews() {
    document.querySelectorAll('.preview-wrap').forEach((wrap) => {
        const iframe = wrap.querySelector('iframe');
        const scale = wrap.clientWidth / 1280;
        iframe.style.transform = `scale(${scale})`;
        iframe.style.height = `${wrap.clientHeight / scale}px`;
    });
}

function openModal() {
    previousFocus = document.activeElement;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    closeModalButton.focus();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    previousFocus?.focus();
}

document.querySelectorAll('[data-open-modal]').forEach((element) => element.addEventListener('click', openModal));
closeModalButton.addEventListener('click', closeModal);
modalOverlay.querySelector('[data-proceed-easychart]').addEventListener('click', () => {
    window.open(EASYCHART_URL, '_blank', 'noopener,noreferrer');
    closeModal();
});
modalOverlay.addEventListener('click', (event) => { if (event.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (event) => {
    if (!modalOverlay.classList.contains('active')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

new ResizeObserver(scaleIframePreviews).observe(document.documentElement);
window.addEventListener('load', scaleIframePreviews);
