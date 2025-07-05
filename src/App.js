import Upload from './artifacts/contracts/up.sol/Upload.json'
import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
import { BrowserProvider, Contract } from 'ethers';
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  const [contract ,setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen]= useState(false);
  useEffect(
    ()=>{
      const provider = new BrowserProvider(window.ethereum);
      const loadProvider = async()=>{
        if(provider)
        {
            window.ethereum.on("chainChanged", () => {
            window.location.reload();
            });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
            });
          await provider.send("eth_requestAccounts",[]);
          const signer = await provider.getSigner();
          const address = signer.address;
          setAccount(address);
          setProvider(provider);
          let contractAdddress = "0x98D415593335b5F67CA1B82f8db1eaD30Ff16B20";
          const contract = new Contract(contractAdddress,Upload.abi,signer);
          setContract(contract);
          
        }
        else{
          console.error("Error");
        }
      }
      provider && loadProvider();
    }
  ,[])
  return (
    <>
    {!modalOpen && (<button className="share" onClick={()=>{setModalOpen(true)}}>Share</button>)}
    {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
    <div className="App">
      <h1>Decentralized Drive</h1>
      <div className='bg'></div>
      <div className='bg'></div>
      <div className='bg'></div>
      <p>Account: {account?account:"account not connected"}</p>
      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
      <Display contract={contract} account={account}></Display>
    </div>
    </>
  );
}

export default App;
