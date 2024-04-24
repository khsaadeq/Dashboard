import {
    Button,
    Input,
    Radio,
    Select,
    Space,
    Form,
    DatePicker,
    Steps,
    message,
  } from "antd";
  import {
    UserOutlined,
    SolutionOutlined,
    LoginOutlined,
  } from "@ant-design/icons";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  
  const AddForm = (props) => {
    const [current, setCurrent] = useState(0);
    const [nationalities, setNationalities] = useState([]);
    
    const [data, setData] = useState([
      {
        name: "",
        salary: "",
        teaching_years: "",
        center_they_work: "",
        address: "",
        identity_id: "",
        number_identity: "",
        gender_id: "",
        nationality_id: "",
        job_date: "",
        qualification_study_id: "",
        email: "",
        phone: "",
        password: "",
        job_id: "",
      },
    ]);
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/index_nationality`)
        .then((response) => {
          setNationalities(
            response.data.map((e) => ({
              id: e.id,
              name: e.name,
            }))
          );
        });
      return () => {};
    }, []);
  
    const formContent = [
      <>
        <Form.Item
          label="إسم الموظف"
          name="name"
          rules={[
            {
              required: true,
              message: "يرجى إدخال إسم الموظف",
            },
          ]}
        >
          <Input
            style={{ width: "366px" }}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </Form.Item>
        <Space>
  
          <Form.Item name="nationality_id" label="الجنسية">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .startsWith(input.toLowerCase())
              }
              style={{ width: "250px" }}
              onChange={(value) => {
                setData({ ...data, nationality_id: value });
              }}
              options={nationalities.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
            />
          </Form.Item>
       
  
       
          <Form.Item label=" العنوان " name="address">
            <Input
              style={{ width: "250px" }}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
            />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item name="identity_id" label="نوع الهوية">
            <Select
              options={[
                { label: "جواز سفر", value: "1" },
                { label: "كرت التحصين", value: "2" },
                { label: "بطاقة شخصية ", value: "3" },
                { label: "شهادة ميلاد", value: "4" },
                { label: "بطاقه عائلية", value: "5" },
              ]}
              style={{ width: "250px" }}
              onChange={(value) => {
                setData({ ...data, identity_id: value,});
              }}
            />
          </Form.Item>
          <Form.Item label="رقم الهوية " name="number_identity">
            <Input
              style={{ width: "250px" }}
              onChange={(e) => {
                setData({ ...data, number_identity: e.target.value });
              }}
            />
          </Form.Item>
        </Space>
      </>,
      <>
        {/* <Form.Item label="سنوات التدريس" name="teaching_years">
          <Input
            style={{ width: "366px" }}
            onChange={(e) => {
              setData({ ...data, teaching_years: e.target.value });
            }}
          />
        </Form.Item> */}
        <Form.Item name="teaching_years" label=" سنوات التدريس">
        <Input
            style={{ width: "366px" }}
            onChange={(e) => {
              setData({ ...data, teaching_years: e.target.value });
            }}
          />
        </Form.Item>
  
        <Form.Item label=" مراكز التريس سابقاً" name=" center_they_work">
          <Input
            style={{ width: "366px" }}
            onChange={(e) => {
              setData({ ...data, center_they_work: e.target.value,job_id:2 });
            }}
          />
        </Form.Item>
        <Form.Item name="identity_id" label="المؤهل القراني">
            <Select
              options={[
                { label: "خاتم ", value: "1" },
                { label: " مجاز", value: "2" },
                { label: " قراءات ", value: "3" },
              ]}
              style={{ width: "250px" }}
              onChange={(value) => {
                setData({ ...data, qualification_study_id: value });
              }}
            />
          </Form.Item>
          <Form.Item name="job_id" label="نوع المستخدم">
                  <Radio.Group  onChange={(e) => {
                setData({ ...data, job_id: e.target.value });
              }}>
                    <Radio value="1"> مدير </Radio>
                    <Radio value="2"> مشرف </Radio>
                    <Radio value="4"> موجه</Radio>
                  </Radio.Group>
                </Form.Item>
  
        <Form.Item name="job_date" label="تاريخ التعيين">
          <DatePicker
            style={{ width: "240px" }}
            onChange={(date, dateString) => {
              setData({ ...data, job_date: dateString });
            }}
          />
        </Form.Item>
  
        <Space>
     <Form.Item label="الراتب" name="salary">
        <Input
          onChange={(e) => {
            setData({ ...data, salary: e.target.value });
          }}
        />
      </Form.Item>
     </Space>
      </>,
      <>
        <Form.Item label="رقم الهاتف " name="phone">
          <Input
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          label=" الايميل "
          name="email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
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
          <Input.Password
            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value,
                password_confirmation: e.target.value,
              });
            }}
          />
        </Form.Item>
      </>,
    ];
    return (
      <>
        <Steps
          current={current}
          items={[
            {
              title: "البيانات الشخصية",
  
              icon: <UserOutlined />,
            },
            {
              title: "بيانات  الوظيفة",
  
              icon: <SolutionOutlined />,
            },
  
            {
              title: "إنشاء الحساب ",
  
              icon: <LoginOutlined />,
            },
          ]}
        />
  
        <Form onFinish={(values) => {}} scrollToFirstError={true}>
          <div style={{ marginTop: 24 }}>{formContent[current]}</div>
  
          <div style={{ marginTop: 24 }}>
            {current < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                  // console.log(data)
                }}
              >
                التالي
              </Button>
            )}
            {current ===2 && (
              <Button onClick={()=>{
                   
                console.log(data)
                axios
                .post("http://127.0.0.1:8000/api/teacher/store", data,)
                .then((response) => {
                  message.open({
                    type: "success",
                    content: "تمت عملية الإضافة بنجاح",
                    duration: 3,
                  })
                  props.close(false);
                 
                })
                .catch((error) => {
                  console.error(error.response);
                });
  
              }} type="primary">
                إضافة
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => {
                  setCurrent(current - 1);
                }}
              >
                السابق
              </Button>
            )}
          </div>
        </Form>
      </>
    );
  };
  
  export default AddForm;
  