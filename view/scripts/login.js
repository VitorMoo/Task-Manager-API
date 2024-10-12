async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log(username, password);

   if (!username || !password) {
    showToast("#errorToast", "Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=utf8",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    let key = "Authorization";
    let token = response.headers.get(key);
    window.localStorage.setItem(key, token);

    if (response.ok) {
      showToast("#okToast");
      window.setTimeout(function () {
        window.location = "/view/index.html";
      }, 2000);
    } else {
      showToast("#errorToast");
    }
  } catch (error) {
    console.error("Error during login:", error);
    showToast("#errorToast");
  }
}

function showToast(toastId) {
  const toast = document.querySelector(toastId);
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

