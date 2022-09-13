import React,{useEffect} from 'react'
import { NavLink,useParams,useLocation, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
const CartScreen = () => {
   const cart= useSelector(state=>state.cart)
   const {cartItems}=cart
   const {id} = useParams()
   const Navigate=useNavigate()
   const location=useLocation()
   const dispatch=useDispatch()
   const productId=id
const qty=location.search? Number(location.search.split('=')[1]):1

useEffect(()=>{
if(productId){
    dispatch(addToCart(productId,qty))
}
},[dispatch,productId,qty])

const checkoutHandler=()=>{
    Navigate('/login?redirect=shipping')
}
const removeFromCartHandler=(id)=>{
   dispatch(removeFromCart(id))
}
  return (
 <Row>
<Col md={8}>
<h1>Shopping Cart</h1>
{cartItems.length===0? <Message>Your cart is empty <NavLink to='/'>Go Back</NavLink></Message>
: ( <ListGroup variant='flush'>
{cartItems.map(item=>{
   return <ListGroupItem key={item.id}>
<Row>
    <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded/>
    </Col>
<Col md={3}>
<NavLink to={`/product/${item.id}`}>{item.name}</NavLink>
</Col>
<Col md={2}>
${item.price}
</Col>
<Col style={{width:'110px'}} md={2}>
<Form.Select style={{width:'107px'}} value={item.qty} onChange={(e)=>dispatch(addToCart(item.id,Number(e.target.value)))}>
           {
            [...Array(item.countInStock).keys()].map((x)=>
            <option key={x+1} value={x+1}>{x+1}</option>
            )

           }
            </Form.Select>
</Col>
<Col md={2}>
    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.id)}>
<i className='fas fa-trash'></i>

    </Button>
</Col>
</Row>
</ListGroupItem>
})}
    </ListGroup>
)}
</Col>
<Col md={4}>
<Card>
<ListGroup variant='flush'>
<ListGroupItem>
<h2>
    Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty,0)})
</h2>
${cartItems.reduce((acc,item)=>acc + item.qty * item.price ,0).toFixed(2)}
</ListGroupItem>
<ListGroupItem>
    <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler} >
        Proceed To Checkout
    </Button>
</ListGroupItem>

</ListGroup>



</Card>

</Col>


 </Row>
  )
}

export default CartScreen