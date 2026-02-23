import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");

  const API = "http://localhost:8081/api/v1/members";

  const fetchMembers = async () => {
    const res = await axios.get(API);
    setMembers(res.data.result);
  };

  const addMember = async () => {
    if (!name) return;
    await axios.post(API, { name });
    setName("");
    fetchMembers();
  };

  const deleteMember = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

 return (
  <div className="container">
    <h1>TP3 Members</h1>

    <div className="input-group">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addMember}>Add</button>
    </div>

    <ul>
      {members.map((m) => (
        <li key={m.id}>
          {m.name}
          <button onClick={() => deleteMember(m.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;