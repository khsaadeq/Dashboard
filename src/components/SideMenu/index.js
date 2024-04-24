import {
  AppstoreOutlined,
  CalendarOutlined,
  FileExclamationOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  ConfigProvider,
  Menu,
  Space,
  message,
  Image,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import img from "../../images/alnoor.jpg";
const SideMenu = (props) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const apis = [
    "/generateIdentity",
    "/generateNationality",
    "/generateQualification_study",
    "/generatejop",
    "/generateGender",
    "/generateSystem_Spisod",
    "/generateatendance",
  ];
  const fetchData = async () => {
    for (let i = 0; i < apis.length; i++) {
      axios
        .get(`http://127.0.0.1:8000/api${apis[i]}`)
        .then((response) => {
          message.open({
            type: "success",
            content: "تمة عملية الإضافة بنجاح",
            duration: 3,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={"SideMenu"}>
      <div className="avatar">
        <Space align="center" direction="vertical">
          <Avatar size={64} icon={<Image preview={false} src={img} />} />
          <h3 style={{ margin: 0, color: "#198754" }}>{props.userName.name}</h3>
          <h4 style={{ margin: 0, color: "#6c757d" }}>
            {props.userName.job_id === 1
              ? "مدير"
              : props.userName.job_id === 2
              ? "مشرف"
              : props.userName.job_id === 3
              ? "معلم"
              : "مدير"}
          </h4>
        </Space>
      </div>
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        block
        style={{
          marginBottom: 16,
          marginTop: 16,
         backgroundColor:'rgb(3,155, 140)',
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: "#198754",

              colorItemBgSelected: "rgb(3,155, 140)",
              colorItemTextSelected: "white",
              // colorBgContainer:'#198754'
            },
          },
        }}
      >
        <Menu
          style={{ fontSize: 24 }}
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              id: 0,
              label: "لوحة المعلومات",
              key: "/home/dashboard",
              icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
              disabled: props.userName.job_id === 3 ? true : false,
            },
            {
              id: 1,
              label: (
                <h2 style={{ margin: 0, color: "rgb(3,155, 140)" }}>
                  الشؤون الإدارية
                </h2>
              ),
              // key: "/home/students",
              // icon: <UserOutlined style={{ fontSize: 24 }} />,
              type: "group",
              children: [
                {
                  id: 2,
                  label: " الطلاب",
                  key: "/home/students",
                  icon: <UserOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 || props.userName.job_id === 4 ? true : false,
                },
                {
                  id: 3,
                  label: " المعلمين",
                  key: "/home/teachers",
                  icon: <UserOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 || props.userName.job_id === 4 ? true : false,
                },
                {
                  id: 4,
                  label: " اولياء الأمور",
                  key: "/home/guardian",
                  icon: <UserOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 || props.userName.job_id === 4 ? true : false,
                },

                {
                  id: 3,
                  label: " الموظفين",
                  key: "/home/employees",
                  icon: <TeamOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 || props.userName.job_id === 2|| props.userName.job_id === 4 ? true : false,
                },
                {
                  id: 5,
                  label: " الحلقات",
                  key: "/home/schools",
                  icon: <MenuOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 || props.userName.job_id === 4 ? true : false,
                },
                // {
                //   id: 6,
                //   label: " المستخدمين",
                //   key: "/home/users",
                //   icon: <UserOutlined style={{ fontSize: 24 }} />,
                // },
              ],
            },

            {
              id: 7,
              label: (
                <h2 style={{ margin: 0, color: "rgb(3,155, 140)" }}>
                  الشؤون التعليمية
                </h2>
              ),
              // key: "/home/students",
              // icon: <UserOutlined style={{ fontSize: 24 }} />,
              type: "group",
              children: [
                {
                  id: 8,
                  label: "  المتابعة اليومية للطلاب",
                  key: "/home/dialy/memorizeHP",
                  icon: <CalendarOutlined style={{ fontSize: 24 }} />,
                },
                {
                  id: 8,
                  label: "   مواظبة الموظفين",
                  key: "/home/dialy/teachersAttends",
                  icon: <CalendarOutlined style={{ fontSize: 24 }} />,
                  disabled: props.userName.job_id === 3 ? true : false,
                },
              ],
            },
            // {
            //   id: 1,
            //   label: " الطلاب",
            //   key: "/home/students",
            //   icon: <UserOutlined style={{ fontSize: 24 }} />,
            // },
            // {
            //   id: 2,
            //   label: "المتابعة اليومية",
            //   key: "/home/dialy",
            //   icon: <CalendarOutlined style={{ fontSize: 24 }} />,
            // },
            // {
            //   id: 3,
            //   label: " المعلمين",
            //   key: "/home/teachers",
            //   icon: <UserOutlined style={{ fontSize: 24 }} />,
            // },
            // {
            //   id: 4,
            //   label: " اولياء الأمور",
            //   key: "/home/guardian",
            //   icon: <UserOutlined style={{ fontSize: 24 }} />,
            // },
            // {
            //   id: 5,
            //   label: " الحلقات",
            //   key: "/home/schools",
            //   icon: <SettingOutlined style={{ fontSize: 24 }} />,
            // },
            // {
            //   id: 6,
            //   label: " المستخدمين",
            //   key: "/home/users",
            //   icon: <UserOutlined style={{ fontSize: 24 }} />,
            // },
            {
              id: 8,
              label: " التقارير",
              key: "/home/reports",
              icon: <FileExclamationOutlined style={{ fontSize: 24 }} />,
              disabled: props.userName.job_id === 3 ? true : false,
            },

            // {
            //   id: 7,
            //   label: " تسجيل الخروج",
            //   key: "/logout",
            //   icon: <LoginOutlined style={{ fontSize: 24, color: "red" }} />,
            // },
          ]}
          defaultSelectedKeys={["1"]}
          mode="inline"
          inlineCollapsed={collapsed}
        ></Menu>
      </ConfigProvider>
      <Button
        type="primary"
        onClick={fetchData}
        block
        style={{
          marginBottom: 16,
          marginTop: 16,
        }}
      ></Button>
    </div>
  );
};

export default SideMenu;
