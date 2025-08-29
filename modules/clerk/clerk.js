
(function(){
  const form = $('#ag-form'), tbody = $('#ag-table tbody');
  function row(r){
    return el('tr',{},
      el('td',{}, String(r.id)),
      el('td',{}, r.board),
      el('td',{}, r.meeting),
      el('td',{}, r.title),
      el('td',{}, el('span',{class:'badge'}, r.status||'Under Review'))
    );
  }
  function render(){ tbody.innerHTML=''; SmartTown.getAll('agenda_requests').forEach(r=>tbody.appendChild(row(r))); }
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const rec={board:$('#board').value.trim(),meeting:$('#meeting').value.trim(),title:$('#title').value.trim(),summary:$('#summary').value.trim(),requester:$('#who').value.trim(),status:'Under Review'};
    SmartTown.upsert('agenda_requests', rec); form.reset(); toast('Agenda item submitted'); render();
  });
  render();
})();
