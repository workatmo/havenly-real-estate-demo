const grid=document.querySelector('#property-grid');
const cards=[...document.querySelectorAll('.property-card')];
const emptyState=document.querySelector('#empty-state');
const locationSelect=document.querySelector('#location');
const typeSelect=document.querySelector('#type');
const priceSelect=document.querySelector('#price');

function applyFilters(){
  const location=locationSelect.value;
  const type=typeSelect.value;
  const price=priceSelect.value;
  let visible=0;
  cards.forEach(card=>{
    const amount=Number(card.dataset.price);
    const matchesLocation=location==='all'||card.dataset.location===location;
    const matchesType=type==='all'||card.dataset.type===type;
    const matchesPrice=price==='all'||(price==='under-300'&&amount<300000)||(price==='300-500'&&amount>=300000&&amount<=500000)||(price==='over-500'&&amount>500000);
    card.hidden=!(matchesLocation&&matchesType&&matchesPrice);
    if(!card.hidden)visible++;
  });
  emptyState.hidden=visible!==0;
}
document.querySelector('#search-button').addEventListener('click',()=>{applyFilters();document.querySelector('#properties').scrollIntoView({behavior:'smooth'});});
[locationSelect,typeSelect,priceSelect].forEach(select=>select.addEventListener('change',applyFilters));

document.querySelectorAll('.save-button').forEach(button=>button.addEventListener('click',()=>{
  const saved=button.classList.toggle('saved');
  button.textContent=saved?'♥':'♡';
  button.setAttribute('aria-pressed',String(saved));
}));

document.querySelector('#prev-cards').addEventListener('click',()=>grid.scrollBy({left:-320,behavior:'smooth'}));
document.querySelector('#next-cards').addEventListener('click',()=>grid.scrollBy({left:320,behavior:'smooth'}));
const menuToggle=document.querySelector('.menu-toggle');
const mainNav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));

document.querySelector('#newsletter-form').addEventListener('submit',event=>{
  event.preventDefault();
  const email=document.querySelector('#email');
  document.querySelector('#newsletter-message').textContent=`Thanks — ${email.value} is on the list (demo).`;
  email.value='';
});
document.querySelector('#year').textContent=new Date().getFullYear();

