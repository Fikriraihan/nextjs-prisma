"use client";

import ProductCard from "@/app/components/ProductCard";
import { useGetProductsQuery } from "@/app/slices/productSlice";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Pagination, Select, SelectItem, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const ProductScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword") || "";
  const pathName = usePathname();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const pageSizeVal = [6, 9, 15];

  const { data: product } = useGetProductsQuery({ keyword: search ? search : undefined, page: pageIndex, size: pageSize });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("keyword");
    router.replace(`${pathName}?${params.toString()}`);
  }, []);

  const handleSearch = (val: any) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("keyword", val);
    } else {
      params.delete("keyword");
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleChangePagination = (val: any) => {
    setPageIndex(val);
  };

  return (
    <div className="h-screen">
      <Skeleton isLoaded={product}>
        <div className="flex justify-center mt-3">
          <Button variant="shadow" color="primary" as={Link} href="/products/create">
            Create new product
          </Button>
        </div>
        <div className="mt-6 max-w-[1200px] mx-auto gap-2 grid grid-cols-10 grid-rows-1">
          {product && (
            <>
              <ProductCard title={product?.data[2]?.name} isAvailable={false} img={product?.data[2]?.image} />
              <ProductCard title={product?.data[2]?.name} overlay img={product?.data[5]?.image} price={"500"} description={product?.data[5]?.description} />
            </>
          )}
        </div>

        <div className="mt-10">
          <div className="flex justify-center bg-gradient border-none rounded-3xl px-10">
            <h1 className="layout-text">Product List</h1>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-10 mt-3">
            <Input
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              value={search}
              type="text"
              placeholder="Search..."
              className="max-w-xs col-span-3 border border-primary rounded-md !text-white"
              startContent={<FontAwesomeIcon className="text-primary" icon={faSearch} width={20} />}
            />
            {product &&
              product.data.map((product: any) => <ProductCard linkURL={`/products/${product.id}`} key={product.id} id={product.id} title={product.name} price={product.price} img={product.image} description={product.description} />)}
          </div>
          <div className="flex justify-end items-center">
            <Pagination onChange={handleChangePagination} showControls total={product?.totalPages} initialPage={1} />
            <Select onChange={(e) => setPageSize(parseInt(e.target.value))} color="secondary" label="Select" className="w-36">
              {pageSizeVal.map((size: any) => (
                <SelectItem textValue={size} color="default" className="!text-red-500" key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ProductScreen;
