import React from "react";
import SidebarLayout from "@/layout/layout";
import DynamicTable from "./components/table";
import NewFinances from "./new";
import axios from "axios";
import { getUserFinancesData } from "@/hook/get_finances_by_id";

export default function index({ token, user }) {
  const { getUserData, userData, loading, messages } = getUserFinancesData(
    user._id,
    token
  );

  return (
    <SidebarLayout>
      <div className="flex justify-center space-x-32">
        <NewFinances token={token} refetch={getUserData} />
        <DynamicTable
          userData={userData}
          loading={loading}
          messages={messages}
        />
      </div>
    </SidebarLayout>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  if (token) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api-expiense/auth/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        props: {
          token,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        props: {
          token: null,
        },
      };
    }
  } else {
    return {
      props: {
        token: null,
      },
    };
  }
};
