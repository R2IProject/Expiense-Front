import React from "react";
import SidebarLayout from "@/layout/layout";
import DynamicTable from "./components/table";
import { useRouter } from "next/router";
import NewFinances from "./new";

export default function index({ token }) {
  const router = useRouter();
  return (
    <SidebarLayout>
      <div className="flex justify-center space-x-32">
        <NewFinances token={token} />
        <DynamicTable />
      </div>
    </SidebarLayout>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: token,
    },
  };
};
