import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Data from "@/Data.json";
import { useAppContext } from "@/app/Contexts/appContext";
const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

export default function ProductList({ id }) {
  const [selectedColor, setSelectedColor] = useState("primary");
  // const [product, setproduct] = useState("");
  const { product, setproduct } = useAppContext();
  const handlePrice = (item) => {
    const data = {
      name: item.Product_Name,
      priceId: item.priceId,
      productId: item.productId,
      price: item.Amount,
      Currency: item.Currency,
      interval: item.Interval,
    };
    setproduct(data);
    // console.log(product);
  };
  return (
    <div className="list-container">
      <Table
        color={selectedColor}
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Price</TableColumn>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Interval</TableColumn>
        </TableHeader>
        <TableBody>
          {Data.filter((data) => data.productId === id).map((item, index) => {
            return (
              <TableRow key={index + 1} onClick={() => handlePrice(item)}>
                <TableCell>{item.Amount}</TableCell>
                <TableCell>{item.Currency}</TableCell>
                <TableCell>{item.Interval}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
