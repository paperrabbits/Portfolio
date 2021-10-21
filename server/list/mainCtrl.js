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
        // const {id} = req.params;
        const {title, description, task_date, complete, task_label} = req.body.todo.text;
        // console.log(req.body, '.body')
        // console.log(user_id, 'params')
        console.log(req.params.id, 'params.id')
        console.log(req.body.todo.text, '.text')

        const db = req.app.get('db')
            // console.log(`
            //     TITLE: ${title}
            //     DESCRIPTION: ${description}
            //     DATE: ${task_date}
            //     COMPLETE: ${complete}
            //     LABEL: ${task_label}
            // `)

        db.list.create_task(req.params.id, title, description, task_date, task_label)
            .then(task => res.status(200).send(task))
            .catch(err => console.log(err))
    },

    getTasks: (req, res) => {
        const {account_id} = req.params
        const db = req.app.get('db')
        console.log(account_id, 'ACCOUNT_ID')
        console.log(req.params, '.params')

        db.list.get_tasks(account_id)
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
        console.log('bool', complete)

        db.list.complete_task(id, complete)
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
    }
}