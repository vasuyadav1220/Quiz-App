import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config.js';
import { Bounce, toast } from 'react-toastify';

export default function Register() {

    let [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', contact: '' })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                address: formData.address,
                password: formData.password,
                role: "user"
            });
            console.log('document id', docRef.id);
            toast.success('User registered succefully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setFormData({ name: '', email: '', address: '', contact: '', password: '' });
        } catch (error) {
            console.error(error);
        }
    }

    let inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '450px' }}>
                <h4 className="text-center mb-3">Register</h4>

                <form onSubmit={submitHandler} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Enter user name' name='name' value={formData.name} onChange={inputHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder='Enter user email' name='email' value={formData.email} onChange={inputHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Password</label>
                        <input type="text" className="form-control" placeholder='Enter user password' name='password' value={formData.password} onChange={inputHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Contact</label>
                        <input type="text" className="form-control" placeholder='Enter user contact' name='contact' value={formData.contact} onChange={inputHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Address</label>
                        <textarea className='form-control' placeholder='Enter user address' name="address" value={formData.address} onChange={inputHandler} ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary border-0 shadow" style={{ background: '#30364F' }}>Register</button>
                    <div>
                        <NavLink to={'/'} >Login</NavLink>
                    </div>
                </form>

            </div>
        </div>
    )
}
