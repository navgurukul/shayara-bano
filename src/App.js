import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Navigation";
import Email from "./Components/Email";
import Whatsapp from "./Components/Whatsapp";
import Admission from "./Components/Admission";
import QrCode from "./Components/Whatsapp/Qr-Code";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/email" component={Email} />
        <Route exact path="/whatsapp" component={Whatsapp} />
        <Route exact path="/qr" component={QrCode} />
        <Route exact path="/admission" component={Admission} />
      </Switch>
    </div>
  );
}

export default App;
