import React, { useEffect, useRef, useState } from 'react';
import { data } from 'react-router-dom';
import { db } from '../firebase.config';

export default function AllQuiz() {
  const [quizes, setQuizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('allQuizes')) || {};
    setQuizes(data);
  }, []);

  console.log("data", data);

  let [start, setStart] = useState(0)
  let [end, setEnd] = useState(5)


  const tableData =
    selectedCategory === 'ALL'
      ? Object.entries(quizes).flatMap(([category, questions, option]) =>
        questions.map((q, index) => ({
          category,
          question: q.question,
          option: q.option,
          index: index + 1
        }))
      )
      : (quizes[selectedCategory] || []).map((q, index) => ({
        category: selectedCategory,
        question: q.question,
        option: q.option,
        index: index + 1
      }));


  let totalPages = Math.ceil(tableData.length / 5)
  let currentpage = useRef(0)

  let pages = () => {
    let paginate = []
    for (let i = 1; i <= totalPages; i++) {
      paginate.push(i)
    }
    let page = paginate.map((v, i) => (
      <p className={currentpage.current == i && "page_color"} onClick={() => {
        currentpage.current = i
        setStart(5 * (v - 1))
        setEnd(5 * v)
      }} > {v} </p>
    ))

    return page
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Quiz Questions</h3>

        <select
          className="form-select w-25"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {Object.keys(quizes).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-info">
            <tr>
              <th style={{ width: '80px' }}>SR No.</th>
              <th style={{ width: '150px' }}>Category</th>
              <th>Question</th>
              <th>Option</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No questions found
                </td>
              </tr>
            ) : (
              tableData?.slice(start, end).map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {item.category}
                    </span>
                  </td>
                  <td>{item.question}</td>
                  <td>{item.option}</td>
                  <td>
                    <button type="button" class="btn btn-danger">Delete</button>
                    <button type="button" class="btn btn-secondary">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className='p-4 cursor-pointer  gap-3 d-flex'>
          {pages()}
        </div>
      </div>
    </div>
  );
}