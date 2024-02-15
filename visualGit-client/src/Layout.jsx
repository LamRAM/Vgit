import React from 'react'
import logo from './assets/vg-logo.svg'
import { Body } from './Body'
import SideBar from './SideBar'


const Layout = () => {
    return (
        <div className='w-full h-full flex flex-col gap-10'>
            <div className='p-2' >
                {/* <p className='font-bold text-xl'>VisualGit</p> */}
                <img  className='w-20 h-fit m-0 p-0' src={logo} alt="visual git logo" />
            </div>
        <div className='w-full flex gap-10'>
            <div className='bg-slate-100 p-4 w-1/4 overflow-scroll'>
                <SideBar/>
            </div>
            <div className='w-full bg-slate-100 overflow-scroll p-8 rounded-lg'>
                <Body/>
            </div>
        </div>
        </div>
    )
}

export default Layout