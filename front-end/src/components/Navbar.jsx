import React, { useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(true);

   const auth=localStorage.getItem("user")

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full  h-[60px] bg-black">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full">
        <div>
          <h1 className="text-[#00d8ff] ">E-Dashboard</h1>
        </div>
        <div className=" hidden md:flex">
          <ul className="flex text-white items-center">
           <Link to={"/"}>
           <li>Products</li>
           </Link>
           <Link to={"/add"}>
           <li>Add Product</li>
           </Link>
           <Link to={"/update"}>
           <li>Update Product</li>
           </Link>
          
           <Link to={"/profile"}>
           <li>Profile</li>
           </Link>
          
           {
             auth ?  <Link to={"/logout"}> <li>Logout</li></Link> : <Link to={"/signup"}> <li>SignUP</li> </Link>
           }
            
          </ul>
        </div>
        {/* Ham burger */}
        <div className="block md:hidden ">
          {/* <AiOutlineMenu size={30} className="text-white" /> */}
          {toggle ? (
            <AiOutlineMenu
              size={30}
              className="text-white cursor-pointer"
              onClick={() => handleToggle()}
            />
          ) : (
            <AiOutlineClose
              size={30}
              className="text-white cursor-pointer"
              onClick={() => handleToggle()}
            />
          )}
        </div>
        {/* mobile menu */}
        {!toggle ? (
          <div className="  md:hidden w-full  bg-black text-white absolute top-[60px] left-0  flex justify-center text-center">
            <ul className="">
            <Link to={"/"}>
           <li>Products</li>
           </Link>
           <Link to={"/add"}>
           <li>Add Product</li>
           </Link>
           <Link to={"/update"}>
           <li>Update Product</li>
           </Link>
           <Link to={"/logout"}>
           <li>Logout</li>
           </Link>
           <Link to={"/profile"}>
           <li>Profile</li>
           </Link>
           <Link to={"/signup"}>
           <li>SignUP</li>
           </Link>
           
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
