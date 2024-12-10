import axios from "axios";
import { useState, useEffect } from "react";

export function getUserFinancesData(id, token) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState("");

  const getUserData = () => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api-expiense/finances/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
      });
  };
  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, [id]);
  return { userData, loading, messages, getUserData };
}
