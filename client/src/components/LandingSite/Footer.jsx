import { Link } from "react-router-dom"
import { FaLinkedin } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
function Footer() {
    return (
        <div className="w-full border-t-2 text-gray-500 flex flex-col md:flex-row justify-between items-center border-t-[#9F6BA0] py-4 md:py-8 px-6 md:px-8 gap-4">
            <p className="text-sm md:text-base ">Copyright @<span className="text-[#9F6BA0]">HMS</span> </p>
            <div className="flex flex-col justify-center items-center">
            <p className="text-sm md:text-base">Connect with us</p>
            <div className="md:flex gap-4 hidden">
            <IconContext.Provider value={{ color: "#9F6BA0", size:"2rem" }}>
            <a href="https://linkedin.com/in/priyanshi-dhanuka-551497227/" target="_blank" rel="noreferrer"><FaLinkedin/></a>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#9F6BA0", size:"2rem" }}>
            <a href="mailto:priyanshidhanuka9@gmail.com"><SiGmail/></a>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#9F6BA0", size:"2rem" }}>
            <FaTwitter/>
            </IconContext.Provider>
            </div>
            <div className="flex gap-4 md:hidden">
            <IconContext.Provider value={{ color: "#9F6BA0", size:"1rem" }}>
            <FaLinkedin/>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#9F6BA0", size:"1rem" }}>
            <SiGmail/>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#9F6BA0", size:"1rem" }}>
            <FaTwitter/>
            </IconContext.Provider>
            </div>
            </div>
            <div
            className={`md:gap-10 gap-4 pt-2 md:pt-0 flex`}>
            <Link
          to="/contact"
          className="text-sm md:text-base md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-sm md:text-base md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          About Us
        </Link>
            </div>
            
        </div>
    )
}
export {Footer}
