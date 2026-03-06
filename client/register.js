const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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
    window.location.href = "/feed.html";
  }
});
