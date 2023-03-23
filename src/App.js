import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import TreeCustomV2 from "./components/TreeCustomV2";
function App() {
  const cal = useSelector((state) => state.calculator);
  console.log("🚀 ~ file: App.js:5 ~ App ~ cal:", cal);
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-32"
        } duration-300 p-4 pt-8 h-screen bg-slate-800 relative`}
      >
        <div className="flex gap-x-4 items-center">
          <UnorderedListOutlined
            onClick={() => setOpen(!open)}
            className={`text-white cursor-pointer duration-500 font-medium text-xl  ${
              !open && "rotate-180"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Slidebar
          </h1>
        </div>

        <TreeCustomV2
          className={`mt-6 overflow-auto overflow-x-hidden h-[85vh] ${
            !open && "scale-0"
          }`}
        />
      </div>

      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home page</h1>
      </div>
    </div>
  );
}

export default App;
