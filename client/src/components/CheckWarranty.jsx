import { useState } from "react";
import { motion } from "framer-motion";

function CheckWarranty() {
  const [customerAddr, setCustomerAddr] = useState();
  const [attesterAddr, setAttesterAddr] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Address: "+customerAddr+" Attester: "+attesterAddr);
    setCustomerAddr("");
    setAttesterAddr("");
  };

  return (
    <div className="home2 w-full p-2 mt-[7vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0 }}
        className="contact flex items-center justify-center"
      >
        <form className="form p-4" onSubmit={handleSubmit}>
          <h1>Warranty Check</h1>
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
            required
            type="text"
            placeholder="Attester Wallet Address"
            value={attesterAddr}
            onChange={(e) => {
              setAttesterAddr(e.target.value);
            }}
            className="wallet-address"
          />

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default CheckWarranty