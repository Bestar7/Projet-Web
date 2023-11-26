import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { List } from 'antd'

// contexts
import { Context as UsersContext } from 'contexts/usersContext'

const CustomersList = () => {
    const navigate = useNavigate()
    const { authenticatedUser, userIsEmployee, customersList } = useContext(UsersContext);
  
    useEffect(() => {
      if (Object.keys(authenticatedUser).length === 0) {
        navigate("/login");
      }
      if (!userIsEmployee) {
        navigate("/");
      }
    }, [authenticatedUser]);


    return (
      <div>
        <List
          bordered
          header={<p style={{fontWeight:"bold", fontSize:17}}>Registered Customers :</p>}
          dataSource={customersList}
          renderItem={(item) => (
            <>
              <List.Item>
                  <Link style={{color:"#FAFAFA"}} to={'/customers/' + item.id}>{ item.firstname + " " + item.lastname }</Link>
              </List.Item>
            </>
          )}
        />
      </div>
    )
}

export default CustomersList