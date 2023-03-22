import { useSelector } from "react-redux";
import Calculator from "./components/Calculator";
import TreeCustom from "./components/TreeCustom";
function App() {
  const cal = useSelector((state) => state.calculator);
  console.log("🚀 ~ file: App.js:5 ~ App ~ cal:", cal);
  return (
    <div>
      <TreeCustom></TreeCustom>
    </div>
  );
}

export default App;
