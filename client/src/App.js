import "./App.css";
import axios from "axios";
function App() {
  const request = () => {
    axios.get("/test").then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => request()}>request</button>
      </header>
    </div>
  );
}

export default App;
