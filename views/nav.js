
document.addEventListener(
    "click",
    function(event) {
        var target = event.target;
        var replyForm;
        if (target.matches("[data-toggle='reply-form']")) {
            replyForm = document.getElementById(target.getAttribute("data-target"));
            replyForm.classList.toggle("d-none");
        }
    },
    false
);

function enlarge() {
  this.style.transform = "scale(6)";
  this.style.transition = "transform 0.25s ease";
}
function reset() {
  this.style.transform = "scale(1)";
  this.style.transition = "transform 0.25s ease";
}

$('.multi-item-carousel').carousel({
  interval: false
});

$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  } else {
    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});

var modal = document.getElementById('idmodal');
var images = document.getElementsByClassName('modalimg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

for (var i = 0; i < images.length; i++) {
  var img = images[i];
  img.onclick = function(evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

function post(src){
				
	var title = document.getElementById("post-title").value;
	var tweet = document.getElementById("textAreaExample").value;	
	var all = document.createElement("div");
	var header = document.createElement("div");
	var div = document.createElement("div");
	var img = document.createElement("img");
	var h6 = document.createElement("h6");
	var h6_title = document.createElement("h6");
	var p = document.createElement("p");
	var like =document.createElement("i");
	var dislike = document.createElement("i");
	var like_btn  = document.createElement("button");
	var dislike_btn = document.createElement("button");
	var p_help = document.createElement("p");
	var a = document.createElement("a");
	var a_help = document.createElement("a");
	var div_help = document.createElement("div");
	var p_star = document.createElement("p");
	var div_star = document.createElement("div");
	var star = document.createElement("span");
	var rating_user = document.createElement("div");
	var del = document.createElement("button");
	img.src = src;
	img.classList.add("imgspecs");
	
	like_btn.setAttribute("class", "btn");
	dislike_btn.setAttribute("class","btn");
	del.setAttribute("class","btn delete");
	like.setAttribute("class", "fa fa-thumbs-up");
	dislike.setAttribute("class","fa fa-thumbs-up fa-rotate-180");
	
	star.setAttribute("class", "fa fa-star");
	star.setAttribute("style", "color:orange; margin: 1.8px;");
	
	var node1 = document.createTextNode("De La Salle University");
	var node2 = document.createTextNode(title);
	var node3 = document.createTextNode(tweet);
	var node4 = document.createTextNode("Helpful?");
	var node5 = document.createTextNode("  0");
	var node6 = document.createTextNode("5/5");
	var node7 = document.createTextNode("Delete");
	
	h6.appendChild(node1);
	h6_title.appendChild(node2);
	p.appendChild(node3);
	p_star.appendChild(node6);
	p_star.setAttribute("style", "margin-right:1.8px");
	
	p_help.appendChild(node4);
	p_help.setAttribute("style", "font-size:12.8px; color:black; font-weight:300;");
	
	a_help.appendChild(p_help);
	a_help.setAttribute("href","#!");
	
	h6.setAttribute("style","color:seagreen");
	
	like_btn.appendChild(like).textContent = ' 0';
	dislike_btn.appendChild(dislike);
	dislike_btn.appendChild(node5);
	del.appendChild(node7);
	a.appendChild(h6);
	a.setAttribute("href", "user.html");
	
	 
	div_help.appendChild(a_help);
	div_help.appendChild(like_btn);
	div_help.appendChild(dislike_btn);
	div_help.append(del);
	div_help.classList.add("helpspecs");
	
	

	header.appendChild(img);
	rating_user.appendChild(a);
	
	
	div_star.appendChild(p_star);
	
	for(let i = 0; i<5; i++){
		div_star.appendChild(star.cloneNode(true));
	}
	rating_user.appendChild(div_star);
	
	div_star.setAttribute("style", "display:flex; flex-direction:row; font-size:12.8px; font-weight:300; align-items:center;");			
	rating_user.setAttribute("style", "display:flex ; flex-direction:column");	

	header.appendChild(rating_user);
	div.appendChild(h6_title);
	div.appendChild(p);
	div.appendChild(div_help);
	
	span.classList.add("userspecs");
	var element = document.getElementById("newpost");
				
	all.appendChild(header);
	all.appendChild(div);
				
	element.appendChild(all);
				
	del.onclick = function() { deleteButton(all)};
	
	all.classList.add("specs");
	header.classList.add("headspecs");
	div.classList.add("newpostspecs");
	
	
			
      const formToReset = document.getElementById('submission');
      formToReset.addEventListener('submit', (e) => {
         e.preventDefault();
         formToReset.reset();
         
    });
}

function deleteButton(x) {
	  
    var parent = document.getElementById("newpost");
    parent.removeChild(x);
   
}