const path = require("path")
const { readFile, writeFile } = require("../utils")


// route "/contacts/:id" method: GET
const renderContacts = async (req, res) => {
    try {
        const users = await readFile()

        const currentUser = users.find(item => item.id == req.params.id)

        if (!currentUser) {
            return
        }

        res.json({ user: currentUser })
    } catch (error) {
        res.status(500).json({
            message: e.message
        })
    }
}

// route "/login" method: POST
const loginUser = async (req, res) => {
    try {
        const users = await readFile()
        const { email, password } = req.body

        if (!email || !password) {
            res.json({ message: "Please enter credentials" })
            return
        }

        const currentUser = users.find(item => item.email === email)


        if (!currentUser) {
            res.status(400).json({
                message: "User not found!",
            })
            return
        }

        if (currentUser.password != password) {
            res.json({
                message: "Wrong password!",
            })
            return
        }

        res.json({ currentUser })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

// route add-contact method: POST
const addContact = async (req, res) => {
    try {
        const { userId, name, phone } = req.body
        if (!name || !phone) {
            res.json({ message: "Please enter data for pushing" })
            return
        }

        let users = await readFile()
        let newContact = {
            name,
            phone
        }
        users.forEach(item => {
            if (item.id == userId) {
                item.contacts.push(newContact)
            }
        })
        await writeFile(users)

        res.json(users.find(item => item.id == userId))
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    renderContacts, 
    loginUser,
    addContact
}