import { React, useState, useEffect } from "react";
import axios from "axios";
import { SolutionOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, message, Steps } from "antd";

const Controller = (props) => {
  const [notValid, setNotValid] = useState(true);
  const [current, setCurrent] = useState(0);
  ///////////////////////////////////////////////
  const handleChange = (e) => {
    const value1 = e.target.value.replace(/\D/g, "");
    setData({ ...data, phone:value1 });
  };
  
  ///////////////////////////////////////////
  const [data, setData] = useState({
    name: "",
    gender_id: "",
    job: "",
    social_status: "",
  });

  useEffect(() => {
    data.name === "" ||
    data.gender_id === "" ||
    data.job === "" ||
    data.social_status === ""
      ? setNotValid(true)
      : setNotValid(false);
    return () => {};
  }, [data]);

  const createGuardian = () => {
    axios
      .post("http://127.0.0.1:8000/api/guardian/store", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        message.open({
          type: "success",
          content: "تمت عملية الإضافة بنجاح",
          duration: 3,
        });
        props.close(false);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  const formContent = [
    <>
      <Form.Item
        label="إسم ولي الامر"
        name="name"
        rules={[
          {
            required: true,
            message: "يرجى إدخال إسم ولي الامر",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item name="gender" label="الجنس">
        <Radio.Group
          onChange={(e) => {
            setData({ ...data, gender_id: e.target.value });
          }}
        >
          <Radio value="1"> ذكر </Radio>
          <Radio value="2"> انثى </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="job" label=" الوظيفة">
        <Input
          onChange={(e) => {
            setData({ ...data, job: e.target.value });
          }}
          
        />
      </Form.Item>

      <Form.Item name="social_status" label="الحالة الإجتماعية">
        <Radio.Group
          onChange={(e) => {
            setData({ ...data, social_status: e.target.value });
          }}
        >
          <Radio value="عازب"> عازب </Radio>
          <Radio value="متزوج"> متزوج </Radio>
          <Radio value="منفصل"> منفصل </Radio>
        </Radio.Group>
      </Form.Item>
    </>,
    <>
      <Form.Item
         
      label="رقم الهاتف " name="phone"
      rules={[
        {
          min:9,
          message:"رقم الهاتف يجب الا يقل عن 9 ارقام"
        },
        {
          required:true,
          message:"لا يمكن ترك الحقل فارغاً"
        },
        // {
        //   type:'number',
        //   message:"رقم الهاتف يجب ان يكون رقم"
        // },
      ]}
      >
       
        <Input
       
        maxLength={9}
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
            message:"الايميل غير صالح"
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
            title: "بيانات ولي الامر",

            icon: <SolutionOutlined />,
          },
          {
            title: "إنشاء الحساب ",
            icon: <LoginOutlined />,
          },
        ]}
      />
      <Form
        onFinish={() => {
          createGuardian();
        }}
      >
        <div style={{ marginTop: 24 }}>{formContent[current]}</div>
        <div style={{ marginTop: 24 }}>
          {current === 0 && (
            <Button
              type="primary"
              onClick={() => {
                setCurrent(current + 1);
              }}
              disabled={notValid}
            >
              التالي
            </Button>
          )}
          {current === 1 && (
            <Button type="primary" htmlType="submit">
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

export function EditGuardian(props) {
  return (
    <>
      <Form
        onFinish={(values) => {
          axios
            .post(`http://127.0.0.1:8000/api/guardian/update/${props.data.id}`,values,
            //  {
            //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            //   responseType: "json",
            // }
            )
            .then((response) => {
              message.open({
                type: "success",
                content: "تمت عملية التعديل بنجاح",
                duration: 3,
              });
              props.setUpdate(!props.update)
              props.close(false);
            })
            .catch((error) => {
              console.error(error.response);
            });
          console.log(values);
        }}
      >
        <Form.Item
          initialValue={props.data.name}
          label="إسم ولي الامر"
          name="name"
          rules={[
            {
              required: true,
              message: "يرجى إدخال إسم ولي الامر",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={`${props.data.gender_id === "ذكر" ? 1 : 2}`}
          name="gender_id"
          label="الجنس"
        >
          <Radio.Group>
            <Radio value="1"> ذكر </Radio>
            <Radio value="2"> انثى </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item initialValue={props.data.job} name="job" label=" الوظيفة">
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={props.data.social_status}
          name="social_status"
          label="الحالة الإجتماعية"
        >
          <Radio.Group>
            <Radio value="عازب"> عازب </Radio>
            <Radio value="متزوج"> متزوج </Radio>
            <Radio value="منفصل"> منفصل </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item initialValue={props.data.phone} name="phone" label=" الهاتف">
          <Input />
        </Form.Item>
        <Form.Item initialValue={props.data.email} name="email" label=" الايميل">
          <Input />
        </Form.Item>
        <Form.Item
          // initialValue={props.password}
          name="password"
          label=" كلمة المرور"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          // initialValue={props.password}
          name="password_confirmation"
          label=" تأكيد كلمة المرور "
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            حفظ
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Controller;
