/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import users from "@/Data.json";
import ProductList from "./ProductList";
import { useAppContext } from "@/app/Contexts/appContext";

export default function ProductTable() {
  const [ProductID, setProductID] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const { product } = useAppContext();
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const HandleData = async () => {
    const temp = [];
    const productIds = new Set();
    users.forEach((item) => {
      if (!productIds.has(item.productId)) {
        temp.push(item);
        productIds.add(item.productId);
      }
    });
    setData(temp);
  };
  useEffect(() => {
    HandleData();
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="Product_Name">Product Name</TableColumn>
          <TableColumn key="Description">Description</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow
              key={item.productId}
              className="cursor-pointer"
              onClick={() => {
                setProductID(item.productId);
                onOpen();
              }}
            >
              {(columnKey) => (
                <TableCell className="cursor-pointer">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Packages available for the following product - 
                </ModalHeader>
                <div className="modal-container">
                  <ModalBody>
                    <ProductList id={ProductID} />
                  </ModalBody>
                </div>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
