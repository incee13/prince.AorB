var N=8, STEP=360/N, cur=0, spinning=false;
var colors={A:'#14b8a6',B:'#fb7185'};
var pics={A:null,B:null};
var $=function(i){return document.getElementById(i)};

function polar(r,deg){var a=(deg-90)*Math.PI/180;return [r*Math.cos(a),r*Math.sin(a)]}
function buildWheel(){
  var w=$('wheel'),s='';
  for(var i=0;i<N;i++){
    var t=i%2===0?'A':'B',p1=polar(96,i*STEP),p2=polar(96,(i+1)*STEP),mid=polar(66,i*STEP+STEP/2);
    s+='<path d="M0 0L'+p1[0]+' '+p1[1]+'A96 96 0 0 1 '+p2[0]+' '+p2[1]+'Z" fill="'+colors[t]+'" stroke="#fff" stroke-width="1.5"/>';
    s+='<text x="'+mid[0]+'" y="'+mid[1]+'" fill="#fff" font-size="20" font-weight="900" text-anchor="middle" dominant-baseline="central" transform="rotate('+(i*STEP+STEP/2)+' '+mid[0]+' '+mid[1]+')">'+t+'</text>';
  }
  s+='<circle r="10" fill="#fff" stroke="#999"/>';
  w.innerHTML=s;
}
buildWheel();

// ===== THE PICTURES (already set, edit these to change them) =====
function toBg(svg){return 'url("data:image/svg+xml;utf8,'+encodeURIComponent(svg)+'")'}

// Picture for A: sunny sky + green hills
pics.A = 'url("images/pic1.jpg")';

// Picture for B: sunset sky + dark hills
pics.B = 'url("images/dark-sky.jpg")';

$('go').addEventListener('click',function(){
  if(spinning)return;
  var la=$('la').value.trim(),lb=$('lb').value.trim(),q=$('cond').value.trim();
  if(!la||!lb){$('msg').textContent='Decide first! Type what A and B mean.';return}
  if(!q){$('msg').textContent='Type your condition / question first.';return}
  $('msg').textContent='';
  spinning=true;$('go').disabled=true;
  var res=Math.random()<.5?'A':'B';
  var cands=[];for(var i=0;i<N;i++){if((i%2===0?'A':'B')===res)cands.push(i)}
  var seg=cands[Math.floor(Math.random()*cands.length)];
  var t=seg*STEP+6+Math.random()*(STEP-12);
  var target=Math.ceil(cur/360)*360+360*6+((360-t)%360);
  cur=target;
  $('wheel').style.transform='rotate('+target+'deg)';
  setTimeout(function(){showResult(res,la,lb,q)},4800);
});

function showResult(res,la,lb,q){
  var r=$('result');
  r.style.backgroundImage=pics[res];
  $('rl').textContent=res;
  $('rm').textContent=res==='A'?la:lb;
  $('rq').textContent=q;
  r.classList.add('show');
}
$('again').addEventListener('click',function(){
  $('result').classList.remove('show');
  spinning=false;$('go').disabled=false;
});
