import React, { useState } from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import UploadBook from './UploadBook'
import ManageBooks from './ManageBooks';
import { HiArrowsPointingIn } from 'react-icons/hi2';
import { BiLogOut } from 'react-icons/bi';
import { CiSignpostDuo1 } from 'react-icons/ci';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function SideBar() {

    const navigate = useNavigate()

    const [component, setComponent] = useState('');

    const handleSignOut = () => {
        localStorage.removeItem('customer')
        // toast.success("Signout Success")
        navigate('/')
    }


    return (
        <>
            <style>
                {`
          .sidebar-link {
            text-decoration: none;
            color: inherit;
          }
          .main-div{
            width: 100%;
          }
        `}
            </style>
            <div className='d-flex'>
                <Sidebar aria-label="Sidebar with content separator example" style={{ backgroundColor: 'lightyellow', width: '250px', height: '100vh' }}>
                    {/* <div className='d-flex'>
                        <img className='img-fluid img-rounded' style={{ width: '16%' }} src={userImg} alt="" />
                        <h5 className='ms-4'>Mike Perry</h5>
                    </div> */}
                    <div>
                        <h2 className='p-1 text-center'>ADMIN HANDLE</h2>
                    </div>
                    <Sidebar.Items style={{ color: "black" }}>
                        <Sidebar.ItemGroup style={{ color: "black" }}>

                            <Link style={{ textDecoration: 'none' }} onClick={() => setComponent('uploadBook')}>
                                <Sidebar.Item href="#" icon={HiOutlineCloudUpload} className="sidebar-link">
                                <button className='btn btn-dark mb-1'>Upload</button>
                                </Sidebar.Item>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} onClick={() => setComponent('manageBooks')}>
                                <Sidebar.Item href="#" icon={HiInbox} className="sidebar-link">
                                   <button className='btn btn-dark mb-1 p-1'> Manage</button>
                                </Sidebar.Item>
                            </Link>

                            {/* <Link style={{ textDecoration: 'none' }} to={'/login'}>
                                <Sidebar.Item href="#" icon={CiSignpostDuo1} className="sidebar-link">
                                    <button className='btn btn-success mb-1'>Sign In</button>
                                </Sidebar.Item>
                            </Link> */}
                            
                                <Sidebar.Item href="#" icon={BiLogOut} className="sidebar-link">
                                   <button onClick={handleSignOut} className='btn btn-danger'> Logout</button>
                                </Sidebar.Item>
                            
                            
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                    <Link to={'/home'}><div className='text-center'><button className='btn btn-rounded btn-success'><i style={{height:'17px'}} class="fa-solid fa-arrow-left me-1"></i>BACK TO HOME</button></div></Link>
                </Sidebar>
                <div className='main-div'>
                    {component === 'uploadBook' && <UploadBook />}
                    {component === 'manageBooks' && <ManageBooks />}
                </div>
            </div>
            {/* <ToastContainer position='top-center' theme='colored' autoClose={3000} /> */}
        </>

    )
}

export default SideBar