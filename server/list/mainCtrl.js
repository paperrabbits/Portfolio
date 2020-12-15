module.exports = {

    newTitle: (req, res) => {
        const {account_id, title} = req.body
        const db = req.app.get('db')
            console.log(req.body, 'Q')
                console.log(account_id)
                console.log(title)

        db.list.create_list(account_id, title)
            .then(handleTitle => res.status(200).send(handleTitle))
            .catch(err => console.log(err))
    },

    addTask: async (req, res) => {
        const {title, due_date, task_priority, description, account_id} = req.body
        const db = req.app.get('db')
            console.log(`
                TITLE: ${title}
                DESCRIPTION: ${description}
                DATE: ${due_date}
                PRIORITY: ${task_priority}
                ACCOUNT_ID: ${account_id}
            `)

        db.list.create_task(account_id, title, description, due_date, task_priority)
            .then(task => res.status(200).send(task))
            .catch(err => console.log(err))
    },

    getTasks: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        console.log(id, 'ACCOUNT_ID')

        db.list.get_tasks(id)
            .then(list => res.status(200).send(list))
            .catch(err => console.log(err))
    },

    getLabels: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        console.log(id, 'ACCOUNT_ID LABELS')

        db.list.get_labels(id)
            .then(list => res.status(200).send(list))
            .catch(err => console.log(err))
    },

    delete: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        console.log(id, 'id')

        db.list.delete_task(id)
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
    },

    checkOff: (req, res) => {
        const {id} = req.params
        const {complete} = req.body
        const db = req.app.get('db')
        console.log(complete)

        db.list.complete_task(id, complete)
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
    }
}