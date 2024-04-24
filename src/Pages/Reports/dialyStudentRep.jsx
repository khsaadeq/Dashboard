import {
  ConfigProvider,
  DatePicker,
  Space,
  Table,
} from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import 
// TableComponent,
 {
  ButtonCard,
  ButtonComponent,
  SearchInput,
} from "../../components/ShareComponents";

import { ArrowRightOutlined, PrinterOutlined } from "@ant-design/icons";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";

const DialyStudentRep = () => {
  const [schools, setSchools] = useState([]);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  const [todayDate, setTodayDate] = useState();
  // const columnsName = [
  //   // {
  //   //   key: "1",
  //   //   title: "رقم الطالب ",
  //   //   dataIndex: "id",
  //   //   align: "center",
  //   //   width: 90,
  //   // },
  //   {
  //     key: 2,
  //     title: "إسم الطالب",
  //     dataIndex: "name",
  //     align: "center",
  //     width: 350,
  //   },
  //   {
  //     key: 3,
  //     title: " من سورة",
  //     dataIndex: "from_surah",
  //     align: "center",
  //     width: 100,
  //   },
  //   {
  //     key: 4,
  //     title: " من اية",
  //     dataIndex: "from_ayah",
  //     align: "center",
  //     width: 80,
  //   },

  //   {
  //     key: 5,
  //     title: " الى سورة",
  //     dataIndex: "to_surah",
  //     align: "center",
  //     width: 100,
  //   },
  //   {
  //     key: 6,
  //     title: " الى اية",
  //     dataIndex: "to_ayah",
  //     align: "center",
  //     width: 80,
  //   },
  //   {
  //     key: 7,
  //     title: "  نوع الانجاز",
  //     dataIndex: "seve_or_ver",
  //     align: "center",
  //     width: 120,
  //     filters: [
  //       { text: "حفظ", value: "حفظ" },
  //       { text: "مراجعة", value: "مراجعة" },
  //     ],
  //     onFilter: (value, record) => record.seve_or_ver === value,
  //   },
  //   {
  //     key: 9,
  //     title: "   الدرجة",
  //     dataIndex: "degree",
  //     align: "center",
  //     width: 80,
  //   },
  //   {
  //     key: 10,
  //     title: "    التاريخ",
  //     dataIndex: "day_date",
  //     align: "center",
  //     width: 150,
  //   },
  //   {
  //     key: "11",
  //     title: " الحلقة",
  //     dataIndex: "school_name",
  //     align: "center",
  //     width: 250,
  //     filters: schools,
  //     onFilter: (value, record) => record.school_name === value,
  //   },
  // ];
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Daily__Business/index`)
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
        data.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilter(filter);
    } else {
      const filter = data.filter(
        (data) =>
          data.name.toLowerCase().startsWith(search.toLowerCase()) &&
          data.day_date === todayDate
      );
      setFilter(filter);
    }
    return () => {};
  }, [search, data, todayDate]);

  return (
    <>
      <div className="title">
        <h2>صفحة التقرير اليومي للطلاب</h2>
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
            className="custom-select"
            size="large"
            style={{width:'250px'}}
            placeholder="تحديد التاريخ"
            onChange={(date, dateString) => {
              setTodayDate(dateString);
            }}
          />
           <ButtonComponent
          style={{ backgroundColor:'rgb(3,155, 140)'}}
            title={"طباعة البيانات"}
            icon={<PrinterOutlined />}
            type={"primary"}
            onClick={() => {
             const printableContent=document.getElementById('table')
             const printWindow=window.open('','','height=1000,width=1000')
             printWindow.document.write(printableContent.innerHTML)
             printWindow.print()
            }}
          />
        </Space>
      </div>
      <div className="table" id="table">
        {/* <TableComponent columnsName={columnsName} data={filter} /> */}

            <ConfigProvider
            theme={{

              components:{
                Table:{

                  colorPrimary:'rgb(3,155, 140)',
                  colorPrimaryBorder:'rgb(190,139,50)'
                }
              }
            }}  
            >

          

        <Table
         dataSource={filter}
         pagination={false}
         rowKey={(record) => record.id}
         scroll={true}
        //  pagination={{ pageSize: 5 }}
         bordered={true}>
          <Column title="إسم الطالب" dataIndex="name" width={300} key={2}  align={'center'}  />
          <ColumnGroup title="مــــن">
            <Column title="سورة" dataIndex="from_surah" width={80} key={3} align={'center'} />
            <Column title="اية" dataIndex="from_ayah" key={4}  width={60} align={'center'} />
          </ColumnGroup>
          <ColumnGroup title="الـــى">
            <Column title="سورة" dataIndex="to_surah"  width={80} key={5} align={'center'} />
            <Column title="اية" dataIndex="to_ayah"  width={60} key={6} align={'center'} />
          </ColumnGroup>
          <Column title="نوع الانجاز"
           dataIndex="seve_or_ver" 
           align={'center'}
           key={7}
           width={120}
           filtered={true}
           filters={ [
             { text: "حفظ", value: "حفظ" },
             { text: "مراجعة", value: "مراجعة" },
           ]}
           onFilter={(value, record) => record.seve_or_ver === value}/>
           <Column title="الدرجة" dataIndex="degree" align={'center'} width={80} key={8} />
           <Column title="التاريخ" dataIndex="day_date"  width={140} align={'center'} key={9} />
           <Column title=" الحلقة"
           dataIndex="school_name" 
           key={10}
           align={'center'}
           width={210}
           filtered={true}
           filters={schools}
           onFilter={(value, record) => record.school_name === value}/>
        </Table>

        </ConfigProvider>
      </div>
    </>
  );
};

export default DialyStudentRep;
