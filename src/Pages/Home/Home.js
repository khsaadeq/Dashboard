import { Space } from "antd";
import "../../App.css";
import AppHeader from "../../components/AppHeader/index";
import AppFooter from "../../components/AppFooter/index";
import PageContent from "../../components/PageContent/index";
import SideMenu from "../../components/SideMenu/index";
import { useEffect } from "react";

const Home = (props) => {

  // var storedObjectString = sessionStorage.getItem('teachers');
  // const user=JSON.parse(storedObjectString)
  // useEffect(()=>{console.log(user)},[])
  return (
    <div className="Home">
      {/* <div>{props.userName.job_id}</div> */}
      {/* <div>{localStorage.getItem("userName")}</div> */}
      <AppHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu userName={props.userName}  ></SideMenu>
        <PageContent></PageContent>
      </Space>
      <AppFooter />
    </div>
  );
};

export default Home;
