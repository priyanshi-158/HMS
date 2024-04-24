import { PropTypes } from "prop-types";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";

Modal2.propTypes = {
  closeModal: PropTypes.func,
  student: PropTypes.object,
};

function Modal2({ closeModal, student }) {
    console.log(student.dob)
  const hostel = JSON.parse(localStorage.getItem("hostel")).name;
  const [roll, setRoll] = useState(student.roll_no);
  const [name, setName] = useState(student.name);
  const [room_no, setRoomNo] = useState(student.room_no);
  const [batch, setBatch] = useState(student.batch);
  const [dept, setDept] = useState(student.dept);
  const [course, setCourse] = useState(student.course);
  const [email, setEmail] = useState(student.email);
  const [fatherName, setFatherName] = useState(student.father_name);
  const [contact, setContact] = useState(student.contact);
  const [address, setAddress] = useState(student.address);
  const [dob, setDob] = useState(new Date(student.dob));
  const [aadhar, setAadhar] = useState(student.aadhar);
  const [loading, setLoading] = useState(false);
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        let updatedstudent = {
            id:student._id,
          name: name,
          roll_no: roll,
          room_no: room_no,
          batch: batch,
          dept: dept,
          course: course,
          email: email,
          father_name: fatherName,
          contact: contact,
          address: address,
          dob: dob,
          aadhar: aadhar,
        };
    const res = await fetch("http://localhost:3000/api/student/update-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedstudent),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(
        'Student updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setRoll("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setAadhar("");
        setLoading(false);
      closeModal();
    } else {
        data.errors.forEach((err) => {
            toast.error(
              err.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            })
          })
          setLoading(false);
    }
}catch (err) {
    console.log(err);
    toast.error(
      err, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }
    )
    setLoading(false);
  }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-h-full ">
        {/* Modal content */}
        <div className="relative w-full rounded-lg shadow bg-gray-700">
          {/* Modal header */}
          <div className="flex w-full items-center justify-center p-4 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Update Student Details
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={() => closeModal()}
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
        <form method="post" onSubmit={updateStudent} className="flex flex-col gap-3">
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Roll No.",
                placeholder: "Student Roll No.",
                type: "number",
                req: true,
                value: roll,
                onChange: (e) => setRoll(e.target.value),
              }}
            />
            {/* <Input
              field={{
                name: "dob",
                placeholder: "Student dob",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            /> */}
            <Input
              field={{
                name: "aadhar",
                placeholder: "Student AAdhar Number",
                type: "text",
                req: true,
                value: aadhar,
                onChange: (e) => setAadhar(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "father_name",
                placeholder: "Student's Father Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>
          <div className="mx-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full lg:w-[80vw] p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-[#9F6BA0] focus:border-[#9F6BA0] outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-5 w-full justify-center">
            <Input
              field={{
                name: "room",
                placeholder: "Student Room",
                type: "number",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
              }}
            />
            <Input
              field={{
                name: "hostel",
                placeholder: "Student Hostel",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
              }}
            />
            <Input
              field={{
                name: "dept",
                placeholder: "Student Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Input
              field={{
                name: "course",
                placeholder: "Student Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
            <Input
              field={{
                name: "batch",
                placeholder: "Student Batch",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Updating...
                </>
              ) : (
                <span>Update Student</span>
              )}
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
        </form>
      </div>
        </div>
      </div>
    </div>
  );
}

export { Modal2 };