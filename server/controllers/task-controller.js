const taskService = require('../service/task-service')
const ApiError = require('../exceptions/api-error')

class TaskController {
    async createTask(req, res, next) {
        try {
            const {title, description, creationDate, deadline, category, userId} = req.body
            const newTask = await taskService.createTask(title, description, creationDate, deadline, category, userId)
            return res.json(newTask)
        } catch (e) {
            next(e)
        }
    }

    async changeTask(req, res, next) {
        try {
            const {_id, title, description, creationDate, deadline, category, userId} = req.body
            const changedTask = await taskService.changeTask(_id, title, description, creationDate, deadline, category, userId)
            return res.json(changedTask)
        } catch (e) {
            next(e)
        }
    }

    async getTasks(req, res, next) {
        try {
            const {userId} = req.params
            const tasks = await taskService.getTasks(userId)
            return res.json(tasks)
        } catch (e) {
            next(e)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {taskId} = req.params
            console.log(taskId)
            await taskService.deleteTask(taskId)
            return res.status(200).json({message: 'Задача успешно удалена'});
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TaskController()