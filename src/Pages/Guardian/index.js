import { useEffect, useState } from "react";
import Controller, { EditGuardian } from "./controller";
import { Space, Modal } from "antd";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import TableComponent, {
  ButtonComponent,
  ModalComponent,
  SearchInput,
  ExportDataToExcel,
} from "../../components/ShareComponents";
import "../../App.css";
import axios from "axios";
const Guardian = () => {
  const [isAddModalOpen, setIsAddModelOpen] = useState(false);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  /////////////////////////////////////////////////////////////////
  const [editData, setEditData] = useState({});

  const columnsName = [
    {
      key: 1,
      title: "الرقم",
      dataIndex: "id",
      align: "center",
      width: 80,
    },
    {
      key: 2,
      title: "إسم ولي الامر",
      dataIndex: "name",
      align: "center",
      width: 200,
    },
    {
      key: 3,
      title: "الجنـس",
      dataIndex: "gender_name",
      align: "center",
      width: 100,
    },
    {
      key: 4,
      title: " الوظيــفة",
      dataIndex: "job",
      align: "center",
      width: 150,
    },

    {
      key: 5,
      title: "الحالة الإجتماعية",
      dataIndex: "social_status",
      align: "center",
      width: 100,
    },
    {
      key: 6,
      title: "البريد الإلكتروني",
      dataIndex: "email",
      align: "center",
      width: 120,
    },
    {
      key: 7,
      title: "رقم الهاتف ",
      dataIndex: "phone",
      align: "center",
      width: 120,
    },

    {
      key: 8,
      title: " Action",
      align: "center",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {}}
              style={{ color: "blue", marginLeft: "12px" }}
            />
            <EditOutlined
              onClick={() => {
                setEditData({
                  id: record.id,
                  name: record.name,
                  gender_id: record.gender_id,
                  social_status: record.social_status,
                  email: record.email,
                  phone: record.phone,
                  job: record.job,
                });

                setIsEditModelOpen(true);
              }}
              style={{ color: "green" }}
            />
            <DeleteOutlined
              onClick={() => {
                deleteGuardian(record.id);
              }}
              style={{ color: "red", marginRight: "12px" }}
            />
          </>
        );
      },
    },
  ];
  function deleteGuardian(id) {
    Modal.confirm({
      title: "هل تريد حذف البيانات ؟",
      onOk: () => {
        fetch(`http://127.0.0.1:8000/api/guardian/destroy/${id}`);
        // window.location.reload();
        // deleted === true ? setDeleted(false) : setDeleted(true);
        setUpdate(!update);
      },
    });
  }

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/guardian/index`)
      .then((response) => {
        setData(
          response.data.map((e) => ({
            id: e.id,
            name: e.name,
            gender_id: e.gender_id ,
            gender_name:e.gender_name,
            job: e.job,
            social_status: e.social_status,
            email: e.email,
            phone: e.phone,
          }))
        );
        setExcelData(response.data.map((e) => ({
          id: e.id,
          name: e.name,
          gender_name:e.gender_name,
          job: e.job,
          social_status: e.social_status,
          email: e.email,
          phone: e.phone,
        })))
      });
    return () => {};
  }, [isAddModalOpen, update]);

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
      <div className="header-container">
        <Space align="center">
          <ButtonComponent
          style={{ backgroundColor:'rgb(3,155, 140)'}}
            title={"إضافة ولي امر جديد"}
            icon={<UserAddOutlined />}
            type={"primary"}
            onClick={() => {
              setIsAddModelOpen(true);
            }}
          />

          <SearchInput
            placeholder={"بحث عن ولي امر"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <ButtonComponent
            title={"تصدير الى الإكسل"}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => {
              ExportDataToExcel("اولياء الامور", excelData, columnsName);
            }}
          />
        </Space>
      </div>

      <div className="table">
        <TableComponent columnsName={columnsName} data={filter} />
        <ModalComponent
          title={" إضافة ولي امر جديد "}
          open={isAddModalOpen}
          cancel={setIsAddModelOpen}
          content={<Controller close={setIsAddModelOpen} />}
        />

        <ModalComponent
          title={"تعديل بيانات ولي الأمر"}
          open={isEditModalOpen}
          cancel={setIsEditModelOpen}
          content={
            <EditGuardian
              close={setIsEditModelOpen}
              data={editData}
              setUpdate={setUpdate}
              update={update}
            />
          }
        />
      </div>
    </>
  );
};

export default Guardian;
