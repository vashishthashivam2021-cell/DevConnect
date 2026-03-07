let check = document.getElementById("formdc");
    check.addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const response = await fetch("/login", {
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
      if (data === "you have to registered first") {
        document.getElementById("message").innerText = data;
      } else if (data === "incorrect password") {
        document.getElementById("message").innerText = data;
      } else {
        localStorage.setItem("username", username);
        window.location.href = "/feed.html";
      }
    });