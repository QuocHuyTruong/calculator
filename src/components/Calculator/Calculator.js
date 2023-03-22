import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../../redux-toolkit/historySlice";

const Calculator = () => {
   const dispatch = useDispatch();
   const history = useSelector((state) => state.history);
   const calculator = useSelector((state) => state.calculator);
   const [valueParam, setValueParam] = useState("");
   const [value, setValue] = useState({
      number: "",
      ans: "",
   });
   const [showModal, setShowModal] = useState(false);
   const data = useRef("");
   // const [history, setHistory] = useState([]);
   const handLoadAnswer = () => {
      try {
         // eslint-disable-next-line no-eval
         const result = eval(value.number);
         setValue({
            ...value,
            // eslint-disable-next-line no-eval
            ans: result,
         });
         // setHistory([...history, { number: value.number, ans: result }]);
         dispatch(addHistory({ number: value.number, ans: result }));
      } catch (error) {
         setValue({
            ...value,
            // eslint-disable-next-line no-eval
            ans: "Error",
         });
      }
   };
   const handleLoadButton = (val) => {
      if (val === "+" || val === "-" || val === "*" || val === "/") {
         if (
            value.number.slice(-1) === "+" ||
            value.number.slice(-1) === "-" ||
            value.number.slice(-1) === "*" ||
            value.number.slice(-1) === "/"
         ) {
         } else {
            setValue({
               ...value,
               number: value.number.concat(val),
            });
         }
      } else {
         setValue({
            ...value,
            number: value.number.concat(val),
         });
      }
   };

   const handleLoadBackSpace = () => {
      setValue({
         ...value,
         number: value.number.slice(0, -1),
      });
   };

   const handleClear = () => {
      setValue({
         number: "",
         ans: "",
      });
   };
   const handleModal = (text) => {
      data.current = text;
      setShowModal(true);
   };

   const handleOnchange = (e) => {
      console.log(e.target.value);
      setValue({
         number: e.target.value,
      });
   };

   const handleSelecter = (e) => {
      console.log(e.target.value);
      // setValue({
      //   number: value.number.concat(e.target.value),
      // });
      setValueParam(e.target.value);
   };

   const handleChangeParam = (e) => {
      setValueParam(e.target.value);
   };

   const handleParam = () => {
      // setValue({
      //   number: value.number.concat(valueParam),
      // });
      if (valueParam.slice(-1) === "+" || valueParam.slice(-1) === "-") {
         setValue({
            number: value.number.concat(valueParam).concat("0"),
         });
      } else if (valueParam.slice(-1) === "*" || valueParam.slice(-1) === "/") {
         setValue({
            number: value.number.concat(valueParam).concat("1"),
         });
      } else {
         setValue({
            number: value.number.concat(valueParam),
         });
      }
   };
   return (
      <div>
         <Modal
            open={showModal}
            handleClose={() => setShowModal(false)}
            data={data.current}
         ></Modal>
         <React.Fragment>
            <Grid container className="justify-center">
               <Grid sm={3} className="ml-4 mt-5">
                  <label
                     for="years"
                     className="block mb-2 text-3xl font-medium text-gray-900 "
                  >
                     Danh sách công thức
                  </label>
                  <select
                     onClick={handleSelecter}
                     id="years"
                     size="5"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  >
                     {calculator.map((item, index) => (
                        <option value={item.congthuc} key={index}>
                           {item.ten} {"(" + item.congthuc + ")"}
                        </option>
                     ))}
                  </select>
                  <label className="block mb-2 text-3xl font-medium text-gray-900 mt-5">
                     Nhập param
                  </label>
                  <input
                     value={valueParam}
                     onChange={handleChangeParam}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  />
               </Grid>
               <Grid sm={4}>
                  <div className="bg-green-900 w-96 h-screen mx-auto rounded-lg overflow-hidden mt-5">
                     <div className="text-gray-200 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                        <p>CALCULATOR APP</p>
                     </div>

                     <div className=" h-36 ">
                        <input
                           type="text"
                           placeholder="0"
                           value={value.number}
                           onChange={handleOnchange}
                           className=" w-full h-3/6 border border-white bg-white text-gray-900 text-4xl text-right pr-5 "
                        />
                        <p className=" w-full h-3/6 border border-white bg-white text-gray-900 text-4xl text-right pr-5 ">
                           {value.ans}
                        </p>
                     </div>

                     {/* keypad */}
                     <div className="grid grid-cols-4 gap-2 mt-10 mx-3">
                        <button
                           onClick={handleClear}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           AC
                        </button>
                        <button
                           onClick={handleLoadBackSpace}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           C
                        </button>
                        <button
                           onClick={() => handleLoadButton("/")}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           /
                        </button>
                        <button
                           onClick={() => handleLoadButton("+")}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           +
                        </button>

                        <button
                           onClick={() => handleLoadButton(7)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           7
                        </button>
                        <button
                           onClick={() => handleLoadButton(8)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           8
                        </button>
                        <button
                           onClick={() => handleLoadButton(9)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           9
                        </button>
                        <button
                           onClick={() => handleLoadButton("-")}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           -
                        </button>

                        <button
                           onClick={() => handleLoadButton(4)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           4
                        </button>
                        <button
                           onClick={() => handleLoadButton(5)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           5
                        </button>
                        <button
                           onClick={() => handleLoadButton(6)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           6
                        </button>
                        <button
                           onClick={() => handleLoadButton("*")}
                           className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           *
                        </button>

                        <button
                           onClick={() => handleLoadButton(1)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           1
                        </button>
                        <button
                           onClick={() => handleLoadButton(2)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           2
                        </button>
                        <button
                           onClick={() => handleLoadButton(3)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           3
                        </button>

                        <button
                           onClick={() => handleLoadButton(".")}
                           className="text-gray w-20 h-20 bg-white rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           .
                        </button>
                        <button
                           onClick={handleParam}
                           className="text-gray  bg-indigo-500 w-20 h-20 rounded-lg font-bold text-sm flex justify-center items-center shadow"
                        >
                           Giá trị Param
                        </button>
                        <button
                           onClick={() => handleLoadButton(0)}
                           className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                        >
                           0
                        </button>
                        <button
                           onClick={handLoadAnswer}
                           className="text-gray  bg-white w-42 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow col-span-2"
                        >
                           =
                        </button>
                     </div>
                  </div>
               </Grid>
               <Grid sm={4}>
                  <div className="bg-slate-200 w-auto h-screen mx-auto rounded-lg overflow-hidden mt-5 mr-10">
                     <div className="text-slate-900 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                        <p>Lịch sử tính toán</p>
                     </div>
                     <div className="gap-2 mt-10 mx-3 ">
                        {history.map((item, index) => (
                           <div
                              key={index}
                              className="mb-2 w-[70%] flex justify-between "
                           >
                              <span className="mr-2">
                                 {item.number + "=" + item.ans}
                              </span>
                              <button
                                 onClick={() => handleModal(item.number)}
                                 className="text-white bg-blue-300 rounded-lg p-1"
                              >
                                 Thêm công thức
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               </Grid>
            </Grid>
         </React.Fragment>
      </div>
   );
};

export default Calculator;
