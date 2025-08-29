
(function(){
  const tbody = $('#qtable tbody');
  function normalize(){
    const out = [];
    SmartTown.getAll('issues').forEach(r=> out.push({when:r.createdAt, type:'SmartFIX', title:`${r.type} — ${r.location}`, dept:'DPW/Facilities', status:r.status, raw:r}));
    SmartTown.getAll('licenses').forEach(r=> out.push({when:r.createdAt, type:'SmartPERMIT', title:`${r.type} — ${r.business}`, dept:'Select Board/Clerk', status:r.status, raw:r}));
    SmartTown.getAll('ap_turnovers').forEach(r=> out.push({when:r.createdAt, type:'SmartFISCAL', title:`${r.warrant}`, dept:r.dept, status:r.status, raw:r}));
    SmartTown.getAll('timesheets').forEach(r=> out.push({when:r.createdAt, type:'SmartTIME', title:`${r.employee} — ${r.period}`, dept:r.department, status:r.status, raw:r}));
    SmartTown.getAll('agenda_requests').forEach(r=> out.push({when:r.createdAt, type:'SmartCLERK', title:r.title, dept:r.board, status:r.status, raw:r}));
    return out.sort((a,b)=>b.when-a.when);
  }
  function view(item){
    modal.open(el('div',{}, el('h3',{}, item.type+' — Details'), el('div',{class:'small'}, niceDate(item.when)), el('p',{}, item.title), el('p',{}, 'Status: '+item.status), el('button',{class:'ghost',onclick:modal.close}, 'Close')));
  }
  function filter(){
    const m = $('#m').value, s = ($('#s').value||'').toLowerCase(), d = ($('#d').value||'').toLowerCase();
    tbody.innerHTML='';
    normalize().filter(x=> (m==='all'||x.type.toLowerCase().includes(m.replace('_',''))) &&
      (s? x.status.toLowerCase().includes(s):true) && (d? (x.dept||'').toLowerCase().includes(d):true)
    ).forEach(x=>{
      tbody.appendChild(el('tr',{onclick:()=>view(x)},
        el('td',{}, niceDate(x.when)),
        el('td',{}, x.type),
        el('td',{}, x.title),
        el('td',{}, x.dept||''),
        el('td',{}, x.status||'')
      ));
    });
  }
  $('#go').addEventListener('click', filter);
  $('#clear').addEventListener('click', ()=>{ $('#m').value='all'; $('#s').value=''; $('#d').value=''; filter(); });
  filter();
})();
