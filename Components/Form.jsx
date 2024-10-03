import React, { useState, useContext } from "react";
import ProductTable from "./ProductTable";
import { Input } from "@nextui-org/react";
import { useAppContext } from "@/app/Contexts/appContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
const Form = () => {
  const [btntext, setbtntext] = useState("Click To Copy Payment Link");
  const [selectedColor, setSelectedColor] = useState("primary");
  const [userID, setuserID] = useState(null);
  const { product, setproduct } = useAppContext();
  const [paymenttype,setpaymenttype] = useState('subscription');
  const handlesubmit = () => {
    if (!userID || !product ||!paymenttype) {
      alert("Please  fill all the fields");
    } else {
      navigator.clipboard.writeText(
        `https://us-central1-tlloanapp-d0571.cloudfunctions.net/stripePayment/purchase/${userID}/${product.priceId}?mode=${paymenttype}`
      );
      setbtntext("Link Copied");
      // alert("Link Copied Successfully");
      // setTimeout(() => {
      //   setbtntext("Click To Copy Payment Link");
      // }, 2000);
    }
  };
  const handlechange = () => {
    setproduct(null);
  };
  return (
    <div className="max-w-[390px] sm:max-w-[640px] sm:min-h-[720px] bg-white sm:min-w-[640px]  flex flex-col p-4 sm:p-5 gap-8  drop-shadow-xl">
      <h1 className="text-sm sm:text-lg font-medium">
        Please Fill the Following details to generate the Payment Link :
      </h1>
      <div className="flex flex-col gap-10">
        <Input
          type="text"
          label="USER_ID"
          placeholder="Enter your UserId"
          onChange={(e) => {
            setuserID(e.target.value);
          }}
        />

        {product ? (
          <div className="flex flex-col gap-2">
            <Table
              color={selectedColor}
              selectionMode="single"
              defaultSelectedKeys={["2"]}
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Currency</TableColumn>
                <TableColumn>Interval</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key={1}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.Currency}</TableCell>
                  <TableCell>{product.interval}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <button
              className="p-4 bg-red-700 text-white rounded-full max-w-[180px] hover:bg-red-500 transition-all"
              onClick={() => {
                handlechange();
              }}
            >
              change product
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-medium">
              Please select the product below
            </h1>
            <ProductTable />
          </div>
        )}
        <div className="flex flex-row justify-between items-center m-auto gap-2">
          <h1 className=" text-md sm:text-lg font-medium">
            Please select your subscription type
          </h1>
          <select
            defaultValue={"select your subscription type"}
            className="border border-solid border-gray-400  p-2 sm:p-4"
            onChange={(e)=>{setpaymenttype(e.target.value)}}
          >
            <option value={"subscription"}>Subscription(auto pay)</option>
            <option value={"payment"}>Single Time</option>
          </select>
        </div>
        <button
          className="bg-blue-600 p-4 text-white text-lg rounded-full hover:bg-blue-400"
          onClick={handlesubmit}
        >
          {btntext}
        </button>
      </div>
    </div>
  );
};

export default Form;
