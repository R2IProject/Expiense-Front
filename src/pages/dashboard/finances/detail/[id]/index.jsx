import { message } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SidebarLayout from "@/layout/layout";
import Dropdown from "@/common/dropdown";
import DatePicker from "@/common/datepicker";
import { getFinancesBalancesData } from "@/hook/get_finances_balances_by_user_id";

export default function FinancesEdit({ token, user }) {
  // Params Extractor
  const router = useRouter();
  const { id } = router.query;

  // Ui Library
  const [messageApi, contextHolder] = message.useMessage();
  // Consume Data
  const { getBalancesData } = getFinancesBalancesData(user._id, token);
  const [financesData, setFinancesData] = useState([]);

  // State
  const [NoIncomeOutcome, setNoIncomeOutcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTypeOfExpens, setSelectedTypeOfExpens] = useState("");
  const [currecyType, setCurrecyType] = useState("IDR");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen2] = useState(false);
  const [purchasedDate, setPurchasedDate] = useState("");
  const [incomeDate, setIncomeDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [displayDate, setDispayDate] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api-expiense/finances_by_id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFinancesData(res.data);
          setSelectedTypeOfExpens(res.data.type);
          setPurchasedDate(
            res.data.item_purchased_date
              ? res.data.item_purchased_date
              : new Date().toISOString().slice(0, 10)
          );
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content:
              "Uh-oh, something went wrong on our end. Please try again later or reach out for help. We’re here for you! 😔",
            duration: 2,
          });
        });
    }
  }, [id]);

  const EditFinances = (e) => {
    e?.preventDefault();
    const emptyData = {
      amount: null,
      currency: null,
      type: null,
      items: null,
      status: "NIO",
      item_purchased_date: null,
      stored_income_date: null,
    };

    const data = {
      amount: e?.target.amount?.value ?? "",
      currency: currecyType ?? "",
      type: selectedTypeOfExpens ?? "",
      items: e?.target.items?.value || null,
      status: null,
      item_purchased_date:
        selectedTypeOfExpens === "Outcome" ? purchasedDate : null,
      stored_income_date: selectedTypeOfExpens === "Income" ? incomeDate : null,
    };
    const postedData = NoIncomeOutcome ? emptyData : data;
    setLoading(true);
    axios
      .patch(`http://localhost:5000/api-expiense/finances/${id}`, postedData, {
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
        getBalancesData();
        setTimeout(() => {
          router.push("/dashboard/finances");
        }, 1000);
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

  useEffect(() => {
    if (NoIncomeOutcome === true) {
      EditFinances();
    }
  }, [NoIncomeOutcome]);

  return (
    <SidebarLayout>
      {contextHolder}
      <div className="w-full p-6 rounded-lg bg-primary">
        <form onSubmit={EditFinances}>
          {/* Amount */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-white text-sm font-bold mb-2 mt"
            >
              Amount
            </label>
            <div className="relative">
              <Dropdown
                options={["IDR", "USD"]}
                selectedValue={currecyType}
                onSelect={(value) => setCurrecyType(value)}
                placeholder={currecyType}
                dropdownOpen={dropdownOpen1}
                setDropdownOpen={setDropdownOpen2}
                icons={false}
                buttonStyle="absolute inset-y-0 left-0 pl-3 w-[49px] h-10 rounded-l-sm border-transparent appearance-none focus:outline-none focus:ring focus:ring-blue-200"
                selectBodyStyle="mt-[50px]"
              />
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                required
                defaultValue={financesData.amount}
                className="w-full px-3 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-200 pl-16"
              />
            </div>
          </div>
          {/* Type Of Expense */}

          <div className={`mb-4 ${dropdownOpen1 ? "mt-28" : ""}`}>
            <label
              htmlFor="type"
              className="block text-white text-sm font-bold mb-2"
            >
              Type of Expense
            </label>
            <Dropdown
              options={["Income", "Outcome", "Borrowed"]}
              selectedValue={selectedTypeOfExpens}
              onSelect={(value) => setSelectedTypeOfExpens(value)}
              placeholder="Choose a Type"
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              buttonStyle="w-full"
            />
          </div>
          {/* Outcome */}
          {selectedTypeOfExpens === "Outcome" && (
            <>
              {/* Purchaser Input */}
              <div className={`mb-4 ${dropdownOpen ? "mt-36" : ""}`}>
                <label
                  htmlFor="items"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Purchased Item Name
                </label>
                <input
                  type="text"
                  id="items"
                  placeholder="Enter items name"
                  name="items"
                  required={selectedTypeOfExpens === "Outcome"}
                  defaultValue={financesData?.items}
                  className="w-full px-3 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Puchaser Date */}
              <div className="mb-4">
                <label
                  htmlFor="item_purchased_date"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Purchase Items
                </label>
                <input
                  onClick={() => setDispayDate(!displayDate)}
                  type="text"
                  id="item_purchased_date"
                  placeholder={purchasedDate}
                  name="item_purchased_date"
                  defaultValue={financesData?.item_purchased_date}
                  className="w-full px-3 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  readOnly
                />
                <div
                  className={`overflow-hidden duration-500 mt-2 ${
                    displayDate ? "h-[324px]" : "h-0"
                  }`}
                >
                  {displayDate && (
                    <DatePicker
                      onDateSelect={(selectedDate) => {
                        setPurchasedDate(selectedDate);
                        setDispayDate(false);
                      }}
                      initialSelectedDate={purchasedDate}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Income */}
          {selectedTypeOfExpens === "Income" && (
            <div
              className={`mb-4 ${
                dropdownOpen && selectedTypeOfExpens === "Income" ? "mt-36" : ""
              }`}
            >
              <label
                htmlFor="stored_income_date"
                className="block text-white text-sm font-bold mb-2"
              >
                Income Date
              </label>
              <input
                onClick={() => setDispayDate(!displayDate)}
                type="text"
                id="stored_income_date"
                placeholder={incomeDate}
                name="stored_income_date"
                defaultValue={financesData?.stored_income_date}
                className="w-full px-3 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                readOnly
              />
              <div
                className={`overflow-hidden duration-500 mt-4 ${
                  displayDate ? "h-[324px]" : "h-0"
                }`}
              >
                {displayDate && (
                  <DatePicker
                    onDateSelect={(selectedDate) => {
                      setIncomeDate(selectedDate);
                      setDispayDate(false);
                    }}
                    initialSelectedDate={incomeDate}
                  />
                )}
              </div>
            </div>
          )}
          {/* Submit Button */}
          <div
            className={`${
              dropdownOpen &&
              selectedTypeOfExpens !== "Income" &&
              selectedTypeOfExpens !== "Outcome"
                ? "mt-36"
                : ""
            }`}
          >
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading
                ? "Please wait our system is processing 😊"
                : "Save Changes"}
            </button>
          </div>
        </form>
        {/* NIO Button */}
        <button
          className="w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setNoIncomeOutcome(true)}
        >
          No Income / Outcome
        </button>
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