(() => {
  const heart = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>';

  document.querySelectorAll('.save-button').forEach(button => {
    const label = () => {
      const text = button.dataset.homeLabel || button.getAttribute('aria-label').replace(/^(Save|Remove) /, '').replace(/ from saved homes$/, '');
      button.dataset.homeLabel = text;
      button.setAttribute('aria-label', `${button.classList.contains('saved') ? 'Remove' : 'Save'} ${text}${button.classList.contains('saved') ? ' from saved homes' : ''}`);
      button.setAttribute('aria-pressed', String(button.classList.contains('saved')));
      button.innerHTML = heart;
    };
    label();
    button.addEventListener('click', label);
  });

  const icons = {
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8.2V13H11v8h3.4Z"/></svg>',
    YouTube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/></svg>',
    LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7.2v.1M12 17v-7h3v1.2c.5-.9 1.2-1.3 2.2-1.3 1.6 0 2.8 1.1 2.8 3.3V17M12 13.2c0-1.8 1-3.3 3-3.3"/></svg>'
  };
  document.querySelectorAll('.social-links a[aria-label]').forEach(link => {
    const icon = icons[link.getAttribute('aria-label')];
    if (icon) link.innerHTML = icon;
  });

  const style = document.createElement('style');
  style.textContent = `
    .social-links{display:flex;align-items:center;gap:12px;margin-top:18px}
    .social-links a{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(255,255,255,.25);border-radius:50%;color:var(--cream,#f7f3ee);text-decoration:none;transition:background .2s,border-color .2s,transform .2s}
    .social-links a:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.55);transform:translateY(-1px)}
    .social-links svg{display:block;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
    .social-links a[aria-label="Facebook"] svg{fill:currentColor;stroke:none}
    .save-button .icon{display:block;width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .18s,fill .18s}
    .save-button.saved .icon{fill:currentColor;transform:scale(1.06)}
    @media(max-width:600px){.social-links{gap:10px}.social-links a{width:32px;height:32px}}
  `;
  document.head.appendChild(style);
})();
// Normalize the remaining site glyphs to the same crisp, lightweight inline-SVG icon set.
(() => {
  const paths = {
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/>',
    tag: '<path d="M20 13 11 22l-9-9V4h9l9 9Z"/><circle cx="7.5" cy="8" r="1"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.3 4.3"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    hands: '<path d="m8 12 2 2a2 2 0 0 0 3 0l4-4"/><path d="m3 11 4-4 4 2 2-1 4 1 4 4-6 6a2 2 0 0 1-3 0l-2-2"/><path d="m2 12 5 5M22 12l-4 5"/>',
    headset: '<path d="M3 13v-2a9 9 0 0 1 18 0v2"/><path d="M5 13h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Zm14 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2ZM17 20a5 5 0 0 1-5 2"/>',
    bed: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 14h18M5 9V6h5a3 3 0 0 1 3 3M3 18v2m18-2v2"/>',
    bath: '<path d="M4 12h16v3a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5v-3Z"/><path d="M6 12V6a3 3 0 0 1 5.8-1M8 20v2m8-2v2M3 12h18"/>',
    area: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 8h8v8H8zM8 4v2m4-2v2m4-2v2M8 18v2m4-2v2m4-2v2M4 8h2m-2 4h2m-2 4h2m12-8h2m-2 4h2m-2 4h2"/>',
    northeast: '<path d="M7 17 17 7M8 7h9v9"/>',
    right: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    left: '<path d="M19 12H5m6 6-6-6 6-6"/>',
    sparkle: '<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>'
  };
  const icon = (name) => `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

  document.querySelectorAll('.search-field').forEach((field) => {
    const slot = field.querySelector('.field-icon');
    if (!slot) return;
    const label = field.querySelector('small')?.textContent.toLowerCase() || '';
    slot.innerHTML = icon(label.includes('location') ? 'pin' : label.includes('type') ? 'home' : 'tag');
    slot.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.search-icon').forEach((slot) => { slot.innerHTML = icon('search'); });

  document.querySelectorAll('.promise-icon').forEach((slot, i) => {
    slot.innerHTML = icon(['shield', 'hands', 'headset'][i] || 'shield');
    slot.setAttribute('aria-hidden', 'true');
  });

  document.querySelectorAll('.property-specs span').forEach((slot, i) => {
    const label = slot.textContent.match(/[A-Za-z0-9].*/)?.[0]?.trim() || slot.textContent.trim();
    slot.innerHTML = `${icon(['bed', 'bath', 'area'][i % 3])}<span>${label}</span>`;
  });
  document.querySelectorAll('.property-bottom a').forEach((link) => { link.innerHTML = `${link.textContent.replace(/[↗→↘↖]/g, '').trim()} ${icon('northeast')}`; });
  document.querySelectorAll('a.button span').forEach((slot) => { slot.innerHTML = icon('northeast'); });
  document.querySelectorAll('.carousel-controls button').forEach((button, i) => {
    const isLeft = /[‹←]/.test(button.textContent) || i === 0;
    button.innerHTML = icon(isLeft ? 'left' : 'right');
    if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', isLeft ? 'Previous' : 'Next');
  });
  document.querySelectorAll('.footer-news form button').forEach((button) => {
    button.innerHTML = icon('right');
    if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', 'Subscribe');
  });
  document.querySelectorAll('.eyebrow i').forEach((slot) => { slot.innerHTML = icon('sparkle'); });

  const polish = document.createElement('style');
  polish.textContent = `
    .ui-icon{display:block;width:18px;height:18px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
    .search-field .field-icon,.search-icon{display:inline-grid;place-items:center;line-height:0;flex:0 0 18px;width:18px;height:18px}
    .search-icon .ui-icon{width:16px;height:16px}
    .promise-icon{display:grid;place-items:center}
    .promise-icon .ui-icon{width:19px;height:19px}
    .property-specs{display:flex;align-items:center;gap:clamp(8px,1vw,14px)}
    .property-specs>span{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
    .property-specs .ui-icon{width:14px;height:14px;stroke-width:1.65}
    .property-bottom a{display:inline-flex;align-items:center;gap:7px}
    .property-bottom a .ui-icon,.button span .ui-icon{width:14px;height:14px}
    .carousel-controls button{display:grid;place-items:center}
    .carousel-controls button .ui-icon{width:15px;height:15px}
    .footer-news form button{display:grid;place-items:center;line-height:0}
    .footer-news form button .ui-icon{width:15px;height:15px}
    .eyebrow i{display:inline-grid;place-items:center;vertical-align:middle}
    .eyebrow .ui-icon{width:12px;height:12px;stroke-width:1.8}
    @media(max-width:700px){.property-specs{gap:9px}.property-specs>span{gap:4px}.property-specs .ui-icon{width:13px;height:13px}}
  `;
  document.head.appendChild(polish);
})();
