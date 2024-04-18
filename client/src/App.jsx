import { useAccount } from "wagmi";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home1 from "./components/Home1";
import GenerateBill from "./components/GenerateBill";
import CheckWarranty from "./components/CheckWarranty";
import Cursor from "./components/Cursor";
function App() {

  const { address } = useAccount();

  return (
    <>
      <Navbar/>
      <div className="App w-screen h-screen flex justify-center items-center">
      <Routes>
            <Route path="/" element={<Home1 address={address} />} />
            <Route path="/generateBill" element={<GenerateBill address={address} />} />
            <Route path="/checkWarranty" element={<CheckWarranty address={address}/>} />
        </Routes>
      </div>
      <Cursor/>
    </>
  );
}

export default App;
