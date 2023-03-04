import { useState, useEffect } from "react";

const useFetch = (url, sendReq) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        fetch(`http://localhost:3000${url}`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            setData(resp);
          });
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url,sendReq]);

  return { data, loading, error };
};

export default useFetch;
