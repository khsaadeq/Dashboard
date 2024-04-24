import { useEffect, useState } from "react";
import { Modal, Space } from "antd";
import {
  UserAddOutlined,
  FileExcelOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TableComponent, {
  ModalComponent,
  ButtonComponent,
  SearchInput,
  ExportDataToExcel,
} from "../../components/ShareComponents";
import Controller from "../Guardian/controller";
import AddForm, { ShowStudentDetails } from "./controller";
import axios from "axios";


const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuradianModalOpen, setIsGuradianModalOpen] = useState(false);
  const [isShowDataModalOpen, setIsShowDataModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const columnsName = [
    // {
    //   key: "1",
    //   title: "رقم الطالب ",
    //   dataIndex: "id",
    //   align: "center",
    // },
    {
      key: "2",
      title: "إسم الطالب",
      dataIndex: "name",
      align: "center",
      width: 300,
    },
    {
      key: "4",
      title: "الجنسية",
      dataIndex: "nationality_name",
      align: "center",
      width: 150,
    },
    {
      key: "5",
      title: "تاريخ الميلاد",
      dataIndex: "birth_date",
      align: "center",
    },
    {
      key: "6",
      title: " الحلقة",
      dataIndex: "school_name",
      align: "center",
      width: 250,
      filters: schools,
      onFilter: (value, record) => record.school_name === value,
    },
    {
      key: "8",
      title: " Action",
      align: "center",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                setShowData(
                  {...showData,name:record.name,
                    parent_name:record.parent_name,
                    nationality_name:record.nationality_name,
                    identity_name:record.identity_name,
                    number_identity:record.number_identity,
                    address:record.address,
                    date_Join:record.date_Join,
                    phone:record.phone,
                    email:record.email,
                    link_kinship:record.link_kinship,
                    school:record.school,
                    birth_date:record.birth_date,

                  
                })
                setIsShowDataModalOpen(true)
              }}
              style={{ color: "blue", marginLeft: "12px" }}
            />
            <EditOutlined onClick={() => {}} style={{ color: "green" }} />
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  title: "هل تريد حذف البيانات ؟",
                  onOk: () => {
                    axios.get(
                      `http://127.0.0.1:8000/api/student/destroy/${record.id}`
                    );
                    setUpdate(!update);
                  },
                });
              }}
              style={{ color: "red", marginRight: "12px" }}
            />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/student/index`).then((response) => {
      setData(response.data);
    });
    return () => {};
  }, [update,isModalOpen]);
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
  useEffect(() => {
    const filter = data.filter((data) =>
      data.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilter(filter);
    return () => {};
  }, [search, data]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Space align="center">
          <ButtonComponent
          style={{ backgroundColor:'rgb(3,155, 140)'}}
            title={"  إضافة طالب جديد  "}
            icon={<UserAddOutlined />}
            type={"primary"}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />

          <SearchInput
            placeholder={"بحث عن طالب"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ButtonComponent
            title={"تصدير الى الإكسل"}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => {
              ExportDataToExcel("الطلاب", data, columnsName)
            }}
          />
        </Space>
      </div>
      <div className="table">
        <TableComponent columnsName={columnsName} data={filter} />
      </div>

      <ModalComponent
        width={700}
        title="إضافة طالب جديد"
        open={isModalOpen}
        cancel={setIsModalOpen}
        content={<AddForm close={setIsModalOpen} />}
      />

      <ModalComponent
        title=" إضافة ولي امر جديد "
        open={isGuradianModalOpen}
        cancel={setIsGuradianModalOpen}
        content={<Controller close={setIsGuradianModalOpen} />}
      />
      <ModalComponent
        title={<h3> بيانات الطالب </h3>}
        open={isShowDataModalOpen}
        cancel={setIsShowDataModalOpen}
        content={<ShowStudentDetails showData={showData}/>}
      />
    </>
  );
};

export default Students;
