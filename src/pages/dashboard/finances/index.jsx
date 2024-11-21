import React from "react";
import SidebarLayout from "@/layout/layout";
import DynamicTable from "./components/table";

export default function index() {
  return (
    <SidebarLayout>
      <DynamicTable />
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
      token: null,
    },
  };
};
