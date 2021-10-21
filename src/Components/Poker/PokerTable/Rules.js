    // NPM
import React, {useEffect, useCallback} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {GiPokerHand} from 'react-icons/gi'

    // LOCAL
import {setRules} from '../dux/rulesReducer'
import './Rules.scss'

const Rules = (props) => {
    const {listOfHands} = props.rules

    const getRules = useCallback(() => {
        axios.get('/api/rules')
            .then(res => {
                props.setRules(res.data)
                console.log(res, 'RES-->')
            })
            .catch(err => console.log(err))
    }, [listOfHands])

    useEffect(() => {
        if (!listOfHands.length) {
            getRules()
        }
    }, [listOfHands, getRules])

    return (
        <div className='rules-master' >
            <div className='rules-list-container' >
                <h3 id='rules-title' > Poker Hands </h3>
                {
                    props.rules.listOfHands.map(rules => (
                        <div key={rules.badge_id} className='rules-list' >
                            <GiPokerHand  id='icons'  />
                            <p id='badge-name' > {rules.badge_name} </p>
                            <p id='xp-badge'> {rules.badge_score} XP </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {setRules})(Rules)