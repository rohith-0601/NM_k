import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Question_1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Question5 from "./pages/Question5";
import Question6 from "./pages/Question6";
import Question7 from "./pages/Question7";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/q1" element={<Question_1/>}/>
      <Route path="/q2" element={<Question2/>}/>
      <Route path="/q3" element={<Question3/>}/>
      <Route path="/q4" element={<Question4/>}/>
      <Route path="/q5" element={<Question5/>}/>
      <Route path="/q6" element={<Question6/>}/>
      <Route path="/q7" element={<Question7/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
