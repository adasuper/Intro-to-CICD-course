const pages = document.querySelectorAll('.page');
function showPage(){
  let id = location.hash.replace('#','') || 'home';
  let found = false;
  pages.forEach(p => { const on = p.id === id; p.classList.toggle('active', on); if(on) found = true; });
  if(!found){ document.getElementById('home').classList.add('active'); id='home'; }
  document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#'+id));
  document.body.classList.remove('nav-open');
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', showPage);
showPage();

const menuBtn = document.getElementById('menuBtn');
if(menuBtn) menuBtn.addEventListener('click', e => { e.stopPropagation(); document.body.classList.toggle('nav-open'); });
document.addEventListener('click', e => {
  if(document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('.menu-btn')){
    document.body.classList.remove('nav-open');
  }
});
document.querySelectorAll('[data-print]').forEach(b => b.addEventListener('click', () => window.print()));
document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
  const code = b.parentElement.querySelector('pre code') || b.parentElement.querySelector('pre');
  if(!code) return;
  navigator.clipboard.writeText(code.innerText).then(() => {
    const original = b.textContent;
    b.textContent = '✓ Copied';
    b.classList.add('copied');
    setTimeout(() => { b.textContent = original; b.classList.remove('copied'); }, 1500);
  });
}));
// Auto-add a copy button to every code block that doesn't already have one
document.querySelectorAll('pre').forEach(pre => {
  if(pre.closest('.code-block')) return;                 // already has a manual copy button
  const wrap = document.createElement('div');
  wrap.className = 'code-block';
  pre.parentNode.insertBefore(wrap, pre);
  wrap.appendChild(pre);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-copy';
  btn.textContent = '⧉ Copy';
  wrap.insertBefore(btn, pre);
  btn.addEventListener('click', () => {
    const code = wrap.querySelector('pre code') || pre;
    navigator.clipboard.writeText(code.innerText).then(() => {
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '⧉ Copy'; btn.classList.remove('copied'); }, 1500);
    });
  });
});
document.querySelectorAll('[data-addstep]').forEach(btn => btn.addEventListener('click', () => {
  const container = document.querySelector(btn.dataset.addstep);
  const tpl = document.querySelector(btn.dataset.tpl);
  if(!container || !tpl) return;
  const step = tpl.content.firstElementChild.cloneNode(true);
  const badge = step.querySelector('.badge');
  if(badge) badge.textContent = 'Step ' + (container.querySelectorAll('.step').length + 1);
  container.appendChild(step);
  const instr = step.querySelector('.instr');
  if(instr) instr.focus();
}));
document.querySelectorAll('[data-removestep]').forEach(btn => btn.addEventListener('click', () => {
  const container = document.querySelector(btn.dataset.removestep);
  if(!container) return;
  const steps = container.querySelectorAll('.step');
  if(!steps.length) return;
  const last = steps[steps.length - 1];
  const instr = last.querySelector('.instr');
  // only remove user-added/editable steps, never the fixed given steps
  if(instr && instr.isContentEditable) last.remove();
}));
