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
        <span
          className="absolute top-0 right-0 cursor-pointer"
          onClick={handleClose}
        >
          Close
        </span>
        <h2 className="text-4xl text-center text-black font-medium mb-5">
          Them cong thuc
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="" className="text-sm cursor-pointer">
              Ten
            </label>
            <input
              type="text"
              name="tencongthuc"
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
            Them
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Modal;
