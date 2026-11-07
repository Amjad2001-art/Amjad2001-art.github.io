(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const header=document.querySelector('.site-header');
  const menuButton=document.querySelector('.menu-toggle');
  const navLinks=document.getElementById('nav-links');
  const navItems=[...document.querySelectorAll('.nav-links a')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('.project-card')];
  function closeMenu(){navLinks?.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open navigation menu')}
  menuButton?.addEventListener('click',()=>{let open=navLinks.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});
  navItems.forEach(x=>x.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeMenu()});
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    const f=btn.dataset.filter;
    filters.forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
    cards.forEach(c=>{const visible=f==='all'||c.dataset.categories.split(' ').includes(f);c.classList.toggle('is-hidden',!visible);c.setAttribute('aria-hidden',String(!visible))});
  }));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');o.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px 45px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;let current='#'+e.target.id;navItems.forEach(link=>link.classList.toggle('is-current',link.getAttribute('href')===current))}),{rootMargin:'-24% 0px -57% 0px',threshold:0});
    document.querySelectorAll('main section[id]').forEach(s=>navObserver.observe(s));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-revealed'));
  function progress(){if(!header)return;let max=document.documentElement.scrollHeight-innerHeight;header.style.setProperty('--scroll-progress',(max>0?Math.min(100,Math.max(0,scrollY/max*100)):0)+'%')}
  progress();addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress,{passive:true});
  const toast=document.getElementById('toast');let timer;
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{let message='Email: '+btn.dataset.copy;try{await navigator.clipboard.writeText(btn.dataset.copy);message='Email copied to clipboard';const label=btn.querySelector('span');if(label){label.textContent='Copied!';setTimeout(()=>label.textContent='Copy email',2300)}}catch(e){}if(toast){clearTimeout(timer);toast.textContent=message;toast.classList.add('is-visible');timer=setTimeout(()=>toast.classList.remove('is-visible'),2600)}}));
  let year=document.getElementById('copyright-year');if(year)year.textContent=String(new Date().getFullYear());
})();