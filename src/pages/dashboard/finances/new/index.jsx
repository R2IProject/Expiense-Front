import Dropdown from "@/common/dropdown";
import DatePicker from "../../../../common/datepicker";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ExpenseForm = ({ token, refetch }) => {
  const [selectedTypeOfExpens, setSelectedTypeOfExpens] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [currecyType, setCurrecyType] = useState("IDR");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen2] = useState(false);
  const [purchasedDate, setPurchasedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [incomeDate, setIncomeDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [NoIncomeOutcome, setNoIncomeOutcome] = useState(false);
  const [displayDate, setDispayDate] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api-expiense/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        messageApi.error("Failed to fetch user data");
      }
    };
    getUserData();
  }, [token]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const emptyData = {
      userId: userData?._id ?? "",
      name: userData?.name ?? "",
      amount: null,
      currency: null,
      type: null,
      items: null,
      status: "NIO",
      item_purchased_date: null,
      stored_income_date: null,
    };

    const data = {
      userId: userData?._id ?? "",
      name: userData?.name ?? "",
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
      .post("http://localhost:5000/api-expiense/finances", postedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success("Your expense track has been added!");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        refetch();
        setNoIncomeOutcome(false);
      })
      .catch((err) => {
        message.error(err.message);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setNoIncomeOutcome(false);
      });
  };

  useEffect(() => {
    if (NoIncomeOutcome === true) {
      handleSubmit();
    }
  }, [NoIncomeOutcome]);

  return (
    <div className="flex flex-col">
      {contextHolder}
      <form className="mt-8 w-[30vh]" onSubmit={handleSubmit}>
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
              className="w-full px-3 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-200 pl-16"
            />
          </div>
        </div>
        {/* Type */}
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
                Items Purchase Date
              </label>
              <input
                type="text"
                id="items"
                placeholder="Enter items name"
                name="items"
                required={selectedTypeOfExpens === "Outcome"}
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
          <div className="mb-4">
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
        <div
          className={`${
            dropdownOpen && selectedTypeOfExpens !== "Outcome" ? "mt-36" : ""
          }`}
        >
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Please wait our system is processing 😊" : "Create"}
          </button>
        </div>
      </form>
      <button
        className="w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setNoIncomeOutcome(true)}
      >
        No Income / Outcome
      </button>
    </div>
  );
};

export default ExpenseForm;
