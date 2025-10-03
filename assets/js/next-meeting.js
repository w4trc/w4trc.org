(function(){
  const el = document.getElementById("next-meeting-date");
  if(!el) return;
  const now = new Date();
  const calc = (y,m)=>{
    const first = new Date(y,m,1);
    const firstThuOffset = (4 - first.getDay() + 7) % 7; // Thu=4
    return new Date(y,m,1 + firstThuOffset + 7, 19, 0, 0);
  };
  let d = calc(now.getFullYear(), now.getMonth());
  if (d < now) d = calc(now.getFullYear(), now.getMonth()+1);
  el.textContent = d.toLocaleString(undefined, {weekday:'long', month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit'});
})();
