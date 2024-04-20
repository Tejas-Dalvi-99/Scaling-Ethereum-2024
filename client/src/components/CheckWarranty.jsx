import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import { decodeAbiParameters } from "viem";
import './CheckWarranty.css';

function CheckWarranty() {
  const [customerAddr, setCustomerAddr] = useState("");
  const [attesterAddr, setAttesterAddr] = useState("");
  const [attestations, setAttestations] = useState("");
  const endpoint = import.meta.env.VITE_ENDPOINT

  const handleSubmit =async (e) => {
    e.preventDefault();
    // alert("Customer: "+customerAddr+" Attester: "+attesterAddr);
    await queryAttestations();
    // console.log("state : ",attestations);
    // setCustomerAddr("");
    // setAttesterAddr("");
  };

  async function makeAttestationRequest(endpoint, options) {
    const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
    const res = await axios.request({
      url,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      ...options
    });
    // throw API errors
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res));
    }
    // return original response
    return res.data;
}

async function queryAttestations() {
    try {
        const response = await makeAttestationRequest(
            "index/attestations",
            {
                method: "GET",
                params: {
                    mode: "onchain",
                    schemaId: endpoint,
                    attester: attesterAddr, 
                    indexingValue: customerAddr.toLowerCase(),
                }
            }
        );

        console.log(response)
        setAttestations(response.data.total)

        // Make sure the request was successfully processed.
        if (!response.success) {
            return { success: false, message: response?.message ?? "Attestation query failed." };
        }

        // Return a message if no attestations are found.
        if (response.data?.total === 0) {
            return { success: false, message: "No attestation for this address found." };
        }

        // Return all attestations that match our query.
        return {
            success: true,
            attestations: response.data.rows
        };
    } catch (error) {
        return { success: false, message: error.message ?? "An error occurred during attestation query." };
    }
}



// function findAttestation(message, attestations) {
//     // Iterate through the list of attestations
//     for (const att of attestations) {
//         if (!att.data) continue;

//         let parsedData = {};

//         // Parse the data.
//         if (att.mode === "onchain") {
//             // Looking for nested items in the on-chain schema
//             try {
//                 const data = decodeAbiParameters(
//                     [att.dataLocation === "onchain" ? { components: att.schema.data, type: "tuple" } : { type: "string" }],
//                     att.data
//                 );
//                 parsedData = data[0];
//             } catch (error) {
//                 // Looking for a regular schema format if the nested parse fails
//                 try {
//                     const data = decodeAbiParameters(
//                         att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
//                         att.data
//                     );
//                     const obj = {};
//                     data.forEach((item, i) => {
//                         obj[att.schema.data[i].name] = item;
//                     });
//                     parsedData = obj;
//                 } catch (error) {
//                     continue;
//                 }
//             }
//         } else {
//             // Try parsing as a string (off-chain attestation)
//             try {
//                 parsedData = JSON.parse(att.data);
//             } catch (error) {
//                 console.log(error);
//                 continue;
//             }
//         }

//         // Return the correct attestation and its parsed data.
//         if (parsedData?.contractDetails === message) {
//             return { parsedData, attestation: att };
//         }
//     }

//     // Did not find the attestation we are looking for.
//     return undefined;
// }


  return (
    <div className="home2 w-full p-2 mt-[7vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0 }}
        className="contact flex items-center justify-center"
      >
        <form className="form1 p-4" onSubmit={handleSubmit}>
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
            Check
          </button>
        </form>
      </motion.div>
      <h1 className="orderh1 absolute top-[10vw] text-3xl text-[#f0972d]">{attestations===0 ? "No Orders Found" : attestations && `${attestations} Orders found`}</h1>
    </div>
  )
}

export default CheckWarranty