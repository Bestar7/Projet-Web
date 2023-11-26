import { React, useEffect, useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import { Input, Button, Form } from 'antd';
// contexts
import { Context as UsersContext } from 'contexts/usersContext'

const NewEmployee = () => {
    const navigate = useNavigate()
    const { authenticatedUser, userIsEmployee, registerEmployee } = useContext(UsersContext)

    useEffect(() => {
      if (Object.keys(authenticatedUser).length === 0) {
        navigate("/login");
      }
      if (!userIsEmployee) {
        navigate("/");
      }
    }, [authenticatedUser]);


    const handleSubmit = (values) => {
        if (values.password !== values.confirmPassword)
          return false

        var result = registerEmployee(
          values.firstname, 
          values.lastname, 
          values.email, 
          values.password, 
          values.companyName !== undefined ? values.companyName : null
          )
          console.log(result)

    }

    const handleErrorSubmit = (errorInfo) => {
      console.log('Failed:', errorInfo);
    }
  
    return (
      <>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          onFinishFailed={handleErrorSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Firstname"
            name="firstname"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please input a firstname ...' }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastname"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please input a lastname ...' }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please input a email ...' }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please input a password ...' }]}
          >
              <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please confirm your password ...' }]}
          >
              <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            placeholder="my product ..."
            rules={[{ required: false }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="managerId"
            name="Manager Id"
            placeholder="my product ..."
            rules={[{ required: false }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
      </Form.Item>

        </Form>
      </>
    ) 
}

export default NewEmployee