import { Button, DatePicker, Form, Modal, Radio, Select, Space, message } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TableComponent, {
  ButtonCard,
  ModalComponent,
} from "../../components/ShareComponents";
import Achievement from "./Achievement";
import { ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const MemorizeHP = () => {
 
  const dateFormat = "YYYY/MM/DD";
  const [todayDate,setTodayDate]=useState(new Date().toISOString().split("T")[0])
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
      title: "إسم الطالب",
      dataIndex: "name",
      align: "center",
      width: 350,
    },
    {
      key: 8,
      title: " Action",
      align: "center",
      width: 200,
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                setStudentName(record.name);
                setStudentId(record.id);
                setIsModalOpen(true);
              }}
              style={{
                backgroundColor: "rgb(190,139,50)",
                fontWeight: "bold",
              }}
              type="primary"
              size="small"
            >
              إضافة إنجاز يومي
            </Button>
          </>
        );
      },
    },
    {
      key: 9,
      title: " الحالة",
      align: "center",
      render: (record) => {
        return (
          <>
         

            <Radio.Group
            // value={attendData.id_atendances}
              name="radiogroup" 
              onChange={(e) => {
                Modal.confirm({
                  title: `هل تريد تحضير الطالب ${record.name} ؟`,
                  onOk: () => {
                  
                    axios
                    .post("http://127.0.0.1:8000/api/Attendance_student/store",
                   {
                    id_student: record.id,
                    id_atendances:e.target.value,
                    day_date:todayDate


                   }
                    
                    )
                    .then((response) => {
                      message.open({
                        type: "success",
                        content: "تمة عملية التحضير بنجاح",
                        duration: 3,
                        });
                        setIsModalOpen(false);
                      })
                      .catch((error) => {
                        console.error(error.response);
                      });
                  },
                  onCancel:()=>{
                    console.log(e.target)
                    
                  }
                }
                );
              }}
            >
              <Radio value={1}>حاضر</Radio>
              <Radio value={2}>غائب</Radio>
              <Radio value={3}>غائب باذن</Radio>
              <Radio value={4}>حضر ولم يسمع</Radio>
              <Radio value={5}>إنصراف بإذن</Radio>
            </Radio.Group>
       
          </>
        );
      },
    },
  ];

  const [StudentName, setStudentName] = useState();
  const [StudentId, setStudentId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  
  // const [todayDate,setTodayDate]=useState(new Date().toLocaleDateString())
  // const today = new Date().toISOString();
  // const dateFormat = "YYYY/MM/DD";
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/quran_episod/index`)
      .then((response) => {
        setSchools(
          response.data.map((e) => ({
            id: e.id,
            name: e.name,
          }))
        );
      });
    return () => {};
  }, []);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/student/index`).then((response) => {
      setStudents(
        response.data.map((e) => ({
          id: e.id,
          name: e.name,
          quran_episod_id: e.quran_episod_id,
        }))
      );
    });
    return () => {};
  }, []);
  /////////////////////////////////
  useEffect(() => {
    setFilter(students);
    return () => {};
  }, [students]);

  useEffect(() => {
    if (search) {
      const filter = students.filter(
        (students) => students.quran_episod_id === search
      );
      setFilter(filter);
    } else {
      setFilter(students);
    }
    return () => {};
  }, [search]);
  ////////////////////////////////
  return (
    <>
      <div className="title">
        <h2>صفحة الانجاز اليومي</h2>
      </div>
      <div className="header-container">
        <Space align="center">
          {/* <ButtonCard
            path="../home/dialy/"
            title={"رجوع"}
            icon={<ArrowRightOutlined />}
          /> */}

          <Select
            onClear={() => {
              setSearch("");
            }}
            onChange={(value) => {
              setSearch(value);
            }}
            style={{ width: "200px", textAlign: "center" }}
            size="large"
            allowClear
            className="custom-select"
            showSearch
            placeholder="تحديد الحلقة"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .startsWith(input.toLowerCase())
            }
            options={schools.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
          />
          <DatePicker
            defaultValue={dayjs(todayDate, dateFormat)}
            style={{width:'250px'}}
            placeholder="تحديد التاريخ"
            className="custom-select"
            size="large"
            onChange={(date, dateString) => {
                setTodayDate(dateString)}}
          />
        </Space>
      </div>
      <div className="table">
        <TableComponent columnsName={columnsName} data={filter} />
      </div>

      <ModalComponent
        width={700}
        title={""}
        open={isModalOpen}
        cancel={setIsModalOpen}
        content={
          <Achievement
          date={todayDate}
            name={StudentName}
            id={StudentId}
            close={setIsModalOpen}
          />
        }
      />
    </>
  );
};

export default MemorizeHP;
