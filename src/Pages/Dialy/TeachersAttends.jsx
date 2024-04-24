import { DatePicker, Modal, Radio, Select, Space, message } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TableComponent, { ButtonCard } from "../../components/ShareComponents";
import { ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TeachersAttends = () => {
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dateFormat = "YYYY/MM/DD";
  const columnsName = [
    // {
    //   key: "1",
    //   title: "رقم الطالب ",
    //   dataIndex: "id",
    //   align: "center",
    //   width: 90,
    // },
    {
      key: 2,
      title: "إسم المعلم",
      dataIndex: "name",
      align: "center",
      width: 500,
    },
    {
      key: 8,
      title: " الحالة",
      align: "center",
      width:300,
      render: (record) => {
        return (
          <>
            <Radio.Group
              name="radiogroup"
              onChange={(e) => {
                Modal.confirm({
                  title: `هل تريد تحضير المعلم ${record.name} ؟`,
                  onOk: () => {
                    axios
                      .post(
                        "http://127.0.0.1:8000/api/Attendance_teacher/store",
                        {
                          teacher_id: record.id,
                          id_atendances: e.target.value,
                          day_date: todayDate,
                        }
                      )
                      .then((response) => {
                        message.open({
                          type: "success",
                          content: "تمة عملية التحضير بنجاح",
                          duration: 3,
                        });
                      })
                      .catch((error) => {
                        console.error(error.response);
                      });
                  },
                  onCancel: () => {
                    console.log(e.target);
                  },
                });
              }}
            >
              <Radio value={1}>حاضر</Radio>
              <Radio value={2}>غائب</Radio>
              <Radio value={3}>غائب بإذن</Radio>
            </Radio.Group>
          </>
        );
      },
    },
  ];

  // const [StudentName, setStudentName] = useState(false);

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/teacher/all_emp_index`).then((response) => {
      setTeachers(
        response.data.map((e) => ({
          id: e.id,
          name: e.name,
        }))
      );
    });
    return () => {};
  }, []);
  //////////////////////////////////////////

  /////////////////////////////////////////
  return (
    <>
      <div className="title">
        <h2>تحضير المعلمين</h2>
      </div>
      <div className="header-container">
        <Space align="center">
          <ButtonCard
            path="../home/dialy/"
            title={"رجوع"}
            icon={<ArrowRightOutlined />}
          />

          <DatePicker
            defaultValue={dayjs(todayDate, dateFormat)}
            style={{ width: "250px" }}
            placeholder="تحديد التاريخ"
            className="custom-select"
            size="large"
            onChange={(date, dateString) => {
              setTodayDate(dateString);
            }}
          />
        </Space>
      </div>
      <div className="table">
        <TableComponent columnsName={columnsName} data={teachers} />
      </div>
    </>
  );
};

export default TeachersAttends;
