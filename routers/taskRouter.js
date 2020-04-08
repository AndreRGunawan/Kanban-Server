var express = require('express')
var router = express.Router()
const authentication = require("../middlewares/authentication.js")
const authorization = require("../middlewares/authorization.js")
const taskController = require("../controllers/taskController.js")
// model: title, category, tags, description, due_date, UserId
// (minimum) getAll, addTask, getspecificTask, EditTask, deleteTask
// (extras) add a new tag(maybe make more sense just to add -- also need to display it individually),
// (Extras) ability to change category

//authentication starts here
router.use(authentication)
router.get("/", taskController.findAll)
router.get("/:id", taskController.getOneTask)
router.post("/", taskController.addNewTask)
// //authorization starts here
router.put("/:id", authorization, taskController.updateTask)
router.delete("/:id", taskController.deleteTask) //delete task

// router.put("/:id")
// router.put("/:tags")//delete tags 

module.exports = router