import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { addCongThuc } from "../../redux-toolkit/calculatorSlice";

const Modal = ({ open = false, handleClose = () => {}, data }) => {
   const dispatch = useDispatch();
   if (typeof document === "undefined") return <div></div>;
   const handleSubmit = (e) => {
      e.preventDefault();
      const res = { ten: e.target[0].value, congthuc: e.target[1].value };

      dispatch(addCongThuc(res));
      
      e.target[0].value = "";
      handleClose();
   };
   return ReactDOM.createPortal(
      <div
         className={`modal inset-0 z-50 flex fixed items-center justify-center p-5 ${
            open ? "" : "opacity-0 invisible"
         }`}
      >
         <div
            className="overlay absolute inset-0 bg-black bg-opacity-25"
            onClick={handleClose}
         ></div>
         <div className="relative w-full z-10 p-10 bg-white rounded-lg modal-content max-w-[482px]">
            {/* <span
               className="absolute top-0 right-0 cursor-pointer"
               onClick={handleClose}
            >
               Close
            </span> */}

            <button
               class="rounded-full hover:text-gray-500 font-bold p-1 absolute top-0 right-0 cursor-pointer"
               onClick={handleClose}
            >
               <svg
                  class="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M6 18L18 6M6 6l12 12"
                  />
               </svg>
            </button>
            <h2 className="text-4xl text-center text-black font-medium mb-5">
               Thêm công thức
            </h2>
            <form onSubmit={handleSubmit}>
               <div className="flex flex-col gap-3 mb-5">
                  <label htmlFor="" className="text-sm cursor-pointer">
                     Tên
                  </label>
                  <input
                     type="text"
                     name="tencongthuc"
                     className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4"
                     placeholder="Nhập tên công thức"
                  />
               </div>
               <div className="flex flex-col gap-3 mb-5">
                  <label htmlFor="" className="text-sm cursor-pointer">
                     Công thức
                  </label>
                  <input
                     type="text"
                     name="congthuc"
                     disabled
                     className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4 cursor-not-allowed"
                     value={data}
                  />
               </div>
               <button
                  type="submit"
                  className="w-full p-4 font-semibold text-base text-white bg-[#28a745] rounded-lg"
               >
                  Thêm
               </button>
            </form>
         </div>
      </div>,
      document.querySelector("body")
   );
};

export default Modal;
