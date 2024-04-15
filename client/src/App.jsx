import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import "./App.css";
function App() {

  const { address } = useAccount();

  return (
      <div className="App w-screen h-screen flex justify-center items-center">
      <div className="wallet-connect-btn">
        <ConnectKitButton />
      </div>
        <p className="text-red-500">Hello {address}</p>
      </div>
  );
}

export default App;
