let tasks = [{ id: 1, name: 'wash the dishes', status: 'done' }];

const TaskController = {
    getAll: (req, res) => {
        const { status } = req.query;
        const filteredTasks = status
            ? tasks.filter(task => task.status === status)
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
        const { name, status } = req.body;

        if (!name || !status) {
            return res.status(400).json({
                success: false,
                message: 'Name and status are required'
            });
        }

        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name,
            status
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
        const { name, status } = req.body;

        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Task with ID ${id} not found`
            });
        }

        if (!name && !status) {
            return res.status(400).json({
                success: false,
                message: 'At least one of name or status is required to update'
            });
        }

        tasks[index] = {
            ...tasks[index],
            ...(name && { name }),
            ...(status && { status })
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
