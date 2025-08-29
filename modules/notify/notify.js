
(function(){
  function tplReceipt(ctx){
    return `<div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 6px 0">Thanks, ${ctx.name||'Applicant'}!</h2>
      <p>We received your ${ctx.rtype||'submission'} <strong>#${ctx.rid||'—'}</strong>. Keep this for your records.</p>
      ${ctx.note?'<p>'+ctx.note+'</p>':''}
      <p class="small">This is an automated message from SmartTown.</p></div>`;
  }
  function tplApproval(ctx){
    return `<div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 6px 0">Action Requested</h2>
      <p>Please review ${ctx.rtype||'record'} <strong>#${ctx.rid||'—'}</strong>.</p>
      ${ctx.note?'<p>Note: '+ctx.note+'</p>':''}
      <p class="small">Open the work queue to proceed. (Demo — no links)</p></div>`;
  }
  function tplStatus(ctx){
    return `<div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 6px 0">Status Update</h2>
      <p>Your ${ctx.rtype||'record'} <strong>#${ctx.rid||'—'}</strong> has been updated.</p>
      ${ctx.note?'<p>'+ctx.note+'</p>':''}
      <p class="small">If you have questions, reply to this email. (Demo only)</p></div>`;
  }
  $('#preview').addEventListener('click', ()=>{
    const ctx = {name:$('#name').value.trim(), rtype:$('#rtype').value.trim(), rid:$('#rid').value.trim(), note:$('#note').value.trim()};
    const kind = $('#tpl').value; const map = {receipt:tplReceipt, approval:tplApproval, status:tplStatus};
    $('#email').innerHTML = map[kind](ctx); toast('Preview generated');
  });
})();
