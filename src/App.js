import { ToastContainer } from "react-toastify";
import { Row } from "reactstrap";
import ListClientUser from "./components/ListClientUser";
import SaveClientUser from "./components/SaveClientUser";
import { useActions } from "./hook/use-action";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [ { store, listClient }, actions ] = useActions()

  return (
    <div className="App">
      <div className="myContainer">
        <h4> { 'Empresa X (Prueba Técnica)' } </h4>
        <Row className="">
          <ListClientUser actions={ actions } listClient={ listClient.listClient } showCard={ store.showCard } />
          { 
            store.showCard &&
            <SaveClientUser 
              action={ store.action }
              handleInputs={ actions.handleInputs }
              onAddAddress={ actions.onAddAddress }
              onCancelForm={ actions.onCancelForm }
              onDropAddress={ actions.onDropAddress }
              onSave={ actions.onSave }
              client={ store.client }
            />
          }
        </Row>
      </div>
      <footer className="footer">
        <span> 👨‍💻 Developed by Elvin D. Guzmán 👨‍💻 </span>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
