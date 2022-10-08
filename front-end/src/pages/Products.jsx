import React, { useEffect } from "react";
import { useState } from "react";
import {MdDelete} from "react-icons/md"
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products");

    result = await result.json();

    setProducts(result);
  };

   const productDelete= async(id)=>{

      let result= await fetch(`http://localhost:8000/product/${id}` ,{
        method:"DELETE"
      });

       result= await result.json();
      if(result){
         getProducts()
      }


   }

  return (
    <div className="w-[97%]">
      <h1 className=" grid place-items-center mt-5 mb-5"> Products List</h1>

      <div className="h-screen ">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Company
                      </th>
                      
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Operation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((ele, index) => (
                      <tr className="bg-white border-b" key={ele._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          ₹ {ele.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.category}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.company}
                        </td>

                        <td   className="text-sm cursor-pointer text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <MdDelete onClick={ ()=> { productDelete(ele._id)} } size={25}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
