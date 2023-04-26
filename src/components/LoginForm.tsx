import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { rules } from '../utils/rules';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creator';
import { useTypedSelector } from '../hooks/useTypedSelecor';
import { useActions } from '../hooks/useActions';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch()
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()

const submit = () => {
  login(username, password)
    // dispatch(AuthActionCreators.login(username, password))
}

return (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={submit}
    autoComplete="off"
  >
    {error && <div style={{color: 'red'}}>
            {error}
        </div>}
    <Form.Item
      label="Username"
      name="username"
      rules={[rules.required('Please input your username!')]}
    >
      <Input value={username} onChange={e => setUsername(e.target.value)}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[rules.required('Please input your password!')]}
    >
      <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
    </Form.Item>
    {/* @ts-ignore */}
    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >  {/*loading={isLoading} */}
          <Button type="primary" htmlType="submit" loading={isLoading}>
              Войти
          </Button>
    </Form.Item>
  </Form>
  )
}

export default LoginForm;