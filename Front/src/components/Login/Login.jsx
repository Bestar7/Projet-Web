import { React, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Form, Checkbox, Alert } from 'antd';

// contexts
import { Context as LoginContext } from 'contexts/usersContext'

const Login = () => {
    const navigate = useNavigate()
    const { authenticatedUser, login } = useContext(LoginContext);
    var loginError = false;
    


    useEffect(() => {
      if (Object.keys(authenticatedUser).length > 0 ) {
        navigate("/");
      }
    }, [authenticatedUser]);

    const handleSubmit = (values) => {
      var result = login(values.email, values.password, values.isEmployee)
      console.log(result)
      if (result === true) 
      {
        console.log("navigate")
        navigate("/");
      }
      else 
        loginError = true;
  

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
            label="Email"
            name="email"
            placeholder="..."
            rules={[{ required: true, message: 'Please input a login' }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="isEmployee"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>As Employee</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            { loginError ?
              <Alert message="Login or password incorrect" type="error" showIcon style={{color:"#ff4d4f"}} /> 
              : ""  }
          </Form.Item>
        </Form>
      </>
    )
  
}

export default Login