"use client";

import { registerUser } from "@/lib/actions/authActions";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const toggleVisiblePass = () => setVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success("User created successfully");
      router.push("/auth/signin");
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 shadow border place-self-stretch rounded-md gap-3 p-2">
      <Input errorMessage={errors.name?.message} isInvalid={!!errors.name} {...register("name")} label="Name" className="col-span-2" startContent={<UserIcon className="w-4" />} />
      <Input startContent={<EnvelopeIcon className="w-4" />} errorMessage={errors.email?.message} {...register("email")} label="Email" className="col-span-2" />
      <Input
        startContent={<LockClosedIcon className="w-4" />}
        errorMessage={errors.password?.message}
        {...register("password")}
        label="Password"
        className="col-span-2"
        type={visiblePass ? "text" : "password"}
        endContent={visiblePass ? <EyeSlashIcon onClick={toggleVisiblePass} className="w-4 cursor-pointer" /> : <EyeIcon onClick={toggleVisiblePass} className="w-4 cursor-pointer" />}
      />
      <Input startContent={<LockClosedIcon className="w-4" />} errorMessage={errors.confirmPassword?.message} type={visiblePass ? "text" : "password"} {...register("confirmPassword")} label="Confirm Password" className="col-span-2" />
      <div className="flex justify-center col-span-2">
        <Button isLoading={isSubmitting} color="primary" type="submit" className="w-48">
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
