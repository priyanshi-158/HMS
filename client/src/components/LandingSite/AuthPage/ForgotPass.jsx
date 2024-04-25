
import  {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { Button } from "../../Dashboards/Common/PrimaryButton";
import { Input } from "./Input";

ForgotPassword.propTypes={
  handleClose: PropTypes.func
}
function ForgotPassword ({  handleClose }){
  const [email, setemail] = useState("");
const forgotpassword=async ()=>{
  try{
    const res=await fetch("https://hostel-management-seven.vercel.app/api/auth/forgot-password",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email })
    })
    let result=await res.json();
    return result;
  }
  catch(err)
  {
    console.log(err)
  }
}
  async function handlesubmit() {
    try {
      if (email !== "") {
        const res = await forgotpassword();
        if (res.success) {
          toast.success(res.message, {
            position: "bottom-right",
          });
        } else {
          toast.error(res.message, {
            position: "bottom-right",
          });
        }
        setemail("");
      } else {
        toast.error("Please fill required fields", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("something went wrong", {
        position: "top-right",
      });
    }
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full flex items-center justify-center bg-black bg-opacity-75">
    <div className="relative w-full max-h-full ">
      {/* Modal content */}
      <div className="relative w-full rounded-lg shadow bg-gray-700">
        {/* Modal header */}
        <div className="flex w-full items-center justify-center p-4 border-b rounded-t border-gray-600">
          <h3 className="text-xl font-semibold text-white">
            Forgot Password
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={() => handleClose()}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className=" w-full p-10 rounded-lg mb-10 overflow-auto">
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 w-full flex-wrap justify-center">
          <Input
            field={{
              name: "email",
              placeholder: "Student Email",
              type: "email",
              req: true,
              value: email,
              onChange: (e) => setemail(e.target.value),
            }}
          />
          
        </div>
       
        
        <div className="mt-5" onClick={handlesubmit}>
          <Button >
            
              <span>Submit</span>
           
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
  );
}

export default ForgotPassword;