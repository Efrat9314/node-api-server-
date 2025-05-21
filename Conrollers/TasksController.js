let tasks = [{ id: 1, name: 'wash the dishes', isComplete: true }];

const TaskController = {
    getAll: (req, res) => {
        const { status } = req.query;
        const filteredTasks = status
            ? tasks.filter(task => task.isComplete === status)
            : tasks;

        res.status(200).json({
            success: true,
            data: filteredTasks
        });
    },

    getById: (req, res) => {
        const id = parseInt(req.params.id);
        const task = tasks.find(task => task.id === id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: `Task with ID ${id} not found`
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    },

    create: (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name,
            isComplete: false
        };

        tasks.push(newTask);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    },

    update: (req, res) => {
        const id = parseInt(req.params.id);
        const { isComplete } = req.body;

        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Task with ID ${id} not found`
            });
        }
        
        if (typeof isComplete !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'At least one of name or status is required to update'
            });
        }

        tasks[index] = {
            ...tasks[index],
            ...(isComplete && { isComplete })
        };

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: tasks[index]
        });
    },

    delete: (req, res) => {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Task with ID ${id} not found`
            });
        }

        const deletedTask = tasks[index];
        tasks.splice(index, 1);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    }
};

export default TaskController;
