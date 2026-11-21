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
