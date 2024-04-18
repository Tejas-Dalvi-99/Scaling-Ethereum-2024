import { useAccount } from "wagmi";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";
import Home3 from "./components/Home3";
import Cursor from "./components/Cursor";
function App() {

  const { address } = useAccount();

  return (
    <>
      <Navbar/>
      <div className="App w-screen h-screen flex justify-center items-center">
      <Routes>
            <Route path="/" element={<Home1 address={address} />} />
            <Route path="/home2" element={<Home2 address={address} />} />
            <Route path="/home3" element={<Home3 address={address}/>} />
        </Routes>
      </div>
      <Cursor/>
    </>
  );
}

export default App;
