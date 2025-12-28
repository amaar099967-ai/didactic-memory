function login(){
const u=username.value;
const p=password.value;
if(u==='admin'&&p==='1234'){
localStorage.setItem('auth','1');
location.href='dashboard.html';
}else{
alert('بيانات غير صحيحة');
}
}
