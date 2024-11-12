import React from 'react'

import { Outlet } from 'react-router-dom'
import MyAppBar from '../Header/header'

const Layout = () => {
  return (
    <div>
        <MyAppBar />
        <Outlet />
    </div>
  )
}

export default Layout