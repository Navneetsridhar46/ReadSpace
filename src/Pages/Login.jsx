import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import img1 from '../assets/login2.png'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validation from '../LoginValidation/Validation';
import { getLoginAPI, registerAPI } from '../services/allAPI';


function Login({ insideRegister }) {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: ""
    })

    const [errors, setErrors] = useState({})


    const handleRegister = async (e) => {
        e.preventDefault()
        setErrors(validation(values))
        if (values.firstname && values.lastname && values.email && values.mobile && values.password) {
            // api call 
            try {
                const result = await registerAPI(values)
                console.log(result);
                if (result.status == 200) {
                    localStorage.setItem("customer", JSON.stringify(result.data))
                    setTimeout(() => {
                        toast.success('Please login to continue')
                    }, 300);
                    navigate('/')
                } else {
                    toast.error('OOPS! User Already Exists..Please LOGIN')
                    setTimeout(() => {
                        setValues({ firstname: "", lastname: "", email: "", mobile: "", password: "" })
                        navigate('/')
                    }, 400)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.warning("Please fill the form completely!!")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrors(validation(values))
        if (values.email && values.password) {
            // api call 
            try {
                const result = await getLoginAPI(values)
                console.log(result);
                if (result.status == 200) {
                    localStorage.setItem("customer", JSON.stringify(result.data))
                    console.log(result.data);
                    setTimeout(() => {
                        toast.success('Welcome User')
                    }, 400);
                    navigate('/home')
                } else {
                    toast.error('OOPS! Invalid login credentials')
                    setTimeout(() => {
                        setValues({ email: "", password: "" })
                    })
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.warning("Please fill the form completely!!")
        }
    }



    return (
        <>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item>
                    <Nav.Link href="/home">READ<span className='fw-bolder text-danger'>SPACE</span><i style={{ height: '17px' }} class="fa-solid fa-book-open-reader"></i></Nav.Link>
                </Nav.Item>
            </Nav>

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-7 d-flex'>
                        <img style={{ height: '544px', width: '100%' }} src={img1} alt="" />
                    </div>
                    <div className='col-lg-5 d-flex justify-content-center'>
                        <div>
                            <h3 className='p-1'>Welcome to <span className='text-primary'>Read</span><span className='fw-bolder text-danger'>Space</span>!<i style={{ height: '29px' }} class="fa-solid fa-book-open-reader"></i></h3>
                            <p>Please sign-{insideRegister ? 'up' : 'in'} to your account and start the adventures!</p>
                            <Form>
                                <div className='d-flex'>
                                    {
                                        insideRegister &&
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="FirstName"
                                            className="mb-3 text-primary me-3"
                                        >
                                            <Form.Control value={values.firstname} onChange={e => setValues({ ...values, firstname: e.target.value })} type="text" placeholder="FirstName" name='firstname' />
                                            {errors.firstname && <p style={{ color: 'red', fontSize: '13px' }}>{errors.firstname}</p>}
                                        </FloatingLabel>
                                    }
                                    {
                                        insideRegister &&
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="LastName"
                                            className="mb-3 text-primary"
                                        >
                                            <Form.Control value={values.lastname} onChange={e => setValues({ ...values, lastname: e.target.value })} type="text" placeholder="LastName" name='lastname' />
                                            {errors.lastname && <p style={{ color: 'red', fontSize: '13px' }}>{errors.lastname}</p>}
                                        </FloatingLabel>
                                    }
                                </div>
                                {
                                    insideRegister &&
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Phone Number"
                                        className="mb-3 text-primary"
                                    >
                                        <Form.Control value={values.mobile} onChange={e => setValues({ ...values, mobile: e.target.value })} type="number" placeholder="9876543210" name='Mobile' />
                                        {errors.mobile && <p style={{ color: 'red', fontSize: '13px' }}>{errors.mobile}</p>}
                                    </FloatingLabel>
                                }
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email"
                                    className="mb-3 text-primary"
                                >
                                    <Form.Control value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} type="email" placeholder="name@example.com" name='email' />
                                    {errors.email && <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3 text-primary'>
                                    <Form.Control value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} type="password" placeholder="Password" name='password' />
                                    {errors.password && <p style={{ color: 'red', fontSize: '13px' }}>{errors.password}</p>}
                                </FloatingLabel>
                                <div className='d-flex justify-content-center'>
                                    {insideRegister ?
                                        <button type='submit' onClick={handleRegister} className='btn btn-success w-50'>REGISTER</button>
                                        :
                                        <button type='submit' onClick={handleLogin} className='btn btn-success w-50'>LOGIN</button>
                                    }
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div><input className='me-1' type="checkbox" name="" id="" />Remember me</div>
                                    <p className='text-danger'>Forgot Password?</p>
                                </div>

                                {
                                    insideRegister ?
                                        <h6 className='text-center mt-3 p-1'>Enjoy our new<span className='text-danger fw-bolder'> Space</span>!</h6>
                                        :
                                        <div>
                                            <h6 className='text-center mt-2 p-1'>New on our Store? <Link style={{ textDecoration: 'none' }} to={'/register'}>Create an account</Link></h6>
                                            <div className='d-flex justify-content-center mt-3 mb-3'>
                                                <GoogleLogin
                                                    onSuccess={credentialResponse => {
                                                        const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                                                        console.log(credentialResponseDecoded);
                                                        sessionStorage.setItem("userName", credentialResponseDecoded.name)
                                                        setTimeout(() => {
                                                            toast.success("Logged In Successfully")
                                                            navigate('/home')
                                                        }, 2000)

                                                    }}
                                                    onError={() => {
                                                        console.log('Login Failed');
                                                    }}
                                                />
                                            </div>
                                        </div>

                                }
                            </Form>
                        </div>
                    </div>
                </div>
                <ToastContainer position='top-center' theme='colored' autoClose={3000} />
            </div>
        </>
    )
}

export default Login