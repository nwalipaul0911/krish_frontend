import "./fallback.css";
import { motion } from "framer-motion";
import brand_logo from "../assets/images/krish_logo-removebg-preview.png";
const Fallback = () => {
  return (
    <div className="fallback-grid">
      <div className="col-4">
        <motion.img animate={{scale : [0.7, 1, 0.7]}} transition={{duration: 3}} src={brand_logo} alt="" className="img-fluid" />
      </div>
    </div>
  );
};

export default Fallback;
