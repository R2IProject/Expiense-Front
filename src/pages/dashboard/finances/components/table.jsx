import { formatDate } from "@/common/date_formatter";
import { message } from "antd";
import { useEffect } from "react";

const Table = ({ userData, loading, messages }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (messages) {
      messageApi.error(messages);
    }
  }, [messages]);
  return (
    <>
      {contextHolder}
      <div className="overflow-x-auto text-white mt-12">
        <table className="w-[900px] bg-primary text-xl p-4 rounded-lg">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4 text-center">No</th>
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Amount</th>
              <th className="py-2 px-4 text-center">Type</th>
              <th className="py-2 px-4 text-center">Items</th>
              <th className="py-2 px-4 text-center">Items Purchased Date</th>
              <th className="py-2 px-4 text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="relative h-40">
                  <div className="absolute inset-0 flex justify-center items-center">
                    Please wait a moment 😊. We're collecting your data 😁.
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item?.name ?? ""}</td>
                    <td className="py-2 px-4">{item?.amount ?? ""}</td>
                    <td className="py-2 px-4">
                      {item?.status !== "NIO"
                        ? item.type
                        : "No Income / Outcome"}
                    </td>
                    <td className="py-2 px-4">{item?.items ?? ""}</td>
                    <td className="py-2 px-4">
                      {item?.item_purchased_date ?? ""}
                    </td>
                    <td className="py-2 px-4">
                      {formatDate(item?.createdAt) ?? ""}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
