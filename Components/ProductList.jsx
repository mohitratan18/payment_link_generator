import React, { useState, useCallback } from "react";
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

export default function ProductList({ id, onClose }) {
  const [selectedColor, setSelectedColor] = useState("primary");
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
  };

  const handleRowClick = useCallback((item) => {
    handlePrice(item);
  }, []);
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
        <TableBody className="space-y-4">
          {Data.filter((data) => data.productId === id).map((item, index) => {
            return (
              <TableRow
                key={index}
                onClick={() => handleRowClick(item)}
                onTouchStart={() => handleRowClick(item)}
                className="cursor-pointe"
              >
                <TableCell className="cursor-pointer">{item.Amount}</TableCell>
                <TableCell className="cursor-pointer">
                  {item.Currency}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {item.Interval}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
