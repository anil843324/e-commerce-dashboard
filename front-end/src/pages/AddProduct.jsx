import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  const addProduct = async () => {

       const userId = JSON.parse(localStorage.getItem('user'))._id

        

    if (!price || !company || !category || !name) {
      alert("please fill the data");
    } else {
      let result = await fetch("http://localhost:8000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, company, category  ,userId}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
       setCategory("")
       setCompany("")
       setName("")
       setPrice("")
       alert("product added")
      console.log(result);
    }
  };

  return (
    <div>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Add Product</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="price"
              placeholder="Enter product price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="category"
              placeholder="Enter product category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="company"
              placeholder="Enter product company"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            />

            <button
              type="submit"
              onClick={addProduct}
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
