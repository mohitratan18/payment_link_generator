import React, { useState, useContext } from "react";
import "../app/globals.css";
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
  const [paymenttype, setpaymenttype] = useState(null);
  const handlesubmit = async () => {
    if (!userID || !product || !paymenttype) {
      alert("Please  fill all the fields");
    } else {
      navigator.clipboard.writeText(
        `https://us-central1-tlloanapp-d0571.cloudfunctions.net/stripePayment/purchase/${userID}/${product.priceId}?mode=${paymenttype}`
      );
      setbtntext("Link Copied");
    }
  };
  const handlechange = () => {
    setbtntext("Click To Copy Payment Link");
    setproduct(null);
  };
  return (
    <div className="form-container">
      <h1 className="text-lg sm:text-3xl font-bold text-center m-1" >
        Create Payment Link
      </h1>
      <div className="form-container-12">
        <div className="flex flex-col gap-2">
          <label htmlFor="userid" className="text-lg font-medium">
            USERID
          </label>
          <Input
            type="text"
            placeholder="Enter your UserId"
            onChange={(e) => {
              setuserID(e.target.value);
            }}
            name="userid"
          />
        </div>

        {product ? (
          <div className="form-container-1">
            <Table
              color={selectedColor}
              selectionMode="single"
              defaultSelectedKeys={["1"]}
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Currency</TableColumn>
                <TableColumn>Interval</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key={'1'}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.Currency}</TableCell>
                  <TableCell>{product.interval}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <button
              className="form-button"
              onClick={() => {
                handlechange();
              }}
            >
              Change Product
            </button>
          </div>
        ) : (
          <div className="form-container-2">
            <h1 className="text-lg sm:text-xl font-medium">
              Please select The Product Below
            </h1>
            <ProductTable />
          </div>
        )}

        <div className="form-container-3">
          <h1 className=" text-md sm:text-xl font-medium">
            Please Select Your Subscription Type
          </h1>
          <select
            className="form-select"
            onChange={(e) => {
              setpaymenttype(e.target.value);
              setbtntext("Click To Copy Payment Link");
            }}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {product?.interval && (
              <option value={"subscription"}>Subscription(auto pay)</option>
            )}
            <option value={"payment"}>Single Time</option>
          </select>
        </div>
        <button className="form-button-2" onClick={handlesubmit}>
          {btntext}
        </button>
      </div>
    </div>
  );
};

export default Form;
