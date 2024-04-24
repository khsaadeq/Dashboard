import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const schools = [
  {
    text: "1",
    value: 1,
  },
  {
    text: "2",
    value: 2,
  },
];

const columnsName = [
  {
    key: "1",
    title: "رقم الطالب ",
    dataIndex: "id",
    align: "center",
  },
  {
    key: "2",
    title: "إسم الطالب",
    dataIndex: "name",
    align: "center",
    width: 300,
  },
  {
    key: "3",
    title: "الجنس",
    dataIndex: "gender",
    align: "center",
  },
  {
    key: "4",
    title: "الجنسية",
    dataIndex: "nationality",
    align: "center",
    width: 150,
  },
  {
    key: "5",
    title: "تاريخ الميلاد",
    dataIndex: "birthday",
    align: "center",
  },
  {
    key: "6",
    title: " الحلقة",
    dataIndex: "school",
    align: "center",
    width: 250,
    filters: schools,
    onFilter: (value, record) => record.school.indexOf(value) === 0,
  },
  {
    key: "7",
    title: " Action",
    align: "center",
    render: (record) => {
      return (
        <>
          <EyeOutlined
            onClick={() => {
              editStudent(record);
            }}
            style={{ color: "blue", marginLeft: "12px" }}
          />
          <EditOutlined onClick={() => {}} style={{ color: "green" }} />
          <DeleteOutlined
            onClick={() => {
              deleteStudent(record);
            }}
            style={{ color: "red", marginRight: "12px" }}
          />
        </>
      );
    },
  },
];

const studentsName = [
  {
    key: "1",
    id: 1,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "2",
  },
  {
    key: "2",
    id: 2,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "1",
  },
  {
    key: 3,
    id: 3,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "1",
  },
  {
    key: 4,
    id: 4,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 5,
    id: 5,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 6,
    id: 6,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 7,
    id: 7,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 8,
    id: 8,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 9,
    id: 9,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
  {
    key: 10,
    id: 10,
    name: "محمد فؤاد",
    gender: "ذكر",
    nationality: "يمني",
    birthday: "1999-9-1",
    school: "3",
  },
];

const deleteStudent = (record) => {
  Modal.confirm({
    title: "هل تريد حذف بيانات الطالب؟",
    onOk: () => {
      console.log(record["id"]);
    },
  });
};

const editStudent = () => {};

export { columnsName, studentsName };
