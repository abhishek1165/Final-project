import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [complaints, setComplaints] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/complaints', { userName, issue, priority });
    setUserName('');
    setIssue('');
    fetchComplaints();
  };

  const fetchComplaints = async () => {
    const res = await axios.get('http://localhost:3000/api/complaints');
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Complaint Logger</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Describe your issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />
        <select className="border p-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Complaints</h2>
        <ul>
          {complaints.map((c) => (
            <li key={c._id} className="border-b py-2">
              <strong>{c.userName}</strong> ({c.priority})<br />
              {c.issue}<br />
              <small>{new Date(c.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
