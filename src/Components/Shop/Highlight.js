import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {motion} from 'framer-motion'
import {ImArrowLeft2, ImArrowRight2} from 'react-icons/im'
import './Highlight.scss'

    //  ACTIONS  ( DUX )
import {setCart, setCount} from './dux/shopReducer'

const projVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {duration: 0.5}
    }
}


const Highlight = (props) => {
    const {push} = props.history
    const {id} = props.match.params
    const {email, cart_id} = props.shop.customer
    const {counter} = props.shop

    const [item, setItem] = useState({})
    const [modal, showModal] = useState(false)
    const [state, setState] = useState({
        dimensions: 'select size',
        monogram: 'letter',
        message: '',
        name: ''
    })


    useEffect(() => {
        getProduct()
    }, [])


    const getProduct = () => {
        axios.get(`/api/product/${id}`)
            .then(res => setItem(res.data[0]))
            .catch(err => console.log(err))
    }


    const addToCart = (product_id, price) => {
        if (!email) {
            showModal(!modal)
        } else {
            axios.post('/api/add-to-cart', {cart_id, product_id, price})
                .then(res => props.setCart(res.data))
                .catch(err => console.log(err))
        }
        props.setCount(counter + 1)
        push('/cart')
    }


    const handleChange = ({name, value}) => {
        setState({[name]: value})
    }


    return (
        <div className='product-page' >
            <div className='split-view-l' >
                <ImArrowLeft2 id='nav-back'  onClick={() => push('/gallery')} />
                <motion.container 
                    id='product-box'
                    variants={projVariants}
                    initial='hidden'
                    animate='visible' >
                    <h1> {item.name} </h1>
                    <img alt='' src={item.image} />
                    <p> ${item.price} </p>
                </motion.container>
            </div>
            <div className='split-view-r' >
                <h2> Order Options </h2>
                <div className='options-container' >
                    <div id='monogram' >
                        <div id='sandbar' >
                            <p>name:</p>
                            <input
                                id='name-input' 
                                name='name'
                                value={state.name}
                                placeholder='name'
                                onChange={(evt) => handleChange(evt.target)}  />
                        </div>
                        <div id='sandbar'>                                
                            <p>monogram:</p>
                            <select
                                id='mono-input' 
                                name='monogram'
                                value={state.monogram}
                                type='input'
                                onChange={(evt) => handleChange(evt.target)} >
                                    <option> A </option>
                                    <option> B </option>
                                    <option> C </option>
                                    <option> D </option>
                                    <option> E </option>
                                    <option> F </option>
                                    <option> G </option>
                                    <option> H </option>
                                    <option> I </option>
                                    <option> J </option>
                                    <option> K </option>
                                    <option> L </option>
                                    <option> M </option>
                                    <option> N </option>
                                    <option> O </option>
                                    <option> P </option>
                                    <option> Q </option>
                                    <option> R </option>
                                    <option> S </option>
                                    <option> T </option>
                                    <option> U </option>
                                    <option> V </option>
                                    <option> W </option>
                                    <option> X </option>
                                    <option> Y </option>
                                    <option> Z </option>
                            </select>
                        </div>
                        <div id='sandbar' >
                            <p>dimensions:</p>
                            <select
                                id='dim-input'
                                name='dimensions'
                                value={state.dimensions}
                                type='input'
                                onChange={(evt) => handleChange(evt.target)} >
                                <option> 5x8 </option>
                                <option> 7x10 </option>
                                <option> 10x14 </option>
                            </select>
                        </div>
                    </div>
                    <button 
                        onClick={() => addToCart(item.product_id, item.price)} > 
                        Add to Cart </button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setCart,
    setCount
})(withRouter(Highlight))