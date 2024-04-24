import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";
import heroImg from "../../../assets/home.png"
function HeroSection() {
  return (
    <main className=" min-h-[82vh] py-5 flex flex-col lg:flex-row-reverse justify-center lg:justify-around align-center  text-white text-center">
      {/* <img src={heroImg} alt='nust-hostel-img' className='opacity-[0.05] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] select-none' /> */}
      <div className=" w-[90%] md:w-[70%] px-5 md:pl-40 animate-pulse lg:w-[30%] lg:p-0">
        {/* <HeroSVG /> */}
        <img  className= "pt-5"  src={heroImg} alt="" />
      </div>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-3xl md:text-6xl">
          Hostel <span className="text-[#9F6BA0]">Management</span>  <br/>System
        </h1>
        <p className="py-10 text-xl md:text-2xl">
          One Solution For All The Hostel&apos;s Needs
        </p>
        <div className="md:py-20 py-3">
          <Link
            to="/auth/login"
            className="bg-[#9F6BA0] md:py-3 py-1 md:px-40 px-12 hover:bg-[#825882] transition rounded md:text-2xl text-xl"
          >
            Login
          </Link>
          {/* <p className="mt-6 mb-3">OR</p>
          <Link
            to="/auth/request"
            className="text-xl hover:underline hover:text-blue-500"
          >
            Request Registration
          </Link> */}
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
