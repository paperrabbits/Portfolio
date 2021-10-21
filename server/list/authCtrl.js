const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        console.log(email, password)
        console.log(` DB: ${db} `)
        let foundUser = await db.list.check_user(email);

            if (foundUser[0]) {
                console.log(400, 'email taken')
                return res.status(400).send('Email already in use')
            };

        const salt = bcrypt.genSaltSync(10)
            console.log('salt', salt)
        const hash = bcrypt.hashSync(password, salt)
            console.log('hash', hash)

        let newUser = await db.list.register(email, hash)
        console.log('hit_newUser')
        let userAccount = await db.list.create_account(newUser[0].user_id)
        console.log('hit_userAccount')
        let sessionPerson = {...newUser[0], ...userAccount[0]}
        console.log('hit_sessionPerson')

        req.session.user = sessionPerson
        console.log(req.session.user, 'registerBACK')
        res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        // console.log(req)
        // console.log(res)
        console.log(email, password)
        const db = req.app.get('db')
        console.log('hit-ctrl-login')

        let foundUser = await db.list.check_user(email)

            if (!foundUser[0]) {
                console.log('Email does not exist', 'LOGINBACK')
                return res.status(400).send('Email does not exist')
            };

        const authenticated = bcrypt.compareSync(password, foundUser[0].password)

            if (!authenticated) {
                console.log('Incorrect password', 'loginBACK')
                return res.status(401).send('Incorrect password')
            };        
        
            delete foundUser[0].password
        req.session.user = foundUser[0]
        console.log(foundUser[0], 'LOGINBACK')
        res.status(202).send(req.session.user)
    },

    logout: (req, res) => {
            console.log(req.session.user, 'LOGOUTBACK')
        req.session.destroy()
        res.sendStatus(200)
    }
}