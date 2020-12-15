module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db')

        db.shop.get_products()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },

    getProduct: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.shop.get_product(id)
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },

    getLabels: (req, res) => {
        const db = req.app.get('db')

        db.shop.get_labels()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    },

    getCart: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        
        db.shop.get_cart(id)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send(err))
    },

    removeItem: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.shop.remove_items(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    addToWishlist: (req, res) => {
        const {wishlist_id, product_id, price} = req.body
        const db = req.app.get('db')

        db.shop.add_to_wishlist(wishlist_id, product_id, price)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(500).send(err))
    },

    getWishlist: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.shop.get_wishlist(id)
        .then(wishlist => res.status(200).send(wishlist))
        .catch(err => res.status(500).send(err))
    },

    removeFave: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.shop.remove_fave(id)
        .then((wishlist) => res.status(200).send(wishlist))
        .catch(err => res.status(500).send(err))
    },

    addToCart: (req, res) => {
        const {cart_id, product_id, price} = req.body
        const db = req.app.get('db')

        db.shop.add_to_cart(cart_id, product_id, price)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
}