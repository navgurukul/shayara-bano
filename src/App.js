import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Header from "./Components/Navigation";
// import Header from "./Components/Navigation/Header";
import Email from "./Components/Email";
import Whatsapp from "./Components/Whatsapp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Header />
      <Redirect path="/" to="/email" />
      <Route path="/email" component={Email} />
      <Route path="/whatsapp" component={Whatsapp} />
    </div>
  );
}

export default App;
