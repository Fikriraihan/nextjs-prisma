"use client";

import { useDeleteProductMutation, useGetProductDetailQuery } from "@/app/slices/productSlice";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const { data } = useGetProductDetailQuery(id);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete: any = (id: string) => {
    try {
      const res = deleteProduct(id);
      toast.success(`Product: ${data.name} deleted successfully`);
      console.log(res);
      router.push("/products");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button color="secondary" as={Link} href="/products">
          Back
        </Button>
        <Button onClick={() => handleDelete(id)} color="primary">
          Delete
        </Button>
      </div>
      <h1>{data?.name}</h1>
      <p>{data?.category}</p>
      <p>{data?.price}</p>
    </div>
  );
};

export default ProductDetail;
