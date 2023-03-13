import { useRef, useState } from "react";
import Calculator from "./components/Calculator/Calculator";
import Modal from "./components/modal/Modal";

function App() {
  // const [showModal, setShowModal] = useState(false);
  // const data = useRef("");

  // const handleModal = (text) => {
  //   data.current = text;
  //   setShowModal(true);
  // };
  return (
    <div>
      {/* <Modal
        open={showModal}
        handleClose={() => setShowModal(false)}
        data={data.current}
      ></Modal> */}
      {/* <button
        onClick={() => handleModal("df")}
        className="p-4 text-white bg-blue-300 rounded-lg"
      >
        Show
      </button>
      <button
        onClick={() => handleModal("dsafg")}
        className="p-4 text-white bg-blue-300 rounded-lg"
      >
        Show
      </button>
      <button
        onClick={() => handleModal("sardtryuioopouytrew")}
        className="p-4 text-white bg-blue-300 rounded-lg"
      >
        Show
      </button> */}
      <Calculator></Calculator>
    </div>
  );
}

export default App;
