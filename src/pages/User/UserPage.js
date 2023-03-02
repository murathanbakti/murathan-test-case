import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserPage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const handleTask = () => {
      const cuurentUser = JSON.parse(localStorage.getItem("user"));
      console.log(cuurentUser);
      try {
        fetch(`http://localhost:3000/tasks?owner=${cuurentUser.username}`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            setData(resp);
          });
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    };
    handleTask();
  }, []);
  console.log(data);
  return (
    <div>
      {!data ? <></> : <div className="container">
        {data.map((e) => (
          <div className="card">
            <span className="cardTitle">{e.title}</span>
            <span className="endTime">{e.time}</span>
            <span className="cardDesc">{e.desc}</span>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default UserPage;
