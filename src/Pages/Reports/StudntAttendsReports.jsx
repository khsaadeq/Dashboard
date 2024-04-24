import {DatePicker,Space,} from "antd";
  import { useEffect } from "react";
  import axios from "axios";
  import { useState } from "react";
  import TableComponent, {ButtonCard,SearchInput,} from "../../components/ShareComponents";

  import { ArrowRightOutlined } from "@ant-design/icons";
  import '../../App.css'
  const StudntAttendsReports = () => {
    const [schools, setSchools] = useState([]);
  
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
  
    const [todayDate, setTodayDate] = useState();
    const columnsName = [
      // {
      //   key: "1",
      //   title: "id  ",
      //   dataIndex: "id",
      //   align: "center",
      //   width: 90,
      // },
      {
        key: 2,
        title: "إسم الطالب",
        dataIndex: "student_name",
        align: "center",
        width: 350,
      },
      {
        key: 3,
        title: " الحالة ",
        dataIndex: "atendances_name",
        align: "center",
        width: 200,
        filters: [
          { text: " حاضر " , value: " حاضر " },
          { text: "غائب", value: " غائب " }, 
          { text: "غائب باذن", value: " غائب باذن " }, 
          { text: "حضر ولم يسمع", value: " حضر ولم يسمع " }, 
          { text: "إنصراف بإذن", value: " إنصراف بإذن " }, 
        ],
        onFilter: (value, record) => record.atendances_name === value,
      },
      {
        key: 4,
        title: " التاريخ ",
        dataIndex: "day_date",
        align: "center",
        width: 200,
      },
     
      {
        key: 5,
        title: " الحلقة",
        dataIndex: "school_name",
        align: "center",
        width: 300,
        filters: schools,
        onFilter: (value, record) => record.school_name === value,
      },
    ];
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/Attendance_student/index`)
        .then((response) => {
          setData(response.data);
        });
      return () => {};
    }, []);
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/quran_episod/index`)
        .then((response) => {
          setSchools(
            response.data.map((e) => ({
              value: e.name,
              text: e.name,
            }))
          );
        });
      return () => {};
    }, []);
    useEffect(() => {
      setFilter(data);
      return () => {};
    }, [data]);
    /////////////<< دالة البحث >>
    useEffect(() => {
      if (!todayDate) {
        const filter = data.filter((data) =>
          data.student_name.toLowerCase().startsWith(search.toLowerCase())
        );
        setFilter(filter);
      } else {
        const filter = data.filter(
          (data) =>
            data.student_name.toLowerCase().startsWith(search.toLowerCase()) &&
            data.day_date === todayDate
        );
        setFilter(filter);
      }
      return () => {};
    }, [search, data, todayDate]);
  
    return (
      <>
        <div className="title">
          <h2> تقرير حضور وغياب</h2>
        </div>
        <div className="header-container">
          <Space align="center">
            <ButtonCard
              path="../home/reports/"
              title={"رجوع"}
              icon={<ArrowRightOutlined />}
            />
  
            <SearchInput
              placeholder={"بحث حسب إسم الطالب"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <DatePicker
             style={{width:'250px'}}
              size="large"
              placeholder="تحديد التاريخ"
              onChange={(date, dateString) => {
                setTodayDate(dateString);
              }}
            />
          </Space>
        </div>
        <div className="table">
          <TableComponent columnsName={columnsName} data={filter} />
  
         
        </div>
      </>
    );
  };
  
  export default StudntAttendsReports;
  