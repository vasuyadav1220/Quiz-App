import { log } from 'firebase/firestore/pipelines';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.config.js';
import { Bounce, toast } from 'react-toastify';


export default function AddUser() {

    let [formData, setFormData] = useState({ name: '', email: '', address: '', contact: '' })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                address: formData.address,
            });
            console.log('document id', docRef.id);
            toast.success('User addedd succefully', {
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
            setFormData({ name: '', email: '', address: '', contact: '' });
        } catch (error) {
            console.error(error);

        }
    }

    let inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='text-center mt-2'>
                <h2>Add User</h2>
                <hr />
            </div>
            <form onSubmit={submitHandler} className='w-75 m-auto p-5 text-dark border rounded-4 shadow' style={{ background: '#ACBAC4' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter user name' name='name' value={formData.name} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email</label>
                    <input type="text" className="form-control" placeholder='Enter user email' name='email' value={formData.email} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Contact</label>
                    <input type="text" className="form-control" placeholder='Enter user contact' name='contact' value={formData.contact} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Address</label>
                    <textarea className='form-control' placeholder='Enter user address' name="address" value={formData.address} onChange={inputHandler} ></textarea>
                </div>

                <button type="submit" className="btn btn-primary border-0 shadow" style={{ background: '#30364F' }}>Submit</button>
            </form>
        </div>
    )
}
