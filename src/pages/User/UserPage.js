import React, { useEffect, useState } from "react";
import "./userPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [data, setData] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  useEffect(() => {
    const handleTask = () => {
      console.log(currentUser);
      try {
        fetch(`http://localhost:3000/tasks?owner=${currentUser.username}`)
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
  const addTask = () => {
    navigate("/add-task")
  };
  return (
    <div>
      <div class="container">
        <div className="todoList">
          <h3 className="userName">Kullanıcı: {currentUser.username}</h3>
          <h1>Todo List</h1>
          {!data ? (
            <></>
          ) : (
            <div className="container">
              {data.map((e) => {
                if (e.display === true) {
                  return (
                    <div className="card">
                      <span className="cardTitle">{e.title}</span>
                      <span className="endTime">{e.time}</span>
                      <span className="cardDesc">{e.desc}</span>
                    </div>
                  );
                }
              })}
            </div>
          )}
          <button className="addTask" onClick={addTask}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
