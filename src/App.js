import { useSelector } from "react-redux";
import Calculator from "./components/Calculator";
function App() {
  const cal = useSelector((state) => state.calculator);
  console.log("🚀 ~ file: App.js:5 ~ App ~ cal:", cal);
  return (
    <div>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
