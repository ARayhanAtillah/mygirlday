const CONFIG = {
  passcode: '011026',
  displayDate: '01/10/26',
  nickname: 'Babe'
};

const scenes = [...document.querySelectorAll('.scene')];
function showScene(id){
  scenes.forEach(s => s.classList.toggle('active', s.id === id));
}

// ---------- PASSCODE ----------
document.getElementById('dateDisplay').textContent = CONFIG.displayDate;
const polaroidName = document.getElementById('polaroidName');
if (polaroidName) polaroidName.textContent = CONFIG.nickname;
// The coded scenes below reuse the same CONFIG so you only edit name/date once.
const envelopeName = document.getElementById('envelopeName');
const heroName = document.getElementById('heroName');
const heroDate = document.getElementById('heroDate');
if(envelopeName) envelopeName.textContent = CONFIG.nickname;
if(heroName) heroName.textContent = CONFIG.nickname + '!';
if(heroDate) heroDate.textContent = CONFIG.displayDate.replaceAll('/', ' · ');
const dots = document.getElementById('codeDots');
const keypad = document.getElementById('keypad');
let typed = '';
for(let i=0;i<CONFIG.passcode.length;i++){
  const dot=document.createElement('span'); dots.appendChild(dot);
}
const keys=['1','2','3','4','5','6','7','8','9','•','0','⌫'];
keys.forEach(k=>{
  const b=document.createElement('button');
  b.className='key'+((k==='•'||k==='⌫')?' utility':'');
  b.textContent=k;
  if(k==='•') b.disabled=true;
  b.addEventListener('click',()=>handleKey(k));
  keypad.appendChild(b);
});
function renderDots(){
  [...dots.children].forEach((d,i)=>d.classList.toggle('filled',i<typed.length));
}
function handleKey(k){
  if(k==='⌫'){typed=typed.slice(0,-1);renderDots();return;}
  if(!/\d/.test(k) || typed.length>=CONFIG.passcode.length) return;
  typed += k; renderDots();
  if(typed.length===CONFIG.passcode.length){
    if(typed===CONFIG.passcode){
      setTimeout(()=>{showScene('scene-date'); burstConfetti(); setTimeout(startLoading,1700)},250);
    } else {
      document.querySelector('.lock-panel').classList.add('shake');
      setTimeout(()=>{typed='';renderDots();document.querySelector('.lock-panel').classList.remove('shake')},500);
    }
  }
}

// ---------- CONFETTI ----------
function burstConfetti(){
  const canvas=document.getElementById('confettiCanvas');
  const ctx=canvas.getContext('2d');
  const resize=()=>{canvas.width=innerWidth;canvas.height=innerHeight};resize();
  const p=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*12,vy:(Math.random()-1.2)*12,g:.22,r:2+Math.random()*5,a:1,c:['#fff0ca','#f7b7c6','#dbbf62','#f26c8a'][Math.floor(Math.random()*4)]}));
  let f=0;function tick(){ctx.clearRect(0,0,canvas.width,canvas.height);p.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.vy+=o.g;o.a*=.986;ctx.globalAlpha=o.a;ctx.fillStyle=o.c;ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;if(f++<150)requestAnimationFrame(tick)}tick();
}

// ---------- LOADING ----------
function startLoading(){
  showScene('scene-loading');
  let n=0; const fill=document.getElementById('loaderFill'); const txt=document.getElementById('loaderText');
  const t=setInterval(()=>{n+=Math.ceil(Math.random()*7);if(n>100)n=100;fill.style.width=n+'%';txt.textContent=n+'%';if(n>=100){clearInterval(t);setTimeout(()=>showScene('scene-envelope'),550)}},85);
}

document.getElementById('openEnvelope').addEventListener('click',()=>showScene('scene-hero'));
document.getElementById('readLetter').addEventListener('click',()=>showScene('scene-letter'));
document.getElementById('goCake').addEventListener('click',()=>showScene('scene-cake'));

// ---------- CAKE ----------
const cakeScene=document.getElementById('scene-cake');
const cake=document.getElementById('cake');
const cakeBody=document.getElementById('cakeBody');
const cakeHint=document.getElementById('cakeHint');
cake.addEventListener('click',()=>{
  if(cakeScene.classList.contains('final')) return;
  cakeScene.classList.add('dark');
});
document.getElementById('cakeColor').addEventListener('input',e=>{cakeBody.style.background=e.target.value});
document.getElementById('blowCandles').addEventListener('click',()=>{
  cake.classList.add('blown');
  cakeScene.classList.remove('dark');
  cakeScene.classList.add('final');
  cakeHint.textContent='Happy My Girl Day! ♡';
  fireworksShow();
});
document.getElementById('resetBtn').addEventListener('click',()=>location.reload());

// ---------- FIREWORKS ----------
function fireworksShow(){
  const canvas=document.getElementById('fireworks'); const ctx=canvas.getContext('2d');
  canvas.width=innerWidth;canvas.height=innerHeight;
  let particles=[];let frame=0;
  function boom(x,y){const hue=Math.random()*360;for(let i=0;i<55;i++){const a=Math.random()*Math.PI*2,s=1.5+Math.random()*5;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,h:hue})}}
  boom(innerWidth*.22,innerHeight*.36);boom(innerWidth*.78,innerHeight*.28);
  function tick(){ctx.clearRect(0,0,canvas.width,canvas.height);if(frame%35===0&&frame<170)boom(innerWidth*(.1+Math.random()*.8),innerHeight*(.12+Math.random()*.45));particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.vx*=.99;p.life*=.975;ctx.globalAlpha=p.life;ctx.strokeStyle=`hsl(${p.h},85%,65%)`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*2,p.y-p.vy*2);ctx.stroke()});particles=particles.filter(p=>p.life>.05);ctx.globalAlpha=1;if(frame++<250)requestAnimationFrame(tick)}tick();
}

// keyboard convenience
window.addEventListener('keydown',e=>{
  if(document.getElementById('scene-passcode').classList.contains('active')){
    if(/\d/.test(e.key))handleKey(e.key);
    if(e.key==='Backspace')handleKey('⌫');
  }
});
