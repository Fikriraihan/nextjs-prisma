"use client";

import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
});

type InputType = z.infer<typeof FormSchema>;

const SigninForm = (props: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      router.push("/");
    }
  }, [data, status]);

  const handleLogin: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Signed in successfully");
    router.push(props?.callbackUrl ? props?.callbackUrl : "/");
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid grid-cols-2 shadow border gap-3 p-2 place-self-stretch">
      <Input errorMessage={errors.email?.message} label="Email" className="col-span-2" {...register("email")} startContent={<EnvelopeIcon className="w-4" />} />
      <Input label="Password" type="password" className="col-span-2" startContent={<LockClosedIcon className="w-4" />} errorMessage={errors.password?.message} {...register("password")} />
      <div className="col-span-2 flex justify-center">
        <Button isLoading={isSubmitting} type="submit" color="primary" className="w-48">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
