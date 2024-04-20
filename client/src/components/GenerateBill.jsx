import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { privateKeyToAccount } from "viem/accounts";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from '@ethsign/sp-sdk';
import "./GenerateBill.css";

function GenerateBill() {
  const [productInfo, setProductInfo] = useState("");
  const [customerAddr, setCustomerAddr] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [warranty, setWarranty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrderAttestation();
    toast("Order Created !", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "coloured",
    });
    setCustomerAddr("");
    setProductInfo("");
    setSelectedDate("");
    setWarranty("");
  };

  const privateKey = import.meta.env.VITE_SEPOLIA_PRIVATE_KEY;

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    account: privateKeyToAccount(privateKey),
  });

  async function createOrderAttestation() {
    // eslint-disable-next-line no-unused-vars
    const res = await client.createAttestation({
      schemaId: "0x16",
      data: {
        productDetails: productInfo,
        signer: customerAddr,
        isWarrantyActive: true,
        purchaseDate: selectedDate,
        warrantyPeriodInMonths: warranty,
      },
      indexingValue: customerAddr.toLowerCase(),
    });
  }

  return (
    <div className="home2 w-full p-2 mt-[7vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0 }}
        className="contact flex items-center justify-center"
      >
        <form className="form p-4" onSubmit={handleSubmit}>
          <h1>Bill Details</h1>
          <input
            required
            type="text"
            placeholder="Customer Wallet Address"
            value={customerAddr}
            onChange={(e) => {
              setCustomerAddr(e.target.value);
            }}
            className="wallet-address"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            className="date"
          ></input>

          <input
            type="number"
            placeholder="Warranty (Months)"
            value={warranty}
            onChange={(e) => {
              setWarranty(e.target.value);
            }}
            className="warranty"
          ></input>

          <textarea
            maxLength={400}
            required
            placeholder="Product Details (Max 400 Characters)"
            value={productInfo}
            onChange={(e) => {
              setProductInfo(e.target.value);
            }}
            className="message-box field"
          ></textarea>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </motion.div>
      <ToastContainer toastStyle={{backgroundColor:"#f0972d" , color:'#003142'}}/>
    </div>
  );
}

export default GenerateBill;
