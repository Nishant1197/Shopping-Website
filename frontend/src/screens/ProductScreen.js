import React, { useEffect } from 'react'
import { Card,Row,Col,Image,Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';



// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.
// We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.

const ProductScreen = () => {
  const dispatch = useDispatch()
const productDetails =  useSelector(state=>state.productDetails)
const {loading,product,error}=productDetails

  let { id } = useParams();
  useEffect(()=>{

    dispatch(listProductDetails(id))

  },[dispatch,id])
  return (
   <>
   <NavLink className='btn btn-light my-3' to='/'>Go Back</NavLink>
   {loading? <Loader/>:error?<Message varaiant='danger'>{error}</Message>:
   <Row  >
   <Col md={6} >
   <Image  src={product.image} alt={product.name} fluid></Image>
   </Col>
   <Col  md={3}>
   <ListGroup >
     <ListGroupItem className='group-item'>
       <h3>{product.name}</h3>
     </ListGroupItem>
     <ListGroupItem>
       <Rating value={product.rating} text={`${product.numReviews} reviews `}/>
     </ListGroupItem>
     <ListGroupItem>Price: ${product.price}</ListGroupItem>
     <ListGroupItem>Description: ${product.description}</ListGroupItem>
   
   </ListGroup>
   </Col>
   <Col md={3}>
   <Card>
   <ListGroup variant='flush'>
   <ListGroupItem>
     <Row>
       <Col>Price:</Col>
       <Col><strong>${product.price}</strong></Col>
     </Row>
   </ListGroupItem>
   <ListGroupItem>
     <Row>
       <Col>Status:</Col>
       <Col>{product.countInStock>0? 'In Stock':'Out Of Stock'}</Col>
     </Row>
   </ListGroupItem>
   <ListGroupItem>
   <Button className='btn-block text-center' type='button' disabled={product.countInStock===0}>
   Add To Cart
   </Button>
   </ListGroupItem>
   </ListGroup>
   
   </Card>
   </Col>
   </Row>
   }


   </>
  )
}

export default ProductScreen