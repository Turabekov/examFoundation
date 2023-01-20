const { Router } = require("express")
const { renderContacts, loginUser, addContact } = require("../controllers/controller")

const router = Router()

// render contacts by user id
router.get("/contacts/:id", renderContacts)

// login route
router.post("/login", loginUser)

// add contact route
router.post("/add-contact", addContact)

module.exports = router