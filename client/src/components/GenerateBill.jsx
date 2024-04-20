import { useState } from "react";
import { motion } from "framer-motion";
// import { privateKeyToAccount } from 'viem/accounts';
// import { SignClient } from '@ethsign/sign-sdk';
import "./GenerateBill.css";

function GenerateBill() {
  const [productInfo, setProductInfo] = useState();
  const [customerAddr, setCustomerAddr] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [warranty, setWarranty] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // createOrderAttestation();
    // alert("Date : "+selectedDate+" Address: "+customerAddr+" warranty: "+warranty+" Product: "+productInfo);
    setCustomerAddr("");
    setProductInfo("");
    setSelectedDate("");
    setWarranty("");
  };

  const privateKey = import.meta.env.VITE_SEPOLIA_PRIVATE_KEY;

//   const client = new SignClient({
//   account: privateKeyToAccount(privateKey),
// });

  // async function createOrderAttestation() {
  //   const res = await client.createAttestation({
  //     schemaId: "0x16",
  //     data: {
  //       productDetails: productInfo,
  //       signer: customerAddr,
  //       isWarrantyActive: true,
  //       purchaseDate: selectedDate,
  //       warrantyPeriodInMonths: warranty
  //     },
  //     indexingValue: customerAddr.toLowerCase()
  //   });

  //   console.log(res);
  // }


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
    </div>
  );
}

export default GenerateBill;
