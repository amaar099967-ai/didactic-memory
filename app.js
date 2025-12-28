if(!localStorage.current)location.href='index.html';
const basicItems=['تمديد أسلاك','مفاتيح','لمبات','قواطع'];
const key=()=> 'projects_'+localStorage.current;
let data=JSON.parse(localStorage[key()]||'{}');
const projectsSel=document.getElementById('projects');

function saveAll(){localStorage[key()]=JSON.stringify(data);}
function refreshProjects(){
projectsSel.innerHTML='';
Object.keys(data).forEach(p=>{
let o=document.createElement('option');o.value=p;o.text=p;projectsSel.appendChild(o);
});
}
function newProject(){
let name=prompt('اسم المشروع');
if(!name)return;
data[name]={rows:[],paid:0};
if(confirm('هل تود إضافة البنود الأساسية؟')) basicItems.forEach(b=>data[name].rows.push({n:b,q:0,p:0}));
saveAll();refreshProjects();projectsSel.value=name;loadProject();
}
function loadProject(){
let p=projectsSel.value;if(!p)return;
document.querySelector('tbody').innerHTML='';
data[p].rows.forEach(r=>addRow(r.n,r.q,r.p,false));
paid.value=data[p].paid||0;calc();
}
function addRow(n='',q=0,p=0,save=true){
let tr=document.createElement('tr');
tr.innerHTML=`<td><input value="${n}"></td>
<td><input type="number" value="${q}" oninput="calc()"></td>
<td><input type="number" value="${p}" oninput="calc()"></td>
<td class="t">0</td>`;
document.querySelector('tbody').appendChild(tr);
if(save)calc();
}
function calc(){
let g=0;let rows=[];
document.querySelectorAll('tbody tr').forEach(r=>{
let n=r.cells[0].children[0].value;
let q=+r.cells[1].children[0].value||0;
let p=+r.cells[2].children[0].value||0;
let t=q*p;r.querySelector('.t').innerText=t;g+=t;
rows.push({n,q,p});
});
grand.innerText=g;remain.innerText=(paid.value||0)-g;
let pr=projectsSel.value;if(pr){data[pr].rows=rows;data[pr].paid=+paid.value||0;saveAll();}
}
function importExcel(e){
let f=e.target.files[0];let r=new FileReader();
r.onload=x=>{let wb=XLSX.read(x.target.result,{type:'binary'});
let s=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
s.forEach(i=>addRow(i.البند||i.Item||'',i.الكمية||0,i.السعر||0));};
r.readAsBinaryString(f);
}
function ocrImage(e){
let f=e.target.files[0];
Tesseract.recognize(f,'ara+eng').then(r=>{
r.data.text.split('\n').forEach(t=>t.trim()&&addRow(t.trim()));
});
}
function exportPDF(){html2pdf().from(document.querySelector('main')).save('project.pdf');}
function showReport(){
let total=0;Object.values(data).forEach(p=>p.rows.forEach(r=>total+=r.q*r.p));
alert('إجمالي كل المشاريع: '+total);
}
function logout(){localStorage.removeItem('current');location.href='index.html';}
refreshProjects();
