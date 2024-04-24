import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    const response = await fetch("https://hostel-management-seven.vercel.app/api/suggestion/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({student: student._id, hostel: student.hostel, title, description: desc}),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Suggestion registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
        setTitle("");
        setDesc("");
    } else {
      toast.error("Suggestion registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    }
  };



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const suggestionTitle = {
    name: "suggestion title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  return (
    <div className="w-full  min-h-[91vh] flex flex-col gap-10 items-center justify-center overflow-y-auto pt-10 px-2">
      <h1 className="text-white font-bold text-3xl lg:text-5xl">Suggestions</h1>
      <form
        method="POST"
        onSubmit={registerSuggestions}
        className="lg:w-[30vw] w-full py-5 pb-7 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <Input field={suggestionTitle} />
        <div>
          <label
            htmlFor="suggestion"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your suggestion description
          </label>
          <textarea
            name="suggestion"
            placeholder="Suggestions..."
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-[#9F6BA0] focus:border-[#9F6BA0] outline-none"
            onChange={descChange}
            value={desc}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-[#9F6BA0] hover:bg-[#825882] focus:ring-4 focus:outline-none focus:ring-[#825882] text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
          >
            Make Suggestion
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
