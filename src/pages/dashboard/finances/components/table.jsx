import { useState } from "react";

const Table = () => {
  const [data] = useState([
    { name: "John Doe", age: 28, role: "Developer" },
    { name: "Jane Smith", age: 32, role: "Designer" },
    { name: "Chris Johnson", age: 24, role: "Product Manager" },
  ]);

  return (
    <div className="overflow-x-auto bg-[#3c3f46] text-white p-4 rounded-lg">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.age}</td>
              <td className="py-2 px-4">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;