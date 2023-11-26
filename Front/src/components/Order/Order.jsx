import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Button } from 'antd';
// contexts
import { Context as LoginContext } from 'contexts/usersContext'
import { Context as ProductContext } from 'contexts/productsContext'

const Order = () => {
    const navigate = useNavigate()
    const { authenticatedUser, userIsEmployee } = useContext(LoginContext);
    const { productsToOrder, removeProductToOrder, orderProducts } = useContext(ProductContext);

    useEffect(() => {
      if (Object.keys(authenticatedUser).length === 0) {
        navigate("/login");
      }
      if (userIsEmployee) {
        navigate("/");
      }
      
    }, [authenticatedUser]);
    return (
      <>
        <h2>My order basket : </h2>
        <Button onClick={() => orderProducts(authenticatedUser.id)}>Order</Button>
        <Row gutter={16} style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        {
          productsToOrder.map(product => 
            <Card key={product.id} style={{margin:5, width:300}} title={product.productName} bordered={false}>
              <p>{product.description}</p>
              <Button style={{marginLeft:5}} onClick={() => removeProductToOrder(product.id)}>remove to my order</Button>
            </Card>
          )
        }
        </Row>
      </>
    )
}

export default Order