async function signup() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showToast("#errorToast", "Please enter both username and password.");
    return;
  }

  console.log(username, password);

  try {
    const response = await fetch("http://localhost:8080/user", {
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

    if (response.ok) {
      showToast("#okToast", "Successfully registered. You can now log in.");
      window.setTimeout(function () {
        window.location = "/view/login.html";
      }, 2000);
    } else {
      showToast("#errorToast", "Error registering user. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    showToast("#errorToast", "An error occurred. Please try again later.");
  }
}

function showToast(toastId, message) {
  const toast = document.querySelector(toastId);
  const toastMessage = toast.querySelector(".toast-message");
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function closeToast(toastId) {
  document.getElementById(toastId.substring(1)).classList.remove('show');
}
