const forms = document.querySelector('.sideNav'),
      links = document.querySelectorAll(".link")

links.forEach(link => {
    link.addEventListener("click", e =>{
        e.preventDefault();
        forms.classList.toggle("show_wrapper_reg");
    })

})

function openNav(){
    document.getElementById("sideNav").style.width = "350px";
    document.getElementById("sideNav").style.zIndex = "3";
    document.getElementById("sideNav").style.right = "0";

}
function closeNav(){

    document.getElementById("sideNav").style.width = "0";
    document.getElementById("sideNav").style.zIndex = "-1";
    document.getElementById("sideNav").style.right = "0";
}
function Login_Nav(){
    var nav = document.getElementById("sideNav");
    if(nav.style.display == "none"){
        nav.style.display="block";
        nav.style.right = "0";
    }
    else{
        nav.style.display = "none";
    }
}
// FOR HOMEPAGE