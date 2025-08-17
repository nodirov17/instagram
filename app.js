// Count-up animatsiyasi
const easeOut = t => 1 - Math.pow(1 - t, 3);

document.querySelectorAll('.num').forEach(el => {
  const target = +el.dataset.count;
  const dur = 1600 + Math.random()*600;
  const start = performance.now();
  const tick = now => {
    const p = Math.min(1, (now - start) / dur);
    const val = Math.floor(easeOut(p) * target);
    el.textContent = val.toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString('en-US');
  };
  requestAnimationFrame(tick);
});

// Kontakt qo'shish (VCARD)
const btn = document.getElementById('saveContact');
if(btn){
  btn.addEventListener('click', () => {
    const vcf = `BEGIN:VCARD
VERSION:3.0
N:Nodirov;Ozodbek;;;
FN:Ozodbek Nodirov
URL:https://instagram.com/nodiroff_17
TEL;TYPE=CELL:+998771430017
X-SOCIALPROFILE;type=instagram:https://instagram.com/nodiroff_17
X-SOCIALPROFILE;type=telegram:https://t.me/nodiroff_17
END:VCARD`;
    const blob = new Blob([vcf], {type:'text/vcard'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Ozodbek_Nodirov.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    party();
  });
}

// Mini confetti
function party(){
  for(let i=0;i<24;i++){
    const s = document.createElement('span');
    s.style.position='fixed';
    s.style.left = (innerWidth/2 + (Math.random()*120-60))+'px';
    s.style.top = (innerHeight/2 + (Math.random()*40-20))+'px';
    s.style.width=s.style.height=(8+Math.random()*8)+'px';
    s.style.borderRadius='2px';
    s.style.background = `hsl(${Math.random()*360},90%,60%)`;
    s.style.transform=`translate(-50%,-50%) rotate(${Math.random()*360}deg)`;
    s.style.pointerEvents='none';
    document.body.appendChild(s);
    const x = (Math.random()*2-1)*220; const y = - (150+Math.random()*220);
    const rot = Math.random()*720;
    s.animate([
      {transform:'translate(-50%,-50%) translate(0,0) rotate(0deg)', opacity:1},
      {transform:`translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${rot}deg)`, opacity:0}
    ], {duration:1200+Math.random()*800, easing:'cubic-bezier(.2,.6,.2,1)'}).onfinish=()=>s.remove();
  }
}

// Yil
const year = document.getElementById('year');
if(year){ year.textContent = new Date().getFullYear(); }

// Parallax karta
const card = document.querySelector('.card');
if(card){
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform='none');
}
