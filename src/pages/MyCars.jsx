import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MyCars = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/my-cars", {
          withCredentials: true,
        });
        setMyCars(res.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCars();
  }, []);
  return <div>MyCars: {myCars.length}</div>;
};

export default MyCars;
