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
