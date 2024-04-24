import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";
import ForgotPassword from "./ForgotPass";

export default function SignIn() {
  let navigate = useNavigate();

  if (localStorage.getItem("token")) {
    verifysession();
  }


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
   
    console.log("in",open)
    setOpen(true);
    console.log("la",open)
};

  const getHostel = async () => {
    let warden = JSON.parse(localStorage.getItem("warden"));
    try {
      const res = await fetch("http://localhost:3000/api/warden/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: warden._id })
      });

      const data = await res.json();
      console.log(data);
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {
      console.log(err);
    }
  };
  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: email,
      password: pass,
    };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      if(result.data.user.isAdmin==='student')
      {
        let student = await fetch("http://localhost:3000/api/student/get-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: result.data.user.isAdmin,
          token: result.data.token})
      });

      let studentResult = await student.json();
      console.log(studentResult);
      if (studentResult.success) {
        localStorage.setItem("student", JSON.stringify(studentResult.student));
        navigate("/student-dashboard");
      } else {
        console.log(studentResult.errors)
      }
      }
      else if(result.data.user.isAdmin==='warden')
      {
        let warden = await fetch("http://localhost:3000/api/warden/get-warden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: result.data.user.isAdmin,
          token: result.data.token
        })
      });

      let wardenResult = await warden.json();
      console.log(wardenResult);
      if (wardenResult.success) {
        localStorage.setItem("warden", JSON.stringify(wardenResult.warden));
        const hostel = await getHostel();
        navigate("/warden-dashboard");
      }
    } }else {
      // alert(result.errors[0].msg);
      toast.error(
        result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoader(false);
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false)

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "abc@gmail.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <>
    {open && <ForgotPassword handleClose={handleClose}/>   }
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                     

         
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <button
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#9F6BA0] hover:bg-[#825882] focus:ring-[#825882]"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="font-medium hover:underline text-[#9F6BA0] cursor-pointer" onClick={handleOpen}>Forgot Password</p>
          <p className="text-sm font-medium text-gray-400">
            Don’t have an account yet?{" "} 
            <Link
              to="/contact"
              className="font-medium hover:underline text-[#9F6BA0]"
            >
              Contact your administration
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}

