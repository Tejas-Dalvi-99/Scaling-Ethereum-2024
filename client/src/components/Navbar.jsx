import "./Navbar.css";
import { ConnectKitButton } from "connectkit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigateTo = useNavigate();
  return (
    <div className="nav">
      <div className="logo">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
        >
          PartSign
        </motion.h1>
      </div>
      <div className="page-links">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
          className="link dotBig"
          onClick={() => navigateTo("/")}
        >
          Home1
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5, times: [0.1] }}
          className="link dotBig"
          onClick={() => navigateTo("/home2")}
        >
          Home2
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5, times: [0.3] }}
          className="link dotBig"
          onClick={() => navigateTo("/home3")}
        >
          Home3
        </motion.p>
      </div>
      <div className="connect-wallet-btn">
        <ConnectKitButton />
      </div>
    </div>
  );
}

export default Navbar;
