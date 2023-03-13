import { useRef, useState } from "react";
import Modal from "./components/modal/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const data = useRef("");

  const handleModal = (text) => {
    data.current = text;
    setShowModal(true);
  };
  return (
    <div>
      <Modal
        open={showModal}
        handleClose={() => setShowModal(false)}
        data={data.current}
      ></Modal>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto mollitia
      sint suscipit provident. Nulla cum hic quibusdam dolore aperiam recusandae
      repellat voluptatum qui quas minima dolores facere, iste dolor magni!
      <button
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
      </button>
    </div>
  );
}

export default App;
