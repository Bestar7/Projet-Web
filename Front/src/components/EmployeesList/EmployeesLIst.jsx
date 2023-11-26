import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { List } from 'antd'

// contexts
import { Context as UsersContext } from 'contexts/usersContext'

const EmployeesList = () => {
    const navigate = useNavigate()
    const { authenticatedUser, userIsEmployee, EmployeesList } = useContext(UsersContext);
  
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
          header={<p style={{fontWeight:"bold", fontSize:17}}>Our Employees :</p>}
          dataSource={EmployeesList}
          renderItem={(item) => (
            <>
              <List.Item>
                  <Link style={{color:"#FAFAFA"}} to={'/employees/' + item.id}>{item.firstname + " " + item.lastname}</Link>
              </List.Item>
            </>
          )}
        />
      </div>
    )
}

export default EmployeesList