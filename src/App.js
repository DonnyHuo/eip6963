import { useEffect, useState } from "react";
import "./App.css";
import { Web3 } from "web3";

function App() {
  const [providers, setProviders] = useState([]);
  const [account, setAccount] = useState("");

  const getProviders = async () => {
    let providers = await Web3.requestEIP6963Providers();
    const newProviders = Array.from(providers).map((list) => list[1]);
    console.log("providers", newProviders);
    setProviders(newProviders);
  };
  useEffect(() => {
    window.ethereum && getProviders();
  }, []);

  const connectWallet = async (provider) => {
    console.log("provider", provider);
    const account = await provider.request({ method: "eth_requestAccounts" });
    setAccount(account);
    console.log("account", account);
  };

  const [showWallet, setShowWallet] = useState(false);

  return (
    <div className="text-center">
      <div>
        {!!account ? (
          <div>
            <span>{account}</span>
            <button
              className="border p-2 rounded-xl"
              onClick={() => setAccount("")}
            >
              disconnect
            </button>
          </div>
        ) : (
          <button
            className="border p-2 rounded-lg"
            onClick={() => setShowWallet(true)}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {showWallet && !account && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex items-center justify-center">
          <div className="flex flex-col items-center border bg-white rounded-lg p-5 pt-3">
            <div className="w-full flex items-center justify-between mb-4">
              <span>Connect Wallet</span>
              <button class="close" onClick={()=>setShowWallet(false)}>&#xe617;</button>
            </div>
            {providers.map((list, index) => {
              return (
                <button
                  className="w-64 border flex items-center rounded-lg px-5 py-2 mt-2"
                  onClick={() => connectWallet(list.provider)}
                  key={index}
                >
                  <img className="w-8 mr-4" src={list.info.icon} alt="" />
                  {list.info.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
