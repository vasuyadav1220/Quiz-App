import React, { useEffect, useEffectEvent, useState } from 'react';
import { db } from '../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { log } from 'firebase/firestore/pipelines';
import { Bounce, toast } from 'react-toastify';

export default function AddQuiz() {
    let [inp, setinp] = useState("")
    let [ques, setQues] = useState("")
    // let [ops, setOps] = useState("")
    let [correct, setCorrect] = useState("");
    let [options, setOptions] = useState([""]);


    // let oldquizes = JSON.parse(localStorage.getItem("allQuizes")) || { HTML: [], CSS: [] }
    let [formdata, setformData] = useState("")
    // let submithandler = async (e) => {
    //     e.preventDefault();
    //     let oldarray = formdata[inp] ? [...formdata[inp]] : [];
    //     setformData({ ...formdata, [inp]: [...oldarray, { question: ques }, { option: ops }] })
    //     try {
    //         const docRef = await addDoc(collection(db, "quizes"), {
    //             quizName: inp,
    //             question: ques,
    //             option: ops
    //         });
    //         console.log("Document written ID:", docRef.id);
    //     } catch (e) {
    //         console.error("Errr adding document", e);
    //     }

    // }

    const handleOptionChange = (index, value) => {
        let updated = [...options];
        updated[index] = value;
        setOptions(updated);
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index) => {
        let updated = options.filter((_, i) => i !== index);
        setOptions(updated);
    };


    let submithandler = async (e) => {
        e.preventDefault();

        let newQuestion = {
            question: ques,
            options: options,
            correctAnswer: correct
        };

        let oldarray = formdata[inp] ? [...formdata[inp]] : [];

        setformData({
            ...formdata,
            [inp]: [...oldarray, newQuestion]
        });

        try {
            await addDoc(collection(db, "quizes"), {
                quizName: inp,
                ...newQuestion
            });
            console.log("Question added");
            toast.success('Question added', {
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
        } catch (e) {
            console.error("Error adding document", e);
        }

        setQues("");
        setformData("");
        setCorrect("");
    };


    // useEffect(() => {
    //     localStorage.setItem("allQuizes", JSON.stringify(formdata))
    // }, [formdata])

    // console.log(Object.keys(formdata))
    return (
        <div>
            <div className=' d-flex mt-2 ' style={{ justifyContent: 'space-between' }}>
                <h2>Add Quiz</h2>

                <div>
                    <button type="button" class="btn btn-primary border-0 rounded-5" style={{ background: '#30364F' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-plus"></i>
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Quiz Type</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <p className='d-flex p-auto text-center'> <div>Current Quizes</div> &nbsp; : &nbsp;<span> {
                    Object.keys(formdata).join(" , ")
                }</span> </p> */}

            </div>
            <hr />
            <form onSubmit={submithandler} className='w-75 m-auto p-5 text-dark border rounded-4 shadow' style={{ background: '#ACBAC4' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter quiz name' name='name' value={inp} onChange={(e) => { setinp(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Quiz Question</label>
                    <input type="text" className="form-control" placeholder='Enter quiz question' name='question' value={ques} onChange={(e) => { setQues(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quiz Options</label>

                    {options.map((op, index) => (
                        <div key={index} className="d-flex gap-2 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Option ${index + 1}`}
                                value={op}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />

                            {options.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeOption(index)}
                                >
                                    −
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        className="btn btn-sm btn-secondary mt-2"
                        onClick={addOption}
                    >
                        + Add Option
                    </button>
                </div>


                <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter correct answer"
                        value={correct}
                        onChange={(e) => setCorrect(e.target.value)}
                    />
                </div>


                <button type="submit" className="btn btn-primary border-0 shadow" style={{ background: '#30364F' }}>Submit</button>
            </form>
        </div>
    )
}