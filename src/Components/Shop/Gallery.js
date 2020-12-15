import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import ShopHeader from './ShopHeader'
import Scrollbar from './Scrollbar'
import Footer from './Footer'
import {motion} from 'framer-motion'
import {AiFillHeart} from 'react-icons/ai'
import './Gallery.scss'
// import Auth from './Auth'
// import Bread from './Bread'
// import Breadcrumb from 'react-bootstrap/Breadcrumb'

    //  ACTIONS  ( DUX )
import {setProducts, setLabels, setCart, setCount, setFaves} from '../../ducks/shopReducer'


const Gallery = (props) => {
    const {cart_id, email, wishlist_id} = props.shop.customer
    const {push} = props.history
    const {products, categories, counter, wishList} = props.shop

    const [modal, showModal] = useState(false)
    const [view, setView] = useState([])
    const [colorHeart, setColorHeart] = useState([])
    const [label, setLabel] = useState('')
    

    // useEffect(() => {
    //     let filtered = wishList.map(e => e['product_id'])
    //     setColorHeart([...filtered])
    // }, [wishList])


    useEffect(() => {
        if (!products.length) {
            axios.get('/api/products')
            .then(res => props.setProducts(res.data))
            .catch(err => console.log(err))
        }

        axios.get('/api/category')
        .then(names => props.setLabels([...names.data]))
        .catch(err => console.log(err))
    }, [])

    
    const detailedView = (id) => {
        push(`/product/${id}`)
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
    }


    const addToFavorites = (product_id, price) => {
        if (!email) {
            showModal(!modal)
        } else {
            axios.post('/api/wishlist', {wishlist_id, product_id, price})
            .then(getFaves())
            .catch(err => console.log(err))
        }
    }


    const deleteFave = (id, str) => {
        let finder = wishList.filter(e => e['product_id'] === id)

        if (id && str) {
            axios.delete(`/api/remove-fave/${id}`)
            .then(() => getFaves())
            .catch(err => console.log(err))
        } else {
            axios.delete(`/api/remove-fave/${finder[0].wishlist_item_id}`)
            .then(() => getFaves())
            .catch(err => console.log(err))
        }
    }


    const getFaves = () => {
        axios.get(`/api/wishlist/${wishlist_id}`)
        .then(res => props.setFaves(res.data))
        .catch(err => console.log(err))
    }


    const rasterize = (str) => {
        let filtered = products.filter(e => e['category'] === str)
        setView([...filtered])
        setLabel(str)
    }


    const checkFaves = (id) => {
        let filtered = wishList.map(e => e['product_id'])
        return filtered.includes(id)
    }


    const reset = () => {
        setView([])
        setLabel('')
    }


    //  CATEGORY FILTER MENU --> LEFT-HAND RAIL
    const mappedLabels = categories.map((e, i) => (
        <div  
            key={i}
            className={label === e.category ? 'is-active' : null}
            id='catg' 
            onClick={() => rasterize(`${e.category}`)} > 
            {e.category} </div>
    ))


    //  ALL PRODUCTS FILTER VIEW
    const mappedProducts = products.map(e => (
        <div key={e.product_id} className='product-box' >
            <div className='product-title-box' >
                <h4 className='product-title' > {e.name} </h4>
                <AiFillHeart 
                    id={wishList.map(e => e['product_id']).includes(e.product_id) ? 'heart-icon-saved' : 'heart-icon'}
                    onClick={
                        wishList.map(e => e['product_id']).includes(e.product_id)
                        ?   () => deleteFave(e.product_id)
                        :   () => addToFavorites(e.product_id, e.price)
                    } />
            </div>
            <motion.img 
                id='product-img' 
                src={e.image} 
                alt={e.name}
                onClick={() => detailedView(e.product_id)} />
            <div className='description'> {e.description} </div>
            <div id='price-tag'> ${e.price} </div>
            <button 
                id='add-to-cart-btn' 
                onClick={() => addToCart(e.product_id, e.price)} > 
                Add to Cart </button>
        </div>
    ))


    //  FILTERED PRODUCTS VIEW BY 'CATEGORY'
    const updateFeed = view.map(e => (
        <div key={e.product_id} className='product-box' >
            <div className='product-title-box' >
                <h4 className='product-title' > {e.name} </h4>
                <AiFillHeart 
                    id={wishList.map(e => e['product_id']).includes(e.product_id) ? 'heart-icon-saved' : 'heart-icon'}
                    onClick={
                        wishList.map(e => e['product_id']).includes(e.product_id)
                        ?   () => deleteFave(e.product_id)
                        :   () => addToFavorites(e.product_id, e.price)
                } />
            </div>
            <motion.img 
                id='product-img'
                src={e.image} 
                alt={e.name}
                onClick={() => detailedView(e.product_id)} />
            <div className='description'> {e.description} </div>
            <div id='price-tag'> ${e.price} </div>
            <button 
                id='add-to-cart-btn'
                onClick={() => addToCart(e.product_id, e.price)} > 
                Add to Cart </button>
        </div>
    ))


    return (
        <div className='products-master' >
            <ShopHeader delete={deleteFave} />
            <Scrollbar />
            <div className='grid-menu' >
                <div className='menu' >
                    <div className='spacer' >
                        <p onClick={reset} > All </p>
                        <p> ({products.length}) </p>
                    </div>
                    {mappedLabels}
                </div>
                <div className='gallery-feed' >
                {
                    !view.length 
                    ? <> {mappedProducts} </>
                    : <> {updateFeed} </>
                }
                </div>
            </div>
            <Footer  />
        </div>
    )
}

const dux = (reduxState) => reduxState

export default connect(dux, {
    setProducts,
    setLabels,
    setCart,
    setCount,
    setFaves
})(withRouter(Gallery))