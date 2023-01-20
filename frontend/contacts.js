const contactsForm = document.querySelector(".contacts_form")
const contactName = document.getElementById("name")
const phone = document.getElementById("phone")
const id = localStorage.getItem("userId")
const ownerName = document.querySelector(".owner_name")
const table = document.getElementById("table")
const nodata = document.querySelector(".nodata")
const parentContacts = document.querySelector(".contacts")

const clearInputs = document.querySelector(".clearInputs")

// clear contact inputs
clearInputs.addEventListener("click", () => {
  phone.value = ""
  contactName.value = ""
})

// create a new contact
contactsForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let data = {}

  if (!contactName.value && !phone.value) {
    alert(("Please enter credentials"))
    return
  }

  data.userId = localStorage.getItem("userId")
  data.phone = phone.value;
  data.name = contactName.value;


  fetch('http://localhost:7070/add-contact', {
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
      renderContacts(data.contacts)
    })
    .catch((error) => {
      console.log(error.message)
    });
})


// get all contacts current user's
function getContactsData(id) {
  fetch(`http://localhost:7070/contacts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      ownerName.innerHTML = `${data.user.login}’s Contacts `
      console.log(data.user)
      renderContacts(data.user.contacts)
    });
}

// renderinfg contacts table
function renderContacts(data) {
  // console.log(data)
  if (data.length) {
    nodata.style.opacity = "0"
    parentContacts.style.opacity = "1"
    table.innerHTML = `
    <tr class="table_row">
      <th class="table_elem contact_number ">№</th>
      <th class="table_elem contact_name">Name </th>
      <th class="table_elem contact_phone">Phone Number</th>
    </tr>
    `
    data.forEach((item, i) => {
      table.innerHTML += `
        <tr class="table_row">
          <td class="table_elem contact_number contact_number_val">${i + 1}</td>
          <td class="table_elem contact_name contact_name_val">${item.name}</td>
          <td class="table_elem contact_phone contact_phone_val">UZ(+998) ${item.phone}</td>
        </tr>
        `
    })
  } else {
    nodata.style.opacity = "1"
    parentContacts.style.opacity = "0"
  }
}

// when window loaded render contacts
window.addEventListener("load", () => {
  getContactsData(id)
})



// login use
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
      renderContacts(data.currentUser.contacts)
      ownerName.innerHTML = `${data.currentUser.login}’s Contacts `
    })
    .catch((error) => {
      console.log(error.message)
    });
})