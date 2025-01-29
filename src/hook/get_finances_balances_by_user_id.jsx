import axios from "axios";
import { useState, useEffect } from "react";

export function getFinancesBalancesData(id, token) {
  const [balancesData, setBalancesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState("");

  const getBalancesData = () => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api-expiense/finances_balance_by_userId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBalancesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
      });
  };
  useEffect(() => {
    if (id) {
      getBalancesData();
    }
  }, [id]);
  return { balancesData, loading, messages, getBalancesData };
}
