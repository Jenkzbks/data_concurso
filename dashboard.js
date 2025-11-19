// dashboard.js
// Extraído de index.html para mejor mantenimiento

// ========== Helpers ==========
const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const fmt=n=>new Intl.NumberFormat('es-PE').format(n);
const tip=$('#tooltip');
function showTip(x,y, html){
  tip.innerHTML=html; const pad=14; let tx=x+16, ty=y-10;
  const r=tip.getBoundingClientRect();
  if(tx+r.width+pad>innerWidth) tx=innerWidth-r.width-pad;
  if(ty+r.height+pad>innerHeight) ty=innerHeight-r.height-pad;
  if(ty<pad) ty=pad;
  tip.style.left=tx+'px'; tip.style.top=ty+'px'; tip.classList.add('show');
}
function hideTip(){ tip.classList.remove('show'); }

function parseCSV(t,d=';'){
  const rows=[]; let cur='', row=[], inQ=false;
  for(let i=0;i<t.length;i++){
    const c=t[i], n=t[i+1];
    if(c==='"'){ if(inQ && n==='"'){ cur+='"'; i++; } else inQ=!inQ; }
    else if((c==='\n'||c==='\r') && !inQ){ if(!(cur===''&&row.length===0)){ row.push(cur); rows.push(row);} row=[]; cur=''; }
    else if(c===d && !inQ){ row.push(cur); cur=''; }
    else cur+=c;
  }
  if(cur.length||row.length){ row.push(cur); rows.push(row); }
  const headers=(rows.shift()||[]).map(h=>h.trim());
  return rows.filter(r=>r.some(v=>v&&v.trim())).map(r=>{ const o={}; headers.forEach((h,i)=>o[h]=(r[i]||'').trim()); return o; });
}
const uniq = a => [...new Set(a.filter(Boolean))];
const pickColor = i => ['#2563eb','#16a34a','#f59e0b','#dc2626','#7e22ce','#db2777','#0891b2','#65a30d','#ea580c','#0ea5e9','#10b981','#a855f7'][i%12];
const groupCount=(rows,key)=>{ const m=new Map(); rows.forEach(d=>{ const k=(d[key]||'—').toUpperCase(); m.set(k,(m.get(k)||0)+1);}); return [...m.entries()].sort((a,b)=>b[1]-a[1]); };

// ...existing code (charts, render, events, etc.)...
// El resto del JS debe ser copiado aquí desde index.html
