let projects=JSON.parse(localStorage.getItem('projects')||'[]');
const list=document.getElementById('list');
function render(){
list.innerHTML='';
projects.forEach((p,i)=>{
const li=document.createElement('li');
li.textContent=p;
list.appendChild(li);
});
localStorage.setItem('projects',JSON.stringify(projects));
}
function addProject(){
const n=document.getElementById('projectName').value;
if(n){projects.push(n);render();projectName.value='';}
}
render();
