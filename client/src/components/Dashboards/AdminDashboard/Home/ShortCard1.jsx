import PropTypes from "prop-types";

ShortCard1.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

function ShortCard1( ) {


    const warden = JSON.parse(localStorage.getItem("warden"));

  return (
    <div className="p-5 w-full bg-neutral-950 text-white flex flex-col gap-3 rounded-xl shadow-xl md:max-w-[350px]">
      <p className="text-lg "><span>Email</span>{"   "}<span className="px-1 font-bold text-[#9F6BA0]">{warden.email}</span></p>
      <p className="text-lg "><span>Contact No.</span>{"   "}<span className=" px-1 font-bold text-[#9F6BA0]">{warden.contact}</span></p>
      <p className="text-lg "><span>Address</span>{"   "}<span className="px-1 font-bold text-[#9F6BA0]">{warden.address}</span></p>
    </div>
  );
}

export { ShortCard1 };