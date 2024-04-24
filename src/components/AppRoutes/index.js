import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Students from "../../Pages/Students";
import Schools from "../../Pages/Schools";
import Guardian from "../../Pages/Guardian";
import Teachers from "../../Pages/Teachers";
import Users from "../../Pages/Users";
import HomePage from "../../Pages/Dialy/HomePage";
import MemorizeHP from "../../Pages/Dialy/MemorizeHP";
import RepHomePage from "../../Pages/Reports/ReportsHomePage";
import DialyStudentRep from "../../Pages/Reports/dialyStudentRep";
import TeachersAttends from "../../Pages/Dialy/TeachersAttends";
import StudntAttendsReports from "../../Pages/Reports/StudntAttendsReports";
import Employees from "../../Pages/Employees";
import EmpMonthlyRep from "../../Pages/Reports/EmpMonthlyRep";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<></>}></Route>
      <Route path="/login" element={<></>}></Route>
      <Route path="/home/dashboard" element={<Dashboard />}></Route>
      <Route path="/home/students" element={<Students />}></Route>
      <Route path="/home/schools" element={<Schools />}></Route>
      <Route path="/home/guardian" element={<Guardian />}></Route>
      <Route path="/home/teachers" element={<Teachers />}></Route>
      <Route path="/home/employees" element={<Employees />}></Route>
      <Route path="/home/users" element={<Users />}></Route>
      <Route path="/home/dialy" element={<HomePage />}></Route>
      <Route path="/home/dialy/memorizeHP" element={<MemorizeHP />}></Route>
      <Route path="/home/reports" element={<RepHomePage/>}></Route>
      <Route path="home/reports/studntReports" element={<DialyStudentRep/>}></Route>
      <Route path="home/reports/studntAttendsReports" element={<StudntAttendsReports/>}></Route>
      <Route path="home/reports/EmpMonthlyRep" element={<EmpMonthlyRep/>}></Route>
      <Route path="/home/dialy/teachersAttends" element={<TeachersAttends />}></Route>
    </Routes>
  );
}

export default AppRoutes;
