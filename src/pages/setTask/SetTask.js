import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./setTask.css";
import Button from "@mui/material/Button";

const SetTask = () => {
  const [data, setData] = useState();
  const [newTime, setNewTime] = useState();
  const [newTitle, setNewTitle] = useState();
  const [newDesc, setNewDesc] = useState();
  const location = useLocation();
  const taskId = location.state.taskId;

  const navigate = useNavigate();

  useEffect(() => {
    const handleData = async () => {
      try {
        await fetch(`http://localhost:3000/tasks/${taskId}`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            setData(resp);
            setNewDesc(resp.desc);
            setNewTime(resp.time);
            setNewTitle(resp.title);
          });
      } catch (err) {
        console.log(err);
      }
    };
    handleData();
  }, []);
  const uploadTask = async (e) => {
    const newData = {
      title: newTitle,
      desc: newDesc,
      time: newTime,
      display: data.display,
      owner: data.owner,
    };
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newData),
      }).then(navigate("/user"));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {!data ? (
        <></>
      ) : (
        <div className="containerr">
          <div className="setTask">
            <h3>Taskı Düzenle</h3>
            <div className="endTimeContainer">
              <span>Tarih</span>
              <input
                type="date"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <div className="titleContainer">
              <span>Başlık</span>
              <input
                type="text"
                Value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="descContainer">
              <span>Açıklama</span>
              <textarea
              rows={20}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <Button variant="contained" color="success" onClick={uploadTask}>
              Taskı Güncelle
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetTask;
