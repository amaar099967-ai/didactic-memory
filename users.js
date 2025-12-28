function register(){
let u=user.value,p=pass.value,r=role.value;
if(!u||!p)return alert('أدخل البيانات');
let users=JSON.parse(localStorage.users||'{}');
if(users[u])return alert('موجود');
users[u]={pass:btoa(p),role:r};
localStorage.users=JSON.stringify(users);
alert('تم التسجيل');
}
function login(){
let users=JSON.parse(localStorage.users||'{}');
let u=user.value,p=pass.value;
if(users[u]&&users[u].pass===btoa(p)){
localStorage.current=u;
localStorage.role=users[u].role;
location.href='dashboard.html';
}else alert('بيانات خاطئة');
}