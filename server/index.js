require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const listAuth = require('./list/authCtrl')
const listMain = require('./list/mainCtrl')
const auth = require('./auth/authCtrl')
const main = require('./game/mainCtrl')
const game = require('./game/gameCtrl')
const profile = require('./game/profileCtrl')
const shopMain = require('./shop/mainCtrl')
const shopAuth = require('./shop/authCtrl')
const app = express()
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`⋰⋰⋱  ${SERVER_PORT}`)
    })
}).catch(err => console.log(err))

//  MAIN ENDPOINTS
app.get('/api/rules', main.getRules)

    //  POKER ENDPOINTS
// app.post('/api/start', game.startGame)
app.get('/api/deck', game.shuffle)
// app.get('/api/test-shuffle', game.shuffleTest)
app.post('/api/poker/:id', game.newGame)
app.put('/api/entry-fee/:id', game.payToPlay)

    //  ACCOUNT ENDPOINTS
app.put('/api/picture/:id', profile.editPic)
app.get('/api/picture/:id', profile.getPic)
app.get('/api/stats/:id', profile.getStats)

    //  AUTH ENDPOINTS
    //  HOLD'EM APP
app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.get('/api/logout', auth.logout)
    //  TO-DO APP
app.post('/api/register-l', listAuth.register)
app.post('/api/login-l', listAuth.login)
app.get('/api/logout-l', listAuth.logout)
app.post('/api/list-title', listMain.newTitle)
app.post('/api/task', listMain.addTask)
app.get('/api/tasks/:id', listMain.getTasks)
app.get('/api/labels/:id', listMain.getLabels)
app.delete('/api/delete/:id', listMain.delete)
app.put('/api/complete/:id', listMain.checkOff)

//  FRESHLY PICKED PRINTS APP
app.post('/api/login-fresh', shopAuth.login)
app.post('/api/register-fresh', shopAuth.register)
app.get('/api/logout-fresh', shopAuth.logout)
app.get('/api/products', shopMain.getProducts)
app.get('/api/category', shopMain.getLabels)
app.get('/api/product/:id', shopMain.getProduct)
app.get('/api/cart/:id', shopMain.getCart)
app.post('/api/add-to-cart', shopMain.addToCart)
app.delete('/api/remove-item/:id', shopMain.removeItem)
app.delete('/api/remove-fave/:id', shopMain.removeFave)
app.post('/api/wishlist', shopMain.addToWishlist)
app.get('/api/wishlist/:id', shopMain.getWishlist)