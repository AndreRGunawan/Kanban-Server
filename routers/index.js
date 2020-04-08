var express = require('express')
var router = express.Router()
const taskRouter = require("./taskRouter.js")
const userController = require("../controllers/userController.js")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.use("/tasks", taskRouter)

module.exports = router