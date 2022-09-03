import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card,Row,Col,Image,Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink,useParams } from 'react-router-dom'
import Rating from '../components/Rating';



// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.
// We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.

const ProductScreen = ({match}) => {
const [product,setProduct]=useState({})
  let { id } = useParams();
  useEffect(()=>{
    const fetchProduct=async()=>{
      const response=await axios.get(`/api/products/${id}`)
      console.log(response);
      setProduct(response.data)
    }
    fetchProduct()
  },[])
  return (
   <>
   <NavLink className='btn btn-light my-3' to='/'>Go Back</NavLink>
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

   </>
  )
}

export default ProductScreen