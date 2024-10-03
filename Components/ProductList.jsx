import React from "react";
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

export default function ProductList({ id, onSelectItem }) {
  const { product } = useAppContext();

  return (
    <div className="list-container">
      <Table
        aria-label="Product prices table"
        selectionMode="single"
        defaultSelectedKeys={["2"]}
      >
        <TableHeader>
          <TableColumn>Price</TableColumn>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Interval</TableColumn>
        </TableHeader>
        <TableBody>
          {Data.filter((data) => data.productId === id).map((item, index) => (
            <TableRow
              key={item.priceId}
              className={`cursor-pointer ${
                product && product.priceId === item.priceId ? "selected-row" : ""
              }`}
              onClick={() => onSelectItem(item)}
            >
              <TableCell>{item.Amount}</TableCell>
              <TableCell>{item.Currency}</TableCell>
              <TableCell>{item.Interval}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
