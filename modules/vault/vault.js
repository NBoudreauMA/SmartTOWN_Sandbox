
(function(){
  const out = $('#results'), fq = $('#q'), fd = $('#dept'), ft = $('#tag');
  function facets(list){
    const deptMap = {}; const tagMap = {};
    list.forEach(d=>{
      const dept = (d.dept||'Other'); deptMap[dept]=(deptMap[dept]||0)+1;
      (d.tags||[]).forEach(t=> tagMap[t]=(tagMap[t]||0)+1 );
    });
    const deptEl = $('#facet-dept'); deptEl.innerHTML='';
    Object.entries(deptMap).sort().forEach(([k,v])=>{
      const b = el('button',{class:'ghost',onclick:()=>{ fd.value=k; filter(); }}, `${k} (${v})`);
      deptEl.append(' ', b);
    });
    const tagEl = $('#facet-tag'); tagEl.innerHTML='';
    Object.entries(tagMap).sort().forEach(([k,v])=>{
      const b = el('button',{class:'ghost',onclick:()=>{ ft.value=k; filter(); }}, `${k} (${v})`);
      tagEl.append(' ', b);
    });
  }
  function preview(doc){
    const wrap = el('div',{},
      el('h3',{}, doc.title),
      el('div',{class:'small'}, doc.dept +' • '+ (doc.tags||[]).join(', ')),
      el('p',{}, doc.summary||''),
      el('div',{}, el('span',{class:'badge '+(doc.retention==='Archive'?'arch':'ok')}, 'Retention: '+(doc.retention||'Active'))),
      el('div',{}, el('button',{class:'secondary', onclick:()=>window.print()}, 'Print Preview'),' ', el('button',{class:'ghost',onclick:modal.close}, 'Close'))
    );
    modal.open(wrap);
  }
  function row(d){
    const card = el('div',{class:'card'},
      el('div',{class:'kicker'}, d.dept+' • '+(d.tags||[]).join(', ')),
      el('h3',{}, d.title),
      el('p',{}, d.summary||''),
      el('div',{}, el('span',{class:'badge '+(d.retention==='Archive'?'arch':'ok')}, d.retention||'Active'),' ',
                  el('button',{class:'ghost',onclick:()=>preview(d)}, 'Open'))
    );
    return card;
  }
  function filter(){
    const q = (fq.value||'').toLowerCase();
    const dept = (fd.value||'').toLowerCase();
    const tag = (ft.value||'').toLowerCase();
    const all = SmartTown.getAll('documents');
    const list = all.filter(d=>{
      const t = (d.title+' '+(d.tags||[]).join(' ')+' '+d.dept+' '+(d.summary||'')).toLowerCase();
      const tagMatch = tag? (d.tags||[]).map(x=>x.toLowerCase()).includes(tag) : true;
      return (q? t.includes(q):true) && (dept? (d.dept||'').toLowerCase().includes(dept):true) && tagMatch;
    });
    out.innerHTML='';
    out.append(el('div',{class:'small'}, `${list.length} document(s)`));
    list.forEach(d=>out.appendChild(row(d)));
    facets(all);
  }
  $('#go').addEventListener('click', filter);
  $('#clear').addEventListener('click', ()=>{ fq.value=fd.value=ft.value=''; filter(); });
  filter();
})();
