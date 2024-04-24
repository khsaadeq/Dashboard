import {
  ArrowRightOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../App.css";
import TableComponent, {
  ButtonCard,
  ButtonComponent,
  SearchInput,
} from "../../components/ShareComponents";
import { DatePicker, Modal, Select, Space } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
const EmpMonthlyRep = () => {
  const [data, setData] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const columnsName = [
    // {
    //   key: "1",
    //   title: "رقم الموظف ",
    //   dataIndex: "id",
    //   align: "center",
    //   width: 90,
    // },
    {
      key: 2,
      title: "إسم الموظف",
      dataIndex: "name",
      align: "center",
      width: 250,
    },
    {
      key: 2,
      title: "عدد الغياب",
      dataIndex: "numberOfAbsences",
      align: "center",
      width: 110,
    },

    {
      key: 3,
      title: "الوظيفة",
      dataIndex: "job_name",
      align: "center",
      width: 100,
    },
    {
      key: 4,
      title: "إجمالي الراتب",
      dataIndex: "salary",
      align: "center",
      width: 200,
    },
    {
      key: 5,
      title: "إجمالي الخصم",
      dataIndex: "opponent",
      align: "center",
      width: 200,
    },
    {
      key: 6,
      title: " الراتب المستحق",
      dataIndex: "payable",
      align: "center",
      width: 200,
    },
  ];
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/teacher/all_emp_index`)
      .then((response) => {
        setTeachers(
          response.data.map((e) => ({
            id: e.id,
            name: e.name,
          }))
        );
      });
    return () => {};
  }, []);

  return (
    <>
      <div className="title">
        <h2>صفحة التقرير الشهري للمعلمين</h2>
      </div>
      <div className="header-container">
        <Space align="center">
          <ButtonCard
            path="../home/reports/"
            title={"رجوع"}
            icon={<ArrowRightOutlined />}
          />

          <Select
            onClear={() => {
              setTeacherId("");
            }}
            onChange={(value) => {
              setTeacherId(value);
            }}
            style={{ width: "200px", textAlign: "center" }}
            size="large"
            allowClear
            className="custom-select"
            showSearch
            placeholder="تحديد الموظف"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .startsWith(input.toLowerCase())
            }
            options={teachers.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
          />
          <DatePicker.RangePicker
            format="YYYY-MM-DD"
            className="custom-select"
            size="large"
            style={{ width: "250px" }}
            onChange={(date, dateString) => {
              setStartDate(dateString[0]);
              setEndDate(dateString[1]);
            }}
            onClear={()=>{
              setStartDate('');
              setEndDate('');
            }}
          />
          <ButtonComponent
            style={{ backgroundColor: "rgb(3,155, 140)" }}
            title={"بحث"}
            icon={<SearchOutlined />}
            type={"primary"}
            onClick={() => {
              if (teacherId ===""){
                Modal.error({
                  title: " خطأ ",
                  centered: true,
                  content: (
                    <h3 style={{ alignItems: "center" }}> يرجى إختيار موظف </h3>
                  ),
                });
              }
              else if (startDate === ""){
                Modal.error({
                  title: " خطأ ",
                  centered: true,
                  content: (
                    <h3 style={{ alignItems: "center" }}> يرجى إختيار تاريخ البداية </h3>
                  ),
                });
              }
              else if (endDate === ""){
                Modal.error({
                  title: " خطأ ",
                  centered: true,
                  content: (
                    <h3 style={{ alignItems: "center" }}> يرجىإختيار تاريخ النهاية </h3>
                  ),
                });
              }
            else
            {  axios
              .get(
                `http://127.0.0.1:8000/api/Attendance_teacher/emp_report/${teacherId}/${startDate}/${endDate}`
              )
              .then((response) => {
                setData(response.data);
              });
          }}}
          />
        </Space>
      </div>

      <div className="table">
        <TableComponent columnsName={columnsName} data={data} />
      </div>
    </>
  );
};

export default EmpMonthlyRep;
