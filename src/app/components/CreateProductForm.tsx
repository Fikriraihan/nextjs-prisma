"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateProductMutation } from "../slices/productSlice";
import { toast } from "react-toastify";

const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters").max(20, "Brand must be at most 20 characters"),
  category: z.string().min(3, "Category must be at least 3 characters").max(20, "Category must be at most 20 characters"),
  price: z.string().min(3, "Price must be at least 3 characters").max(20, "Price must be at most 20 characters"),
  description: z
    .union([z.string().length(0, "Description must be at least 4 characters"), z.string().min(4).max(100, "Description must be at most 100 characters")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  image: z.string().min(3, "URL must be at least 3 characters").url("Please enter a valid URL"),
});

type InputType = z.infer<typeof FormSchema>;

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const [create] = useCreateProductMutation();

  const saveProduct: SubmitHandler<InputType> = async (data) => {
    console.log(data);

    try {
      const res = await create(data);
      toast.success("Product created successfully");
      reset();
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveProduct)} className="grid grid-cols-2 shadow border border-primary place-content-stretch rounded-md gap-3 p-2">
      <Input {...register("name")} isInvalid={!!errors.name} errorMessage={errors.name?.message} label="Name" />
      <Input {...register("price")} isInvalid={!!errors.price} errorMessage={errors.price?.message} label="Price" />
      <Input {...register("brand")} isInvalid={!!errors.brand} errorMessage={errors.brand?.message} label="Brand" />
      <Input {...register("category")} isInvalid={!!errors.category} errorMessage={errors.category?.message} label="Category" />
      <Input {...register("image")} isInvalid={!!errors.image} errorMessage={errors.image?.message} label="Image URL" />
      <Input {...register("description")} isInvalid={!!errors.description} label="Description" errorMessage={errors.description?.message} />
      <div className="col-span-2">
        <Button variant="shadow" color="primary" type="submit" className="w-full">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateProductForm;
