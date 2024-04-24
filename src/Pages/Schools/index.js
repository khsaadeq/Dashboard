import {
  Space,
  Button,
  Form,
  Input,
  Select,
  Radio,
  message,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "../../App.css";
import TableComponent, {
  ButtonComponent,
  ExportDataToExcel,
  ModalComponent,
  SearchInput,
} from "../../components/ShareComponents";
import axios from "axios";
const Schools = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const columnsName = [
    // {
    //   key: "1",
    //   title: "رقم الحلقة ",
    //   dataIndex: "id",
    //   align: "center",
    //   width: 90,
    // },
    {
      key: 2,
      title: "إسم الحلقة",
      dataIndex: "name",
      align: "center",
      width: 200,
    },
    {
      key: 3,
      title: " نوع الحلقة ",
      dataIndex: "system_episodes_name",
      align: "center",
      width: 120,
    },
    {
      key: 4,
      title: "  الفئة ",
      dataIndex: "gender_name",
      align: "center",
      width: 100,
    },
    {
      key: 5,
      title: " الفترة ",
      dataIndex: "period_name",
      align: "center",
      width: 100,
    },
    {
      key: 6,
      title: "مدرس الحلقة",
      dataIndex: "teacher_name",
      align: "center",
      width: 250,
    },
    {
      key: 7,
      title: " عدد الطلاب  ",
      dataIndex: "studentsNumber",
      align: "center",
      width: 100,
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
                setDataEdit({
                  id: record.id,
                  name: record.name,
                  gender_id: record.gender_id,
                  period: record.period,
                  teacher_id: record.teacher_id,
                  system_episoded_id: record.system_episoded_id,
                });

                setIsEditModalOpen(true);
              }}
              style={{ color: "green" }}
            />
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  title: "هل تريد حذف البيانات ؟",
                  onOk: () => {
                    console.log(record.id);
                    fetch(
                      `http://127.0.0.1:8000/api/quran_episod/destroy/${record.id}`
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
    axios
      .get(`http://127.0.0.1:8000/api/quran_episod/index`)
      .then((response) => {
        setData(
          response.data.map((e) => ({
            id: e.id,
            name: e.name,
            gender_id: e.gender_id,
            gender_name: e.gender_id === 1 ? "ذكور" : "اناث",
            period_name: e.period === 1 ? "صباح" : "مساء",
            period: e.period,
            system_episoded_id: e.system_episoded_id,
            system_episodes_name: e.system_episodes_name,
            teacher_id: e.teacher_id,
            teacher_name: e.teacher_name,
            studentsNumber: e.student_number,
          }))
        );
      });
    return () => {};
  }, [update]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/teacher/index`).then((response) => {
      setTeachers(
        response.data.map((e) => ({
          id: e.id,
          name: e.name,
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
      <div className="header-container">
        <Space align="center">
          <ButtonComponent
          style={{ backgroundColor:'rgb(3,155, 140)'}}
            title={"إضافة حلقة جديدة"}
            icon={<PlusCircleOutlined />}
            type={"primary"}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
          <SearchInput
            placeholder={"بحث عن حلقة"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ButtonComponent
            title={"تصدير الى الإكسل"}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => {
              ExportDataToExcel("الحلقات", data, columnsName);
            }}
          />
        </Space>
      </div>

      <div className="table">
        <TableComponent columnsName={columnsName} data={filter} />
      </div>

      <ModalComponent
        title={"إضافة حلقة جديدة"}
        open={isModalOpen}
        cancel={setIsModalOpen}
        content={
          <>
            <Form
              onFinish={(values) => {
                axios
                  .post("http://127.0.0.1:8000/api/quran_episod/store", values)
                  .then((response) => {
                    message.open({
                      type: "success",
                      content: "تمت عملية الإضافة بنجاح",
                      duration: 3,
                    });
                    setUpdate(!update);
                    setIsModalOpen(false);
                  })
                  .catch((error) => {
                    console.error(error.response);
                  });
              }}
            >
              <Form.Item
                label="إسم الحلقة"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "يرجى إدخال إسم الحلقة",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="system_episoded_id" label="نوع الحلقة">
                <Select>
                  <Select.Option value="1">تلقين </Select.Option>
                  <Select.Option value="2"> تسميع</Select.Option>
                  <Select.Option value="3">تلاوة </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="gender_id" label=" الفئة الخاصة بالحلقة">
                <Radio.Group>
                  <Radio value="1"> ذكور </Radio>
                  <Radio value="2"> اناث </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="period" label="  مواعيد الحلقة ">
                <Select>
                  <Select.Option value="1"> صباح</Select.Option>
                  <Select.Option value="2">مساء </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="teacher_id" label="مدرس الحلقة">
                <Select>
                  {teachers.map((e) => (
                    <Select.Option value={e.id} key={`${e.id}`}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Space>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    إضافة
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </>
        }
      />

      <ModalComponent
        title={"تعديل بيانات الحلقة"}
        open={isEditModalOpen}
        cancel={setIsEditModalOpen}
        content={<EditSchool />}
      />
    </>
  );

  function EditSchool(props) {
    return (
      <>
        <Form
          onFinish={(values) => {
            axios
              .post(
                `http://127.0.0.1:8000/api/quran_episod/update/${dataEdit.id}`,
                values
              )
              .then((response) => {
                message.open({
                  type: "success",
                  content: "تمت عملية التعديل بنجاح",
                  duration: 3,
                });
                setUpdate(!update);
                setIsEditModalOpen(false);
              })
              .catch((error) => {
                console.error(error.response);
              });
            console.log(values);
          }}
        >
          <Form.Item
            initialValue={`${dataEdit.name}`}
            label="إسم الحلقة"
            name="name"
            rules={[
              {
                required: true,
                message: "يرجى إدخال إسم الحلقة",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="system_episoded_id"
            label="نوع الحلقة"
            initialValue={`${dataEdit.system_episoded_id}`}
          >
            <Select>
              <Select.Option value="1">تلقين </Select.Option>
              <Select.Option value="2"> تسميع</Select.Option>
              <Select.Option value="3">تلاوة </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            initialValue={`${dataEdit.gender_id}`}
            name="gender_id"
            label=" الفئة الخاصة بالحلقة"
          >
            <Radio.Group>
              <Radio value="1"> ذكور </Radio>
              <Radio value="2"> اناث </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            initialValue={`${dataEdit.period}`}
            name="period"
            label="  مواعيد الحلقة "
          >
            <Radio.Group>
              <Radio value="1"> صباح </Radio>
              <Radio value="2"> مساء </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            initialValue={dataEdit.teacher_id}
            name="teacher_id"
            label="مدرس الحلقة"
          >
            <Select>
              {teachers.map((e) => (
                <Select.Option value={e.id} key={`${e.id}`}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Space>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                حفظ
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </>
    );
  }
};

export default Schools;
