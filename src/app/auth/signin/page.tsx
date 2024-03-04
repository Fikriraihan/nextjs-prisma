"use client";

import SigninForm from "@/app/components/SigninForm";
import { signIn } from "next-auth/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome, faGoogle, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";

interface Props {
  searchParams?: {
    callbackUrl?: string;
  };
}

const SigninPage = (props: Props) => {
  const { searchParams } = props;

  return (
    <div className="p-3">
      <h1 className="text-3xl text-slate-500">Sign In Page</h1>
      <div className="mt-3">
        <SigninForm callbackUrl={searchParams?.callbackUrl} />
      </div>
      <div className="cursor-pointer flex gap-2 mt-2 justify-center">
        <h1>Log in using</h1>
        <div className="flex gap-4 border bg-gradient-to-r from-red-500 to-slate-200 shadow px-3 rounded-md">
          <div>
            <FontAwesomeIcon icon={faGoogle} className="w-4 hover:text-sky-500 transition-colors" />
          </div>
          <div>
            <FontAwesomeIcon onClick={() => signIn("github")} icon={faGithub} className="w-4 hover:text-sky-500 transition-colors" />
          </div>
          <div>
            <FontAwesomeIcon icon={faFacebook} className="w-4 hover:text-sky-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
