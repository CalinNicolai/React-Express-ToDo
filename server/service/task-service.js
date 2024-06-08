const Task = require('../models/task-model'); // Импортируйте модель задачи

class TaskService {

    async createTask(title, description, creationDate, deadline, category, userId) {
        const task = await Task.create({title, description, creationDate, deadline, category, userId})
        return task
    }

    async getTasks(userId) {
        const tasks = await Task.find({userId})
        return tasks
    }

    async deleteTask(taskId) {
        await Task.deleteOne({_id: taskId});
    }

    async changeTask(_id, title, description, creationDate, deadline, category, userId) {
        try {
            // Находим задачу по ID и обновляем её поля
            const updatedTask = await Task.findByIdAndUpdate(
                _id,
                {
                    title,
                    description,
                    creationDate,
                    deadline,
                    category,
                    userId,
                },
                {new: true} // Опция new: true возвращает обновленный документ
            );

            // Если задача не найдена, выбрасываем ошибку
            if (!updatedTask) {
                throw new Error('Task not found');
            }

            return updatedTask;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TaskService();
