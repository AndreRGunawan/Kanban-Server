const { Task } = require("../models/index.js")

class TaskController {
    static findAll(req,res,next){
        Task.findAll({
            where:{
                UserId : req.currentUserId
            }
        })
        .then(result =>{
            res.status(200).json({
                tasks: result
            })
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({ //Kalau sudah ada errorHandler, gantikan res.status(500).json menjadi return next({error})
                message:"InternalServerError",
                error:error
            })
        })
    }
    static addNewTask(req,res,next){
        // model attb. : title, category, tags, description, due_date, UserId
        console.log("++++++++  addNewTask  +++++++++++++++")
        console.log(req.body, "this is req body")
        let { title, category, tags, description, due_date } = req.body
        console.log(req.currentUserId, "INI USER ID SAAT INI")
        let UserId = req.currentUserId
        let newTask = {
            title,
            category,
            tags,
            description,
            due_date,
            UserId: UserId
        }
        Task.create(newTask)
        .then(result =>{
            res.status(201).json({
                message:"Task successfully added",
                newTask: result
            })
        })
        .catch(error =>{
            console.log(error)
            return next({
                message: "InternalServerError",
                error: error
            })
        })
    }
    static getOneTask(req,res,next){
        console.log(req.params.id)
        let { id } = req.params
        Task.findByPk(id)
        .then(result => {
            //kalau result ada, cocokkan user id || not found-- kalau cocok, tampilkan  || unauthorized
            if(result){
                console.log(result, req.currentUserId, "TEST")
                if(result.UserId == req.currentUserId){
                    res.status(200).json({
                        task: result
                    })
                } else {
                    res.status(400).json({
                        message:"BadRequest",
                        errors: "Unauthorized request"
                    })
                }
            } else {
                res.status(404).json({
                    message:"Task not found",
                    errors:"Task not found"
                })
            }
        })
        .catch(err =>{
            return next({
                message:"InternalServerError",
                error:err
            })
        })
    }
    static updateTask(req,res,next){
        console.log("==============================")
        let { title, category, tags, description, due_date } = req.body
        let updatedTask = {
            title, 
            category, 
            tags, 
            description, 
            due_date, 
            UserId : req.currentUserId
        }
        Task.update(updatedTask, {where:{id:req.params.id}, returning:true } )
        .then(result =>{
            res.status(201).json({
                updatedTask : result
            })
        })
        .catch(err =>{
            return next({
                message:"InternalServerError",
                error:err
            })
        })
    }
    static deleteTask (req,res,next){
        let {id} = req.params
        Task.destroy({where:
            { id }
        })
        .then(_ =>{
            res.status(200).json({
                message: "task successfully deleted"
            })
        })
        .catch(error =>{
            res.status(500).json({
                message: "InternalServerError",
                error:error
            })
        })
    }
    static updateCategory(req,res,next){
        /*
        Project.update(
            { title: 'a very different title now' },
            { where: { _id: 1 } }
        )
        */
        //    console.log ("++++++++++++++BERHASIL MASUK TASK CONTROLLER+++++++++++++++++++")
        //     console.log (req.query)
        //     console.log(req.params.id)
        Task.update({category: req.query.newCategory},
            { where : 
                { id : req.params.id }, returning:true
            },
            
        )
        .then(result => {
            console.log(result)
            res.status(200).json(
                result
            )
        })
        .catch(error =>{
            console.log(error)
        })
    }
}

module.exports = TaskController