import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addOrUpdateStudent = async () => {
    if (!name || !age) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/update/${editId}`, {
        name,
        age: Number(age),
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/add", {
        name,
        age: Number(age),
      });
    }

    setName("");
    setAge("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchStudents();
  };

  const editStudent = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditId(student._id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Management</h1>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={addOrUpdateStudent}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div style={styles.list}>
          {students.map((student) => (
            <div key={student._id} style={styles.listItem}>
              <div>
                <strong>{student.name}</strong> - {student.age} yrs
              </div>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  primaryBtn: {
    padding: "10px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: {
    marginTop: "10px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  editBtn: {
    marginRight: "8px",
    padding: "6px 10px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;