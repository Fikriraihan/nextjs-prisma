"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { toast } from "react-toastify";

export async function registerUser(credentials: Omit<User, "id" | "image">) {
  const emailExists = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (credentials.email === emailExists?.email) {
    throw new Error("Email already exists");
  } else {
    try {
      const result = await prisma.user.create({
        data: {
          ...credentials,

          password: await bcrypt.hash(credentials.password, 10),
        },
      });
      return result;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}
