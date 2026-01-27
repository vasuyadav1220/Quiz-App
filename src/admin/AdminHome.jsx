import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Bounce, toast } from 'react-toastify';
import { log } from 'firebase/firestore/pipelines';


export default function AdminHome() {

  const [loading, setLoading] = useState(false);
  const [USers, setUSers] = useState(false);
  const [Quizes, setQuizes] = useState(false);


  const getUsers = async (e) => {
    setLoading(true)

    try {
      const querySnapShot = await getDocs(collection(db, "users"))
      let userData = [];
      console.log('user data', userData);

      querySnapShot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() })
      })

      setQuizes([...userData])
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false)
    }
  }

    const getQuestions = async (e) => {
    setLoading(true)

    try {
      const querySnapShot = await getDocs(collection(db, "quizes"))
      let userData = [];
      console.log('user data', userData);

      querySnapShot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() })
      })

      setUSers([...userData])
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
    getQuestions()
  }, [])

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Users</h6>
              <h4> {USers.length} </h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Quizes</h6>
              <h4> { Quizes.length } </h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Question</h6>
              <h4>18</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}