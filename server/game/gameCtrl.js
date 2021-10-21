const botData = require('../pokerInfo/bots.json')
const newbKey = require('../pokerInfo/pokerKey.json')

module.exports = {
    shuffle: (req, res) => {
        const db = req.app.get('db')
        console.log('TRUFFLE')

        db.gameplay.shuffle()
        .then(deck => res.status(200).send(deck))
        .catch(err => res.status(500).send(err))
    },
    
    payToPlay: (req, res) => {
        const {id} = req.params
        const {amount} = req.body
        const db = req.app.get('db')
        console.log(amount, 'PULSE')
        
        db.gameplay.pay_to_play([amount, id])
        .then(player => res.status(200).send(player[0].cash))
        .catch(err => res.status(500).send(err))
    },
    
    // getBots: (req, res) => {
    //     res.status(200).send(bots)
    // },

    newGame: (req, res) => {
        const {account_id} = req.params
        const {player_id} = req.body
        const db = req.app.get('db')
        console.log(account_id, 'PULSE')

        db.gameplay.launch_game([player_id, account_id])
        .then(gameTable => res.status(200).send([...gameTable, ...botData]))
        .catch(err => res.status(500).send(err))
    },

    getRules: (req, res) => {
        let sorted = newbKey.sort((a, b) => b.badge_id - a.badge_id)
        res.status(200).send(sorted)
    }
}

// const monsters = require('../../db/combat/monster.json')

// module.exports = {
//     getMonster: (req, res) => {
//         let num = Math.floor(Math.random() * monsters.length)
//         let monster = monsters[num]
//         res.status(200).send(monsters[num])
//     }
// }