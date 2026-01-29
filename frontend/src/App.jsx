import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Attendance from "./components/Attendance";

function App() {
  return (
    <div className="container">
      <center><h1>HRMS LITE</h1></center>

      <EmployeeForm />
      <EmployeeList />
      <Attendance />
    </div>
  );
}

export default App;


