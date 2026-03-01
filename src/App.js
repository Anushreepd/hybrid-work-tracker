import "./App.css";
import Calendar from "./components/Calender";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-container">
      <h1>Hybrid Work Tracker</h1>
      <Calendar />
      <Footer />
    </div>
  );
}

export default App;