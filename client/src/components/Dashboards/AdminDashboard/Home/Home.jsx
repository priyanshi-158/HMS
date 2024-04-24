import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { List2 } from "./List2";
import { ShortCard1 } from "./ShortCard1";


function Home() {
  const warden = JSON.parse(localStorage.getItem("warden"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));

  const getRequests = async () => {
    
    console.log(hostel);
    const res = await fetch("https://hostel-management-seven.vercel.app/api/leave/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success) {

      setLeaveReqs(data.list);
    }
  };
  const getsuggestions = async () => {
    
    console.log(hostel);
    const res = await fetch("https://hostel-management-seven.vercel.app/api/suggestion/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success) {
      // data.list.map((req) => {
      //   req.id = req._id;
      //   req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
      //   req.to = new Date(req.return_date).toDateString().slice(4, 10);
      //   req._id = req.student._id;
      //   req.student.name = req.student.name;
      //   req.student.room_no = req.student.room_no;
      //   req.status = req.status;
      //   req.title = `${req.student.name} [ Room: ${req.student.room_no}]`,
      //   req.desc = `${req.from} to ${req.to}`
      // });
      setSuggestions(data.suggestions);
    }
  };
  useEffect(()=> {
    getRequests();
    getsuggestions();
  }, [])

  const [leaveReqs, setLeaveReqs] = useState([]);
  console.log(leaveReqs)
  const [suggestions, setSuggestions] = useState([]);

  const messIcon = (
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
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  const suggestionIcon = (
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
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const data = [
    {
      name: "",
      DailyComplaints: 20,
    },
    {
      name: "",
      DailyComplaints: 40,
    },
    {
      name: "",
      DailyComplaints: 15,
    },
    {
      name: "",
      DailyComplaints: 90,
    },
    {
      name: "",
      DailyComplaints: 3,
    },
    {
      name: "",
      DailyComplaints: 50,
    },
    {
      name: "",
      DailyComplaints: 20,
    },
  ];

  const graph = (
    <ResponsiveContainer
      width="100%"
      height="85%"
      className={
        "bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full max-w-[350px] max-h-96"
      }
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          bottom: 15,
          left: -25,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <Legend verticalAlign="top" height={36} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="DailyComplaints"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full min-h-[91vh] flex flex-col gap-3 items-center justify-center  overflow-x-hidden  pt-20 md:pt-4">
      <h1 className="text-white font-bold text-3xl px-2 lg:text-5xl text-center">
        Welcome <span className="text-[#9F6BA0]">{warden.name || "warden"}!</span>
      </h1>
      <h1 className="text-white text-xl">Manager, {hostel.name || "hostel"}</h1>
      <div className="flex w-full gap-5 px-10 md:px-2 pt-5 flex-wrap items-center justify-center">
        <ShortCard1/>
        <ShortCard title="Total Leave Requests" number={leaveReqs.length} />
        <ShortCard title="Total Suggestions" number={suggestions.length} />
      </div>
      <div className="w-full flex gap-5 px-10 md:px-2 h-80 flex-wrap items-center justify-center">
        <List2 list={leaveReqs.length>2?leaveReqs.slice(0,2):leaveReqs} title="leave" icon={messIcon} />
        {graph}
        <List list={suggestions.length>2?suggestions.slice(0,2):suggestions} title="suggestions" icon={suggestionIcon} />
      </div>
    </div>
  );
}

export default Home;
