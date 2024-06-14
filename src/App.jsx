import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Matching } from "./Page/matching";
import { Matchtable } from "./Page/matchtable";
import { Matchscore } from "./Page/matchscore";
import { Conditions } from "./Page/Conditions";
import { Conditions2 } from "./Page/Conditions2";
import { Toppage } from "./Page/toppage";
import { LoginPage } from "./Page/Login";
import { TestPage } from "./Page/TestPage";
import { Matchdo } from "./Page/matchdo";
import "normalize.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Toppage" element={<Toppage />} />
        <Route path="/Matchtable" element={<Matchtable />} />
        <Route path="/" element={<Matching />} />
        <Route path="/Matchscore" element={<Matchscore />} />
        <Route path="/Conditions" element={<Conditions />} />
        <Route path="/Matchdo" element={<Matchdo />} />
        <Route path="/Conditions2" element={<Conditions2 />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
