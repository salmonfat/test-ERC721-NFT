import { useState, useEffect } from 'react';
import { ethers, utils } from "ethers";
import abi from "./contract/testERC721NFT.json";

function App() {
  const contractAddress='0x0fBfd9a0bE050124AFD4Ae463e6d7Ad5D00a19bc';
  const contractABI=abi.abi;
  const artiseWallet="0xa1a7ad6576be32e350122309e8097605595a4f87";

  const [isWallectConnect,setWallectConnet]=useState(false);
  const [yourWalletAddress,setYourWalletAddress]=useState(null);
  const [error, setError] = useState(null);

  const checkWalletConnect=async()=>{
    try{
      if (window.ethereum){
      const accounts=await window.ethereum.request({method: 'eth_requestAccounts'})
      const account = accounts[0];
      setWallectConnet(true);
      setYourWalletAddress(account);
      console.log("Account Connected: ", account);
    }else{
      setError("Install a MetaMask wallet.");
      console.log("No Metamask detected");
      }
    }catch(error){
      console.log(error);
    }
  }
  const mintNFT=async(event)=>{
    event.preventDefault();
    try{
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        let priceETH=utils.parseEther("0.1");
        const txn=await Contract.mintNFT({value:priceETH});
        console.log("minting");
        await txn.wait();
        console.log("done",txn.hash);
      }else{
        console.log("Ethereum object not found, install Metamask.");
        setError("Install a MetaMask wallet.");
      }
    }catch(error){
      console.log(error);
    }
  }
  const withdraw=async(event)=>{
    event.preventDefault();
    try{
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);

        const txn=await Contract.withdraw();
        console.log("withdrawing");
        await txn.wait();
        console.log("done",txn.hash);
      }else{
        console.log("Ethereum object not found, install Metamask.");
        setError("Install a MetaMask wallet.");
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    checkWalletConnect();
  }, []);
  return (
    <main>
      {error &&<p>{error}</p>}
      <h2>test ERC721 NFT (On Rinkeby testnet)</h2>
      <p>Please view it on Opensea testnet: </p>
      <p>The contract address: 0x0fBfd9a0bE050124AFD4Ae463e6d7Ad5D00a19bc</p>
      <div>
        {isWallectConnect &&(<p>your address:{yourWalletAddress} </p>)}
        {!isWallectConnect &&(<button onClick={checkWalletConnect}> connect wallet </button>)}
      </div>
      <div>
        <p>maximum supply: 6 </p>
        <button onClick={mintNFT}>mint</button><span>mint price: 0.1 rinkeby ETH</span>
      </div>
      {(artiseWallet==yourWalletAddress)&&(<div>
        <button onClick={withdraw}>withdraw</button>
      </div>)}
    </main>
  );
}
export default App;
