import React, { useEffect, useState } from "react";
import { Button, Statistic } from "antd";
import "../../App.css";
import axios from "axios";
const Dashboard = () => {
  const[data,setData]=useState([])
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/count`)
      .then((response) => {
        setData(response.data);
      });
    return () => {};
  }, []);
  return (
    <div className="parent">

      <div>
        <Statistic title="عدد الطلاب" value={data.students_number} />
      </div>

      <div>
        <Statistic title="عدد المعلمين" value={data.teachers_number} />
      </div>

      <div>
        <Statistic title="عدد الحلقات" value={data.schools_number} />
      </div>

      <div>
        <Statistic title="عدد اولياء الامور" value={data.parents_number} />
      </div>
    </div>
  );
};

export default Dashboard;
