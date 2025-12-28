function login(){
const u=document.getElementById("username").value;
const p=document.getElementById("password").value;
if(u==="admin" && p==="1234"){
localStorage.setItem("auth","1");
location.href="dashboard.html";
}else{
alert("بيانات غير صحيحة");
}
}
