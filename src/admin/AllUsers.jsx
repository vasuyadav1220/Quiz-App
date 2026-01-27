import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Bounce, toast } from 'react-toastify';

export default function AllUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const getUsers = async (e) => {
    setLoading(true)

    try {
      const querySnapShot = await getDocs(collection(db, "users"))
      let userData = [];

      querySnapShot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() })
      })
      setUsers([...userData])
    } catch (error) {
      console.error(error);

    } finally{
      setLoading(false)
    }
  }

      const filteredData = users.filter(item => {
    return item.data.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.data.email.toLowerCase().includes(searchQuery.toLowerCase()) 
  })

  let deletehandler = async (id) => {
        let data = await deleteDoc(doc(db, "users", id))
        console.log(data)
         toast.success('User Deleted Successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        getUsers()
    }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <div className='text-center mt-2'>
        <h2>All User</h2>
        <hr />
      </div>
<div className='d-flex mt-3 justify-content-end'>
          <div className='col-4'>
            <input
              className='form-control mb-3'
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      <table className="table  table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData?.map((u, i) => {
                return (
                  <tr key={i} >
                    <th scope="row">{ i + 1 }</th>
                    <td>{u.data.name}</td>
                    <td>{u.data.email}</td>
                    <td>{u.data.contact}</td>
                    <td>{u.data.address}</td>
                    <td>
                      <button onClick={() =>{
                        deletehandler(u.id)
                      }} className='btn bg-white rounded-5 shadow text-danger'><i class="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                )
              

            })
          }

        </tbody>
      </table>
    </div>
  )
}
