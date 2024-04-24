import { Button, Form, Input, Radio, Space } from "antd";
import TableComponent, {
  ButtonComponent,
  ModalComponent,
  SearchInput,
} from "../../components/ShareComponents";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columnsName = [
    {
      key: 1,
      title: "رقم المستخدم",
      dataIndex: "id",
      align: "center",
      width: 200,
    },
    {
      key: 2,
      title: "إسم المستخدم",
      dataIndex: "user_name",
      align: "center",
      width: 250,
    },
    {
      key: 3,
      title: "الايميل",
      dataIndex: "email",
      align: "center",
      width: 250,
    },
    {
      key: 4,
      title: " رقم الهاتف",
      dataIndex: "phone",
      align: "center",
      width: 250,
    },

    {
      key: 5,
      title: " Action",
      align: "center",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {}}
              style={{ color: "blue", marginLeft: "12px" }}
            />
            <EditOutlined onClick={() => {}} style={{ color: "green" }} />
            <DeleteOutlined
              onClick={() => {}}
              style={{ color: "red", marginRight: "12px" }}
            />
          </>
        );
      },
    },
  ];

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
            style={{ backgroundColor: "rgb(3,155, 140)" }}
            title={"  إضافة مستخدم جديد  "}
            icon={<PlusCircleOutlined />}
            type={"primary"}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />

          <SearchInput
            placeholder={"بحث عن طالب"}
            onChange={(e) => {
              // setSearch(e.target.value);
            }}
          />
          <ButtonComponent
            title={"تصدير الى الإكسل"}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => {
              // ExportDataToExcel("الطلاب", data, columnsName)
            }}
          />
        </Space>
      </div>

      <div className="table">
        <TableComponent columnsName={columnsName} />
      </div>
      <ModalComponent
        title={"إضافة مستخدم جديد"}
        open={isModalOpen}
        cancel={setIsModalOpen}
        content={
          <>
            <Form>
              <Form.Item
                label=" إسم المستخدم بالكامل "
                name="user_name"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    // setData({ ...data, email: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label=" إسم تسجيل الدخول "
                name="email"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    // setData({ ...data, email: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item name="gender_id" label="نوع المستخدم">
                <Radio.Group>
                  <Radio value="مدير"> مدير </Radio>
                  <Radio value="مشرف"> مشرف </Radio>
                  <Radio value="معلم"> معلم </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="كلمة المرور "
                name="password"
                rules={[
                  {
                    required: true,
                    message: "يرجى إدخال كلمة المرور",
                  },
                ]}
              >
                <Input />
              </Form.Item>

            <Space >
            <Button htmlType="submit">
                إضافة
              </Button>
            </Space>
            </Form>
          </>
        }
      />
    </>
  );
};

export default User;
