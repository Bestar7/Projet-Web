import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { List } from 'antd'
import { Card, Col, Row, Button } from 'antd';

// contexts
import { Context as LoginContext } from 'contexts/usersContext'
import { Context as ProductContext } from 'contexts/productsContext'

const ProductsList = () => {
    const navigate = useNavigate()
    const { productsList, deleteProduct, addProductToOrder } = useContext(ProductContext);
    const { authenticatedUser, userIsEmployee } = useContext(LoginContext);
  
    useEffect(() => {
      if (Object.keys(authenticatedUser).length === 0) {
        navigate("/login")
      }
    }, [authenticatedUser])

    return (    
          <>
            <h2>Products available for sale : </h2>
            <Row gutter={16} style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            {
              productsList.map(product => 
                <Card key={product.id} style={{margin:5, width:300}} title={product.productName} bordered={false}>
                  <p>{product.description}</p>
                  { userIsEmployee ? <Button style={{marginLeft:5}} onClick={() => deleteProduct(product.id)}>Delete</Button> : "" }
                  <Button style={{marginLeft:5}} onClick={() => addProductToOrder(product.id)}>Add to my order</Button>
                </Card>
              )
            }
            </Row>
          </>
    )
}

export default ProductsList