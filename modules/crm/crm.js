
(function(){
  const form = $('#c-form'), tbody = $('#c-table tbody');
  function render(){
    tbody.innerHTML='';
    SmartTown.getAll('contacts').forEach(c=>{
      tbody.appendChild(el('tr',{},
        el('td',{}, c.name),
        el('td',{}, c.role||''),
        el('td',{}, c.email||''),
        el('td',{}, c.note||''),
        el('td',{}, el('button',{class:'ghost',onclick:()=>{SmartTown.remove('contacts', c.id); render();}}, 'Remove'))
      ));
    });
  }
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const c = {name:$('#cname').value.trim(), role:$('#crole').value.trim(), email:$('#cemail').value.trim(), note:$('#cnote').value.trim()};
    SmartTown.upsert('contacts', c); form.reset(); toast('Saved'); render();
  });
  render();
})();
