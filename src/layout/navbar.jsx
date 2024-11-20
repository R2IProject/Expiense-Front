import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar({ token, user }) {
  return (
    <>
      <div className="bg-white mx-5 md:mx-32 rounded-full">
        <div className="flex justify-between mx-6 md:mx-10">
          <Image
            src="/navbar/logo.png"
            alt="logo"
            className="w-[60px] h-[60px]"
            width={1000}
            height={1000}
          />
          <div className="my-4">
            {token ? (
              <p>Hello {user.name} 😊</p>
            ) : (
              <Link href="/auth/signin">
                <button className="font-bold text-xl">Sign In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
