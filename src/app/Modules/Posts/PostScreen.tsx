"use client";

import { useCreatePostsMutation } from "@/app/slices/postsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(20, "Title must be at most 20 characters"),
  description: z.string().min(3, "Description must be at least 3 characters").max(20, "Description must be at most 20 characters"),
});

type InputType = z.infer<typeof FormSchema>;

const PostScreen = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const [createPostMutation] = useCreatePostsMutation();

  const createPost: SubmitHandler<InputType> = async (data) => {
    try {
      const res = await createPostMutation({ email: session?.user?.email, ...data });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createPost)}>
      <Input variant="bordered" color="primary" label="Title" title="Title" {...register("title")} />
      <Input variant="bordered" color="primary" label="Description" {...register("description")} />
      <Button type="submit" color="primary">
        Create Post
      </Button>
    </form>
  );
};

export default PostScreen;
