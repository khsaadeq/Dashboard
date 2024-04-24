// import { Route, Routes ,useNavigate} from "react-router-dom";
import { Login } from "./Pages/Login";
// import Home from "./Pages/Home/Home";
// import { useEffect } from "react";
const App = () => {

  // const navigate = useNavigate()
  // useEffect(()=>{navigate('/login')},[])

  return (
    <>
      {/* <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home/*" element={<Home/>}></Route>
      </Routes> */}
      <Login />
    </>
  );
};

export default App;
