import React from "react";
import ReactDOM from "react-dom";
const Modal = ({ open = false, handleClose = () => {}, data }) => {
  if (typeof document === "undefined") return <div></div>;
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
        <span
          className="absolute top-0 right-0 cursor-pointer"
          onClick={handleClose}
        >
          Close
        </span>
        <h2 className="text-4xl text-center text-black font-medium mb-5">
          Them cong thuc
        </h2>
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="" className="text-sm cursor-pointer">
            Ten
          </label>
          <input
            type="text"
            className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4"
            placeholder="Nhap ten cong thuc"
          />
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="" className="text-sm cursor-pointer">
            Cong thuc
          </label>
          <input
            type="text"
            className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4"
            placeholder={data}
          />
        </div>
        <button className="w-full p-4 font-semibold text-base text-white bg-[#28a745] rounded-lg">
          Them
        </button>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Modal;
