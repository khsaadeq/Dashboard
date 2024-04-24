import React, { useEffect, useState } from "react";
import TableComponent, {
  ButtonComponent,
  ModalComponent,
  SearchInput,
} from "../../components/ShareComponents";
import { Modal, Space, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddForm from "./forms";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([])
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(true)
  const columnsName = [
    // {
    //   key: 1,
    //   title: "رقم الموظف",
    //   dataIndex: "id",
    //   align: "center",
    //   width: 100,
    // },
    {
      key: 2,
      title: "إسم  الموظف",
      dataIndex: "name",
      align: "center",
      width: 400,
    },
    {
      key: 4,
      title: " الوظيــفة",
      dataIndex: "job_name",
      align: "center",
      width: 200,
    },

    {
      key: 5,
      title: "رقم الهاتف",
      dataIndex: "phone",
      align: "center",
      width: 150,
    },
    {
      key: 6,
      title: "الايميل ",
      dataIndex: "email",
      align: "center",
      width: 150,
    },


    {
      key: 7,
      title: " Action",
      align: "center",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              onClick={() => { }}
              style={{ color: "blue", marginLeft: "12px" }}
            />
            <EditOutlined onClick={() => { }} style={{ color: "green" }} />
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  title: "هل تريد حذف البيانات ؟",
                  onOk: () => {
                    axios
                      .get(
                        `http://127.0.0.1:8000/api/teacher/destroy/${record.id}`,

                      )
                      .then((response) => {
                        message.open({
                          type: "success",
                          content: "تمت عملية الحذف بنجاح",
                          duration: 3,
                        });
                        setUpdate(!update);
                      })
                      .catch((error) => {
                        console.error(error.response);
                      });



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
    axios.get(`http://127.0.0.1:8000/api/teacher/emp_index`).then((response) => {
      setData(
        response.data.map((e) => ({
            id: e.id,
            salary:e.salary,
            name: e.name,
            address: e.address,
            job_date: e.job_date,
            phone: e.phone,
            email: e.email,
            job_id: e.job_id,
            job_name:e.job_name,
            qualification_study_id:e.qualification_study_id,
        }))
      );
    });
    return () => { };
  }, [update,isModalOpen]);

  useEffect(() => {
    setFilter(data);
    return () => {};
  }, [data]);


  useEffect(() => {
    const filter = data.filter((data) =>
      data.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilter(filter)
    return () => {};
  }, [search,data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <Space align="center">
          <ButtonComponent
          style={{ backgroundColor:'rgb(3,155, 140)'}}
            title={"  إضافة موظف جديد  "}
            icon={<UserAddOutlined />}
            type={"primary"}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />

          <SearchInput placeholder={"بحث عن موظف"}  onChange={(e) => {
              setSearch(e.target.value);
            }} />
          <ButtonComponent
            title={"تصدير الى الإكسل"}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => { }}
          />
        </Space>
      </div>
      <div className="table">
        <TableComponent columnsName={columnsName} data={filter} />
      </div>
      <ModalComponent
        width={700}
        title="إضافة موظف جديد"
        open={isModalOpen}
        cancel={setIsModalOpen}
        content={<AddForm close={setIsModalOpen} />}
      />
    </>
  );
};

export default Employees;
