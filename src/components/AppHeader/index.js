import React from "react";
import {  Image, Space,  } from "antd";
import logo from "../../images/logo.png";
import logo2 from "../../images/logo2.png";
import { ButtonComponent } from "../ShareComponents";
import { LogoutOutlined } from "@ant-design/icons";
const AppHeader = () => {
  return (
    <div className="AppHeader">
      <div style={{ display:'flex', alignItems:'center' }}>
        <Image preview={false} height={80} width={100} src={logo} />
        <h3 style={{ margin:0,color:'#198754' }}>نظام اهل القراّن</h3>
      </div>

      <h1>مركز النور لتحفيظ القراّن الكريم</h1>

      <Space>
      <ButtonComponent
          style={{color:'red'}}
            title={"تسجيل الخروج"}
            icon={<LogoutOutlined/>}
            onClick={() => {
             window.location.replace("/");
            }}
          />
        <Image preview={false} height={80} width={120} src={logo2} />
      </Space>
    </div>
  );
};

export default AppHeader;
