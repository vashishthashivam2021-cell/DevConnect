const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if(username===""||password===""){
    document.getElementById("message").innerText="Username and Password cannot be empty";
    return;
  }
  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await response.text();

  if (data === "Username already exists") {
    document.getElementById("message").innerText = data;
    form.reset();
  } else {
    localStorage.setItem("username", username);
    window.location.href = "/feed.html";
  }
});
