import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import "./App.css";
function App() {

  const { address } = useAccount();

  return (
    <>
    <div className="wallet-connect-btn">
      <ConnectKitButton />
    </div>
      <div className="App">
        <p>Hello {address}</p>
      </div>
    </>
  );
}

export default App;
