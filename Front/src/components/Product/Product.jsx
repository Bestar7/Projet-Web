import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// contexts
import { Context as LoginContext } from 'contexts/usersContext'

const Product = ({ product }) => {
    const navigate = useNavigate()
    const { authenticatedUser } = useContext(LoginContext);

    useEffect(() => {
      if (authenticatedUser.length == 0) {
        navigate("/login");
      }
    }, [authenticatedUser]);

    return (
         <>
          <h1>{product.productName}</h1>
          <p>{product.description}</p>
          <p>{product.unitPrice} euro</p> 
        </>
    )
}

export default Product