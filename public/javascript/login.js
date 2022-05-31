function signupFormHandler(event) {
  event.preventDefault();
  console.log("astro");

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
  }
}

function loginFormHandler(event) {
  event.preventDefault()
  console.log("nope")

}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
