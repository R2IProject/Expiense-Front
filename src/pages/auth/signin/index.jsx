import Image from "next/image";
import React from "react";
import LoginForm from "./component/login";

export default function Signin() {
  return (
    <>
      <div className="md:flex md:justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row md:space-x-48">
          <Image
            src="/auth/signin/login.png"
            alt="signin"
            className="w-[550px] h-[550px]"
            width={1000}
            height={1000}
          />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
