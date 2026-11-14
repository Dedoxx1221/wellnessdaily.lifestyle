/* Roleta de desconto adaptada à estrutura estática de pvskin. */
(function(){var CFG={TEMPO_PITCH:36*60,URL:'https://wellnessdaily.lifestyle/pvskin/backbica',PRECO_ORIGINAL:127,PRECO_FINAL:97,DESCONTO_TXT:'30% OFF',MODO:'auto',REPASSAR_UTMS:!0,VALIDADE_MIN:10};var FATIAS=[{txt:'30% OFF',cor:'#16a34a'},{txt:'5% OFF',cor:'#e11d2e'},{txt:'R$10 OFF',cor:'#111111'},{txt:'15% OFF',cor:'#e11d2e'},{txt:'10% OFF',cor:'#111111'},{txt:'20% OFF',cor:'#e11d2e'}];var ativo=!1,aberto=!1,girou=!1,venceu=!1;var maxVideo=0,segPagina=0,videoAchado=null,buscas=0,timer=null;function $(id){return document.getElementById(id)}
var QS=location.search.replace(/^\?/,'');try{if(QS)sessionStorage.setItem('brr_qs',QS);else QS=sessionStorage.getItem('brr_qs')||''}catch(e){}
function brl(v){return'R$'+Number(v).toFixed(2).replace('.',',')}
var overlay=$('brr-overlay');if(overlay&&overlay.parentNode!==document.body)document.body.appendChild(overlay);function acharVideo(raiz){var v=raiz.querySelector?raiz.querySelector('video'):null;if(v)return v;var todos=raiz.querySelectorAll?raiz.querySelectorAll('*'):[];for(var i=0;i<todos.length;i++){if(todos[i].shadowRoot){var s=acharVideo(todos[i].shadowRoot);if(s)return s}}
return null}
function tempoVideo(){try{if(window.smartplayer&&smartplayer.instances&&smartplayer.instances.length){var inst=smartplayer.instances[0];var t=inst.video?inst.video.currentTime:inst.currentTime;if(typeof t==='number'&&!isNaN(t))return t}}catch(e){}
try{if(!videoAchado&&buscas<40&&segPagina%3===0){buscas++;videoAchado=acharVideo(document)}
if(videoAchado&&!videoAchado.isConnected){videoAchado=null;buscas=0}
if(videoAchado&&!isNaN(videoAchado.currentTime))return videoAchado.currentTime}catch(e){}
return null}
function tick(){if(document.visibilityState==='visible')segPagina++;var ref=segPagina;if(CFG.MODO==='auto'){var t=tempoVideo();if(t!==null){if(t>maxVideo)maxVideo=t;ref=maxVideo}}
if(!ativo&&ref>=CFG.TEMPO_PITCH)ativar();if(ativo)clearInterval(timer);}
function ativar(){if(ativo)return;ativo=!0;try{for(var i=0;i<3;i++)history.pushState({brr:1},'',location.href)}catch(e){}
window.addEventListener('popstate',function(){if(!aberto){abrir();return}
if(venceu){setTimeout(function(){location.href=urlFinal()},1)}})}
var canvas=$('brr-wheel');function desenhar(){var tam=canvas.getBoundingClientRect().width||260;var dpr=window.devicePixelRatio||1;canvas.width=Math.round(tam*dpr);canvas.height=Math.round(tam*dpr);var ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);var c=tam/2,r=c,n=FATIAS.length,seg=360/n;for(var i=0;i<n;i++){var centro=-90+i*seg;var a0=(centro-seg/2)*Math.PI/180,a1=(centro+seg/2)*Math.PI/180;ctx.beginPath();ctx.moveTo(c,c);ctx.arc(c,c,r,a0,a1);ctx.closePath();ctx.fillStyle=FATIAS[i].cor;ctx.fill();ctx.strokeStyle='#f5c400';ctx.lineWidth=2;ctx.stroke();ctx.save();ctx.translate(c,c);ctx.rotate(centro*Math.PI/180);ctx.fillStyle='#fff';ctx.textAlign='right';ctx.textBaseline='middle';ctx.font='900 '+Math.round(tam*0.062)+'px Montserrat, Arial, sans-serif';ctx.fillText(FATIAS[i].txt,r-tam*0.045,0);ctx.restore()}}
function girar(){if(girou)return;girou=!0;var btn=$('brr-spin');btn.disabled=!0;btn.innerHTML='<b>GIRANDO...</b><small>boa sorte! 🍀</small>';var seg=360/FATIAS.length;var folga=(Math.random()*2-1)*seg*0.32;canvas.style.transform='rotate('+(360*7+folga)+'deg)';setTimeout(ganhou,6000)}
function ganhou(){venceu=!0;$('brr-win-pct').textContent=CFG.DESCONTO_TXT;$('brr-old').textContent=brl(CFG.PRECO_ORIGINAL);$('brr-new').textContent=brl(CFG.PRECO_FINAL);$('brr-step-spin').style.display='none';$('brr-step-win').className='brr-result brr-show';overlay.scrollTop=0;confete();relogio();if(navigator.vibrate)try{navigator.vibrate([80,60,120])}catch(e){}}
function relogio(){var s=CFG.VALIDADE_MIN*60,el=$('brr-clock');var iv=setInterval(function(){s--;if(s<0){clearInterval(iv);return}
var m=Math.floor(s/60),ss=s%60;el.textContent=(m<10?'0':'')+m+':'+(ss<10?'0':'')+ss},1000)}
function confete(){var cores=['#16a34a','#f5c400','#e11d2e','#2563eb','#ffffff'];for(var i=0;i<60;i++){var d=document.createElement('div');d.className='brr-confetti';d.style.left=Math.random()*100+'vw';d.style.background=cores[i%cores.length];d.style.animationDuration=(2+Math.random()*2)+'s';d.style.animationDelay=(Math.random()*0.5)+'s';document.body.appendChild(d);(function(el){setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},4800)})(d)}}
function urlFinal(){var u=CFG.URL.trim();var atual=location.search.replace(/^\?/,'');var q=atual||QS;if(CFG.REPASSAR_UTMS&&q)u+=(u.indexOf('?')>0?'&':'?')+q;return u}
function abrir(){aberto=!0;try{if(videoAchado)videoAchado.pause();}catch(e){}
try{if(window.smartplayer&&smartplayer.instances[0]&&smartplayer.instances[0].pause)smartplayer.instances[0].pause();}catch(e){}
overlay.className='brr-open';document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';requestAnimationFrame(function(){requestAnimationFrame(desenhar)})}
$('brr-spin').addEventListener('click',girar);$('brr-go').addEventListener('click',function(){window.location.href=urlFinal()});window.addEventListener('resize',function(){if(aberto&&!girou)desenhar();});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(aberto&&!girou)desenhar();});timer=setInterval(tick,1000)})()
