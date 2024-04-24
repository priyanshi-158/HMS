
function About() {


  return (
    <>
      <h1 className="font-bold text-white text-center text-3xl lg:text-5xl pb-4">
        Know <span className="text-[#9F6BA0]">About</span> Us
      </h1>
      <div className='flex flex-col-reverse lg:flex-row'>
        <div className='flex-1 lg:w-[50%] py-8 '>
        <h1 className='text-3xl font-bold p-8 hidden lg:block text-gray-400'>About Us</h1>
        <p className='text-lg pl-8 pb-20 md:text-2xl text-white text-justify'>
        Welcome to our Hostel Management System, your premier destination for seamless hostel management solutions!
        We understand the unique needs of hostel wardens, as well as the diverse requirements of students. Our platform is designed to streamline every aspect of hostel management, from leaves and attendance to complaints and suggestions.
        With our user-friendly interface, hostel wardens can effortlessly manage attendance, track student records, and optimize hostel facilities.
        For students present in hostel, we offer a range of services. Whether you're facing an issue, or have a suggestion, you'll find a way to voice it out.
        With a commitment to improvement, we are your trusted partner in hostel management.
        </p>
        </div>
        <div className='lg:w-[50%] flex justify-center items-center'>
        <img src="https://images.unsplash.com/photo-1626265774643-f1943311a86b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D" className="w-[90%]"/>
        </div>
    </div>
    </>
  );
}
export { About };
