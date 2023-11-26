import { React, useEffect, useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import { Input, Button, Form } from 'antd';
// contexts
import { Context as UsersContext } from 'contexts/usersContext'
import { Context as ProductsContext } from 'contexts/productsContext'

const NewProduct = () => {
    const navigate = useNavigate()
    const { authenticatedUser, userIsEmployee } = useContext(UsersContext)
    const { createNewProduct } = useContext(ProductsContext)

    useEffect(() => {
      if (Object.keys(authenticatedUser).length === 0) {
        navigate("/login");
      }
      if (!userIsEmployee) {
        navigate("/");
      }

    }, [authenticatedUser]);


    const handleSubmit = (values) => {
        createNewProduct(values)

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
            label="Name"
            name="name"
            placeholder="my product ..."
            rules={[{ required: true, message: 'Please input a name ...' }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input a price' }]}
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
            Create
          </Button>
      </Form.Item>

        </Form>
      </>
    ) 
}

export default NewProduct