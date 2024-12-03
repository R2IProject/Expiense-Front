import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Calendar({
  initialYear,
  initialMonth,
  initialSelectedDate,
  onDateSelect,
}) {
  const [year, setYear] = useState(initialYear || new Date().getFullYear());
  const [month, setMonth] = useState(initialMonth || new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate || null);

  useEffect(() => {
    if (!initialSelectedDate) {
      const today = new Date();
      const formattedToday = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      setSelectedDate(formattedToday);
    }
  }, [initialSelectedDate]);

  const getTotalDays = (year, month) => new Date(year, month + 1, 0).getDate();

  const getCalendarDates = (year, month) => {
    const dates = [];
    const totalDays = getTotalDays(year, month);
    for (let i = 1; i <= totalDays; i++) {
      dates.push({ date: i, currentMonth: true });
    }
    return dates;
  };

  const dates = getCalendarDates(year, month);
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDateClick = (formattedDate) => {
    setSelectedDate(formattedDate);
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-primary w-[300px] rounded-xl">
      {/* Month */}
      <div className="flex justify-between text-lg font-semibold w-full text-center text-white py-2 mb-2 rounded-full">
        <FaAngleLeft
          className="mt-[6px] hover:cursor-pointer"
          onClick={() => {
            setMonth((prevMonth) => prevMonth - 1);
          }}
        />
        {new Date(year, month).toLocaleString("default", {
          month: "long",
        })}{" "}
        {year}
        <FaAngleRight
          className="mt-[6px] hover:cursor-pointer"
          onClick={() => {
            setMonth((nextMonth) => nextMonth + 1);
          }}
        />
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2 w-full text-center font-medium text-white">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-4xl text-center mt-2">
        {dates.map((dateObj, index) => {
          const formattedDate = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(dateObj.date).padStart(2, "0")}`;
          const isSelected = formattedDate === selectedDate;

          return (
            <div
              key={index}
              className={`p-1 hover:bg-primaryhover2 hover:rounded-lg hover:cursor-pointer ${
                dateObj.currentMonth ? "text-white" : "text-gray-500"
              } ${isSelected ? "bg-gray-800 rounded-lg" : ""}`}
              onClick={() => handleDateClick(formattedDate)}
            >
              {dateObj.date}
            </div>
          );
        })}
      </div>
    </div>
  );
}
