
(function(){
  const form = $('#permit-form'), tbody = $('#permit-table tbody'), ptype = $('#ptype');
  function toggle(){ const v = ptype.value; $$('.cond').forEach(x=>x.style.display='none'); if(v==='Entertainment') $('.ent-only').style.display='block'; if(v==='Peddler') $('.ped-only').style.display='block'; }
  ptype.addEventListener('change', toggle);

  function detail(r){
    const b = el('div',{},
      el('h3',{}, `SmartPERMIT #${r.id} — ${r.type}`),
      el('div',{class:'small'}, niceDate(r.createdAt)),
      el('p',{}, r.business+' • '+(r.applicant||'')),
      el('p',{}, r.notes||''),
      el('div',{}, el('button',{onclick:()=>window.print(), class:'secondary'}, 'Print Receipt'),' ',
                  el('button',{onclick:modal.close, class:'ghost'}, 'Close'))
    ); modal.open(b);
  }

  function row(r){
    return el('tr',{},
      el('td',{}, String(r.id)),
      el('td',{}, r.type),
      el('td',{}, r.business),
      el('td',{}, r.applicant),
      el('td',{}, el('span',{class:'badge '+(r.status==='Approved'?'ok':(r.status==='Pending'?'warn':'info'))}, r.status)),
      el('td',{}, el('button',{class:'ghost',onclick:()=>advance(r.id)}, 'Advance'),' ', el('button',{class:'ghost',onclick:()=>detail(r)}, 'View'))
    );
  }
  function advance(id){
    const rec = SmartTown.getAll('licenses').find(x=>x.id===id); if(!rec) return;
    const order = ['Pending','Under Review','Approved'];
    rec.status = order[(order.indexOf(rec.status||'Pending')+1)%order.length];
    SmartTown.upsert('licenses', rec); toast('Status updated: '+rec.status); render();
  }
  function render(){ tbody.innerHTML=''; SmartTown.getAll('licenses').forEach(r=>tbody.appendChild(row(r))); }
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const rec = { type:$('#ptype').value, business:$('#biz').value.trim(), applicant:$('#applicant').value.trim(), phone:$('#phone').value.trim(),
      ent:$('#ent').value.trim(), route:$('#route').value.trim(), notes:$('#notes').value.trim(), status:'Pending' };
    SmartTown.upsert('licenses', rec); toast('Application submitted'); form.reset(); toggle(); render();
  });
  toggle(); render();
})();
