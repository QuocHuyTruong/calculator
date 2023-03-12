import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAnswer, loadButtons, loadClear, loadBackspace } from '../../reducer/calculator.action'
import { Grid } from '@mui/material'
import { calculatorReducer } from '../../store'

const Calculator = () => {
    const dispatch = useDispatch()

    // handle answer 
    const handleAnswer = (e) => {
        e.preventDefault()
        // alert(number)
        dispatch(loadAnswer())
    }

    const viewCalculator = useSelector((state) => state.calculatorReducer)

    return (
        <div>
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid xs={6} sm={6}>

                        <div className="bg-green-900 w-96 h-screen mx-auto rounded-lg overflow-hidden mt-5">
                            <div className="text-gray-200 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                                <p>CALCULATOR APP</p>
                            </div>

                            <div className=" h-36 ">

                                <input
                                    type="text"
                                    placeholder="0"
                                    value={viewCalculator.number}
                                    className=" w-full h-3/6 border border-white bg-white text-gray-900 text-4xl text-right pr-5 "
                                />
                                <p
                                    className=" w-full h-3/6 border border-white bg-white text-gray-900 text-4xl text-right pr-5 "
                                >{viewCalculator.ans}</p>
                            </div>

                            {/* keypad */}
                            <div className='grid grid-cols-4 gap-2 mt-10 mx-3'>
                                <button onClick={() => dispatch(loadClear())} className='text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>AC</button>
                                <button onClick={() => dispatch(loadBackspace())} className='text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>C</button>
                                <button onClick={() => dispatch(loadButtons('/'))} className='text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>/</button>
                                <button onClick={() => dispatch(loadButtons('+'))} className='text-gray  bg-white w-20 h-40 rounded-lg font-bold text-3xl flex justify-center items-center shadow row-span-2'>+</button>


                                <button onClick={() => dispatch(loadButtons(9))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>9</button>
                                <button onClick={() => dispatch(loadButtons(8))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>8</button>
                                <button onClick={() => dispatch(loadButtons(7))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>7</button>

                                <button onClick={() => dispatch(loadButtons(4))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>4</button>
                                <button onClick={() => dispatch(loadButtons(5))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>5</button>
                                <button onClick={() => dispatch(loadButtons(6))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>6</button>
                                <button onClick={() => dispatch(loadButtons('-'))} className='text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>-</button>

                                <button onClick={() => dispatch(loadButtons(1))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>1</button>
                                <button onClick={() => dispatch(loadButtons(2))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>2</button>
                                <button onClick={() => dispatch(loadButtons(3))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>3</button>
                                <button onClick={() => dispatch(loadButtons('*'))} className='text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>*</button>

                                <button onClick={() => dispatch(loadButtons('.'))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>.</button>
                                <button onClick={() => dispatch(loadButtons(0))} className='text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow'>0</button>
                                <button onClick={handleAnswer} className='text-gray  bg-white w-42 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow col-span-2'>=</button>

                            </div>

                        </div>

                    </Grid>
                    <Grid xs={6} sm={6}>

                        <div className="bg-slate-200 w-auto h-screen mx-auto rounded-lg overflow-hidden mt-5 mr-10">
                            <div className="text-slate-900 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                                <p>KẾT QUẢ</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-10 mx-3">
                                Phép tính
                            </div>
                        </div>

                    </Grid>
                </Grid>


            </React.Fragment>
        </div>
    )
}

export default Calculator