const bcrypt = require('bcryptjs')

module.exports = {
    
    register: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        let foundUser = await db.shop.check_customer(email)

        if (foundUser[0]) {
            return res.status(400).send('Email already in use')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.shop.register(email, hash)
        let customerCart = await db.shop.create_cart(newUser[0].customer_id)
        let customerWishList = await db.shop.create_wishlist(newUser[0].customer_id)
        let sessionCustomer = {...newUser[0], ...customerCart[0], ...customerWishList[0]}

        req.session.user = sessionCustomer
        res.status(201).send(req.session.user)
    },

    login: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        console.log('hit')
        console.log(email, password)

        let foundUser = await db.shop.check_customer(email)

        if (!foundUser[0]) {
            return res.status(400).send('User not found')
        }

        const authorized = bcrypt.compareSync(password, foundUser[0].password)

        if (!authorized) {
            return res.status(401).send('Incorrect password')
        }

        delete foundUser[0].password
        req.session.user = foundUser[0]
        res.status(202).send(req.session.user)
        console.log(req.session.user, 'LOGINBACK')
    },
    
    logout: (req, res) => {
        console.log(req.session.user, 'LOGOUTBACK')
        req.session.destroy()
        res.sendStatus(200)
    }
}