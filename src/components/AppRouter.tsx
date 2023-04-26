import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelecor'
import Event from '../pages/Event'
import Login from '../pages/Login'
import { privateRoutes, publicRoutes } from '../router'

const AppRouter = () => {
    const { isAuth } = useTypedSelector(state => state.auth)
    return (
        isAuth ?     
                <Routes>
                    {privateRoutes.map(route => 
                        // @ts-ignore  
                        <Route path={route.path} element={<route.element/>} key={route.path}/>    
                    )}
                    {/* <Route path='/dates' element={<Event/>}></Route> */}
                    {/* @ts-ignore  */}
                <Route path='*' element={<Event/>}/>
            </Routes>
            :
              <Routes>
                {publicRoutes.map(route => 
                    // @ts-ignore  
                    <Route path={route.path} element={<route.element/>} key={route.path}/>    
                )}
                 {/* <Route path='/login' element={<Login/>}></Route> */}
                {/* @ts-ignore  */}
              <Route path='*' element={<Login/>}/>
         </Routes>
    )
}

export default AppRouter
