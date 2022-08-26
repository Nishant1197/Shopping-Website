import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { NavLink } from 'react-router-dom'
const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
    <NavLink to={`/product/${product._id}`}><Card.Img variant="top" src={product.image} /></NavLink>  
      <Card.Body as='div' style={{height:"170px"}}>
     <NavLink to={`/product/${product._id}`}><Card.Title as='div'><strong>{product.name}</strong></Card.Title></NavLink>   
        <Card.Text as='div'>
  <Rating value={product.rating} text={`${product.numReviews}  reviews`} color='#f8e825'></Rating>    
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product