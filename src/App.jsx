import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:8081/api/v1/members";

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

    <ul className="member-list">
      {members.map((m) => (
        <li key={m.id} className="member-item">
          <div className="member-info">
            <span className="member-id">#{m.id}</span>
            <span className="member-name">{m.name}</span>
          </div>
          <button className="delete-btn" onClick={() => deleteMember(m.id)}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;