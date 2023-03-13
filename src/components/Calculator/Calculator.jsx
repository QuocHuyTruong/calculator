import React, { useState } from "react";
import { Grid } from "@mui/material";

const Calculator = () => {
  const [value, setValue] = useState({
    number: "",
    ans: "",
  });

  const [history, setHistory] = useState([]);

  const handleLoadButton = (val) => {
    setValue({
      ...value,
      number: value.number.concat(val),
    });
  };

  const handleLoadBackSpace = () => {
    setValue({
      ...value,
      number: value.number.slice(0, -1),
    });
  };

  const handLoadAnswer = () => {
    try {
      setValue({
        ...value,
        // eslint-disable-next-line no-eval
        ans: eval(value.number),
      });
      setHistory([...history, value]);
    } catch (error) {
      setValue({
        ...value,
        // eslint-disable-next-line no-eval
        ans: "Error",
      });
    }
  };
  const handleClear = () => {
    setValue({
      number: "",
      ans: "",
    });
  };
  return (
    <div>
      <React.Fragment>
        <Grid container>
          <Grid sm={6}>
            <div className="bg-green-900 w-96 h-screen mx-auto rounded-lg overflow-hidden mt-5">
              <div className="text-gray-200 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                <p>CALCULATOR APP</p>
              </div>

              <div className=" h-36 ">
                <input
                  type="text"
                  placeholder="0"
                  value={value.number}
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
                  className="text-gray  bg-white w-20 h-40 rounded-lg font-bold text-3xl flex justify-center items-center shadow row-span-2"
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
                  onClick={() => handleLoadButton("-")}
                  className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                >
                  -
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
                  onClick={() => handleLoadButton("*")}
                  className="text-gray  bg-white w-20 h-20 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                >
                  *
                </button>

                <button
                  onClick={() => handleLoadButton(".")}
                  className="text-white w-20 h-20 bg-indigo-500 rounded-lg font-bold text-3xl flex justify-center items-center shadow"
                >
                  .
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
          <Grid sm={6}>
            <div className="bg-slate-200 w-auto h-screen mx-auto rounded-lg overflow-hidden mt-5 mr-10">
              <div className="text-slate-900 w-full font-bold text-3xl h-16 flex items-center space-x-2 pl-2">
                <p>Lịch sử tính toán</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-10 mx-3">
                {history.map((item) => console.log(item))}
              </div>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
};

export default Calculator;
