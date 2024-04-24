import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const List = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));
    fetch("http://localhost:3000/api/invoice/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let invoices = data.invoices;
          let list = [];
          console.log(invoices)
          invoices.forEach((invoice) => {
              let date = new Date(invoice.date);
              invoice.date = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              list.push({
                title: invoice.title,
                amount: "Rs. " + invoice.amount,
                status: invoice.status,
                date: invoice.date,
              });
            
          });
          setInvoiceList(list);
        }
      });
  }, [invoiceList.length]);
console.log(invoiceList)
  return (
    <div className="w-full max-w-md p-4 rounded-lg shadow sm:p-8 bg-neutral-950 drop-shadow-xl overflow-y-auto max-h-70">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">
          Invoices List
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-700">
          {invoiceList.length===0?(<li className="mt-2 pl-3 mb-5">No new invoices</li>):(invoiceList.map((invoice) => (
            <li className="py-3 sm:py-4" key="1">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-white">
                  {invoice.status.toLowerCase() === "pending" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">
                    {invoice.title}
                  </p>
                  <p className="text-sm truncate text-gray-400">
                    {invoice.date}
                  </p>
                </div>
                <div className="flex flex-col items-center text-base font-semibold text-white">
                  {invoice.amount}
                </div>
              </div>
            </li>
          )))}
        </ul>
      </div>
    </div>
  );
};

function Home() {
  let student = JSON.parse(localStorage.getItem("student"));

  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) {
      let daysOff = 0;
      data.attendance.map((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff);
      console.log(daysOff);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const labels = ["Days off", "Days present"];
  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const [daysOff, setDaysOff] = useState(0); //!Fetch from database

  return (
    <div className="w-full min-h-[91vh] flex items-center justify-center flex-col gap-5 overflow-x-hidden pt-20 md:pt-12">
      <h1 className="text-white font-bold text-3xl px-2 lg:text-5xl text-center">
        Welcome <span className="text-[#9F6BA0]">{student.name}!</span>
      </h1>
      <div className="flex lg:pt-20 gap-5 lg:gap-8 w-full justify-center flex-wrap">
        <List />
        <div className="flex flex-col items-center bg-neutral-950 rounded-xl shadow-xl p-5">
          <span className="text-white text-xl">Attendance</span>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "days",
                  data: [daysOff, totalDays - daysOff],
                  backgroundColor: ["#F26916", "#1D4ED8"],
                  barThickness: 50,
                  borderColor: "rgba(0,0,0,0)",
                  hoverOffset: 10,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
