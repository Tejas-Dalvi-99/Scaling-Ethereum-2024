import './Home1.css'
import gpu from '../assets/gpu.png';
import { motion } from "framer-motion";

function Home1() {
  return (
    <div className="w-full flex justify-center items-center p-2 mt-[7vh] gap-10">
      <div className="w-[45%] h-[35vw] flex items-center justify-center">
        <h1 className="heading-text dotBig"><span className='heading-span'>Every Part</span><br></br>ATTESTED</h1>
      </div>

      <div 
      className="w-[30%] h-[10vw]">
        <motion.img
        whileHover={{ rotate: [0, 5 ],}}
        transition={{ ease:'easeInOut', duration: 0.5,}}
          className="img object-cover size-full"
          src={gpu}
        ></motion.img>
      </div>
    </div>
  );
}

export default Home1;
