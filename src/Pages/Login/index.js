import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "../Home/Home";
import "../../App.css";
import { useNavigate } from "react-router-dom";
export const Login = (props) => {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // setUserName(sessionStorage.getItem('teachers'))
    if (!userName) {
      navigate("/login");
    }
    else
      navigate("/home");
  }, []);
 
  if (userName) {
    return <Home userName={userName} />;
  }

  return (
    <div className="container">
      <Form
        onFinish={(data) => {
          axios
            .post(`http://127.0.0.1:8000/api/auth/login `, data)
            .then((response) => {
              // setUserName(response.data["access_token"]);
              // sessionStorage.setItem('teachers', response.data["teachers"])
              // localStorage.setItem('token',user)
              setUserName(response.data["teachers"])
              // console.log(response.data["teachers"])
              navigate("/home");
            })
            .catch((error) => {
              console.error(error.response);
              Modal.error({
                title: " خطأ ",
                centered: true,
                content: <h3 style={{ alignItems: 'center' }}>إسم المستخدم او كلمة المرور غير صحيح</h3>


              })
            });

        }}
      >
        <h1>تسجيل الدخول</h1>
        <div >
          <Form.Item name={"email"}>
            <Input  placeholder="الايـميل" />
          </Form.Item>
        </div>
        <div >
          <Form.Item name={"password"}>
            <Input  placeholder=" كلمة المرور" />
          </Form.Item>
        </div>
        <div className="log-in">
          <Form.Item>
            <Button
              className="button"
              onClick={() => {
                // setLoged(true);
                //  navigate('/home')
              }}
              htmlType="submit"
            >
              تسجيل الدخول
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
