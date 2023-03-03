import React, { useEffect, useState } from "react";
import "./userPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const UserPage = () => {
  const [data, setData] = useState();
  const [sendReq, setSendReq] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    const handleTask = async () => {
      console.log(currentUser);
      try {
        await fetch(`http://localhost:3000/tasks?owner=${currentUser.username}`)
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
  }, [sendReq]);
  console.log(data);
  const setTask = () => {
    navigate("/set-task");
  };
  const handleDelete = async (e) => {
    const deleteData = {
      title: e.title,
      desc: e.desc,
      time: e.time,
      display: false,
      owner: e.owner,
    };
    console.log(e);
    try {
      await fetch(`http://localhost:3000/tasks/${e.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(deleteData),
      });
      setSendReq(!sendReq);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {!currentUser ? (
        <>
          <div className="navigateHome">
            <h2>Giris yapiniz</h2>
            <a href="/">Tıkla</a>
          </div>
        </>
      ) : (
        <div className="loginUser">
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
                          <div className="delete">
                            <IconButton onClick={setTask} size="small">
                              <ModeEditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(e)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </div>
                          <span className="cardTitle">{e.title}</span>
                          <span className="endTime">{e.time}</span>
                          <span className="cardDesc">{e.desc}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
              <button className="addTask">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
