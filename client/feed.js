const username = localStorage.getItem("username");
document.getElementById("un").innerText = username;

function gototheprofile() {
  window.location.href = "/profile.html";
}

async function loadPosts(){

  const res = await fetch("/posts");
  const posts = await res.json();

  const container = document.getElementById("posts");

  container.innerHTML="";

  posts.forEach(post => {

    const div = document.createElement("div");

    div.className="card";

    div.innerHTML = `
      <nav>
        <span>${post.username}</span>
      </nav>

      <p>${post.text}</p>

      <img src="/uploads/${post.image}" width="400">

      <button onclick="likePost('${post._id}')">👍</button>

      <span id="likes-${post._id}">${post.likes}</span>
    `;

    container.appendChild(div);

  });

}

async function likePost(id){

  const res = await fetch("/like/"+id,{
    method:"POST"
  });

  const data = await res.json();

  document.getElementById("likes-"+id).innerText = data.likes;

}

loadPosts();