import { Layout } from 'antd'
import { Row } from 'antd/es/grid'
import Menu from 'antd/es/menu'
import React, { FC } from 'react'
import { RouteName } from '../router'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelecor'
import { useDispatch } from 'react-redux'
import { AuthActionCreators } from '../store/reducers/auth/action-creator'
import userEvent from '@testing-library/user-event'
import { useActions } from '../hooks/useActions'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
    const router = useNavigate()
    const { isAuth, user } = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const {logout} = useActions()
  return (
    <Layout.Header>
        <Row justify='end'>
            {isAuth
            ?
            <>
                <div style={{color: 'white'}}>
                        {user.username}
                </div>
                <Menu theme='dark' mode='horizontal' selectable={false}> 
                    <Link to='/login'>
                        <Menu.Item onClick={() =>logout()} key={1}>Выйти</Menu.Item>
                    </Link>
                </Menu>
            </>
            :
                <Menu theme='dark' mode='horizontal' selectable={false}> 
                    .
                    <Menu.Item onClick={() => router(RouteName.LOGIN)} key={1}>Login</Menu.Item>
                </Menu>
            }
        </Row>
    </Layout.Header>
  )
}

export default Navbar

{/* <div style={{color: 'black'}}>
.
</div>
() => router(RouteName.LOGIN) */}