import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
   <footer style={{border:"1px solid black"}}>
       <Container>
           <Row>
 <Col className='text-center py-3'>  Copyright &copy; Shop</Col> 
           </Row>
       </Container>
    
   </footer>
  )
}

export default Footer