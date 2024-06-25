import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SProfile } from "./Page/Profile/profile-st";
import { SEdit } from "./Page/Profile/profile-st-edit";
import { SCompany } from "./Page/Profile/profile-st-com";
import { SCEdit } from "./Page/Profile/profile-st-com-edit";
import { CProfile } from "./Page/Profile/profile-com";
import { CEdit } from "./Page/Profile/profile-com-edit";
import { Matching } from "./Page/Matching/matching";
import { Matchtable } from "./Page/Matching/matchtable";
import { Matchscore } from "./Page/Matching/matchscore";
import { Conditions } from "./Page/Matching/Conditions";
import { Toppage } from "./Page/toppage";
import { LoginPage } from "./Page/Login/Login";
import { MyProvider } from "./provider/provider";
import { Addstudent } from "./Page/NewUser/addstudent";
import { Addstudentuser } from "./Page/NewUser/addstudentuser";
import { Addstudentgakka } from "./Page/NewUser/addstudentgakka";
import { Addstudentkakunin } from "./Page/NewUser/addstudentkakunin";
import { Addcompany } from "./Page/Companyadd/addcompany.jsx";
import { Lostpass } from "./Page/Login/Lostpass";
import { Companyinformation } from "./Page/Profile/companyinformation.jsx";
import "normalize.css";
function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/aa" element={<Toppage />} />
          <Route path="/Matchtable" element={<Matchtable />} />
          <Route path="/Matching" element={<Matching />} />
          <Route path="/Matchscore" element={<Matchscore />} />
          <Route path="/Conditions" element={<Conditions />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Lostpass" element={<Lostpass />} />
          <Route path="/addstudent" element={<Addstudent />} />
          <Route path="/adduser" element={<Addstudentuser />} />
          <Route path="/addgakka" element={<Addstudentgakka />} />
          <Route path="/addkakunin" element={<Addstudentkakunin />} />
          <Route path="/addcompany" element={<Addcompany />} />
          <Route path="/profile-st" element={<SProfile />} />
          <Route path="/profile-st-edit" element={<SEdit />} />
          <Route path="/profile-st-com" element={<SCompany />} />
          <Route path="/profile-st-com-edit" element={<SCEdit />} />
          <Route path="/profile-com" element={<CProfile />} />
          <Route path="/profile-com-edit" element={<CEdit />} />
          <Route path="/" element={<Companyinformation />} />
        </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
