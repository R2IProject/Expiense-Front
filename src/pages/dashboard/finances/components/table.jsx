import { formatDate } from "@/common/date_formatter";
import { message } from "antd";
import { MdDeleteForever, MdBorderColor } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";

const Table = ({ userData, messages, token, refetch, refetchBalances }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (messages) {
      messageApi.error(messages);
    }
  }, [messages]);

  const DeleteUserItemFinances = (id) => {
    axios
      .delete(`http://localhost:5000/api-expiense/finances/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Your expense track has been deleted!",
          duration: 2,
        });
        refetch();
        refetchBalances();
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content:
            "Uh-oh, something went wrong on our end. Please try again later or reach out for help. We’re here for you! 😔",
          duration: 2,
        });
      });
  };
  return (
    <>
      {contextHolder}
      <div className="overflow-x-auto text-white mt-12">
        <table className="w-[900px] bg-primary text-xl p-4 rounded-lg">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4 text-center">No</th>
              <th className="py-2 px-4 text-center">Action</th>
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Amount</th>
              <th className="py-2 px-4 text-center">Type</th>
              <th className="py-2 px-4 text-center">Items</th>
              <th className="py-2 px-4 text-center">Items Purchased Date</th>
              <th className="py-2 px-4 text-center">Created At</th>
              <th className="py-2 px-4 text-center">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="px-4 my-7 py-auto text-center flex gap-3 text-[30px]">
                  <MdBorderColor
                    onClick={() =>
                      (window.location.href = `/dashboard/finances/detail/${item._id}`)
                    }
                    className="hover:border hover:rounded hover:p-1 hover:cursor-pointer"
                  />
                  <MdDeleteForever
                    onClick={() => DeleteUserItemFinances(item._id)}
                    className="hover:border hover:rounded hover:p-1 hover:cursor-pointer"
                  />
                </td>
                <td className="py-2 px-4 text-center">{item?.name ?? ""}</td>
                <td className="py-2 px-4 text-center">
                  Rp.{item?.amount ?? ""}
                </td>
                <td className="py-2 px-4 text-center">
                  {item?.status !== "NIO" ? item.type : "No Income / Outcome"}
                </td>
                <td className="py-2 px-4 text-center">{item?.items ?? ""}</td>
                <td className="py-2 px-4 text-center">
                  {item?.item_purchased_date ?? ""}
                </td>
                <td className="py-2 px-4 text-center">
                  {formatDate(item?.createdAt) ?? ""}
                </td>
                <td className="py-2 px-4 text-center">
                  {formatDate(item?.updatedAt) ?? "O"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
