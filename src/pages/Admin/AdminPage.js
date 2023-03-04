import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminPage.css";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const [sendReq, setSendReq] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("/tasks", sendReq);
  console.log(data);

  const handleDelete = async (e) => {
    const deleteData = {
      title: e.title,
      desc: e.desc,
      time: e.time,
      display: !e.display,
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
  const setTask = (e) => {
    console.log(e);
    navigate("/set-task", {
      state: {
        taskId: e,
      },
    });
  };

  return (
    <div>
      {!data ? (
        <></>
      ) : (
        <div className="loginUser">
          <div class="userContainer">
            <div className="todoList">
              <h3 className="userName">Kullanıcı: Admin </h3>
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
                            <IconButton size="small">
                              <ModeEditIcon
                                fontSize="inherit"
                                onClick={() => setTask(e.id)}
                              />
                            </IconButton>
                            <IconButton color="error" size="small">
                              <DeleteIcon
                                fontSize="inherit"
                                onClick={() => handleDelete(e)}
                              />
                            </IconButton>
                          </div>
                          <span className="cardTitle">{e.title}</span>
                          <span className="endTime">{e.time}</span>
                          <span className="cardDesc">{e.desc}</span>
                          <span className="owner">Task Sahibi:{e.owner}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div className="card-deleted">
                          <div className="delete">
                            <IconButton size="small">
                              <ModeEditIcon
                                fontSize="inherit"
                                onClick={() => setTask(e.id)}
                              />
                            </IconButton>
                            <IconButton color="success" size="small">
                              <ArrowBackIcon
                                fontSize="inherit"
                                onClick={() => handleDelete(e)}
                              />
                            </IconButton>
                          </div>
                          <span className="deletedCardTitle">{e.title}</span>
                          <span className="deletedEndTime">{e.time}</span>
                          <span className="cardDesc">{e.desc}</span>
                          <span className="owner">Task Sahibi:{e.owner}</span>
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

export default AdminPage;
