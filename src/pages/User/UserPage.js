import React, { useEffect, useState } from "react";
import "./userPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useFetch from "../../hooks/useFetch";

const UserPage = () => {
  const [sendReq, setSendReq] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);
  const { data, loading, error } = useFetch(
    `/tasks?owner=${currentUser.username}`,
    sendReq
  );

  console.log(data);
  const setTask = (e) => {
    console.log(e);
    navigate("/set-task", {
      state: {
        taskId: e,
      },
    });
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
        <></>
      ) : (
        <div className="loginUser">
          <div class="userContainer">
            <div className="todoList">
              <h3 className="userName">Kullanıcı: {currentUser.username}</h3>
              <h2>Todo List</h2>
              {!data ? (
                <></>
              ) : (
                <div className="userContainer">
                  {data.map((e) => {
                    if (e.display === true) {
                      return (
                        <div className="card">
                          <div className="delete">
                            <IconButton
                              onClick={() => setTask(e.id)}
                              size="small"
                            >
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
