const passwordInput = document.querySelector("#password")
const eye = document.querySelector("#eye")

eye.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash")
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)
})

// login

const form = document.querySelector(".login_form")
const email = document.getElementById("email")
const password = document.getElementById("password")


form.addEventListener("submit", (e) => {
  e.preventDefault()

  let data = {}

  if (!email.value && !password.value) {
    alert(("Please enter credentials"))
    return
  }

  data.email = email.value;
  data.password = password.value


  fetch('http://localhost:7070/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message)
        return
      }
      const id = data.currentUser.id
      localStorage.clear()
      localStorage.setItem("userId", id)
      email.value = "";
      password.value = ""
      window.location.href = "contacts.html";
    })
    .catch((error) => {
      console.log(error.message)
    });
})






