import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <nav className="flex align-center justify-between md:p-10 p-7 text-white md:px-20">
      <Link to="/" className="flex z-10 md:py-3 font-bold text-xl lg:text-4xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 lg:w-10 lg:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
        &nbsp; HMS
      </Link>
      <div
        className={` hidden gap-10 md:flex`}
      >
        <Link
          to="/about"
          className="md:py-3 md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="md:py-3 md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          Contact
        </Link>
        <Link
          to="/auth/login"
          className={`md:bg-[#9F6BA0] md:hover:bg-[#825882] transition md:text-white font-bold md:text-lg md:py-3 md:mb-3 md:px-8 md:rounded ${
            menuOpen ? "text-[#9F6BA0]" : ""
          }`}
        >
          Login
        </Link>
      </div>
    


       <div className={`${(menuOpen)? "":"hidden"}  md:hidden  flex flex-col px-4 py-5 justify-center space-y-3 w-[300px] h-[200px] absolute z-40 bg-black  right-5 rounded-xl top-[100px]`}>
       
       <Link
          to="/"
          className="py-1 md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          Home
        </Link>

       <Link
          to="/about"
          className=" py-1 md:hover:text-[#9F6BA0] transition-all ease-linear"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="py-1  transition-all ease-linear"
        >
          Contact
        </Link>
        <Link
          to="/auth/login"
          className={`font-bold  
          text-[#9F6BA0]
          py-1
          `}
        >
          Login
        </Link>
       </div>
    
    
      <div
        className="md:hidden z-10 py-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </nav>
  );
}
export { Navbar };
