import { useState } from "react";
import StudentList from "./StudentList";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Nguyễn Ngọc An", score: 8.5, class: "CNTT01" },
  { id: 2, name: "Lê Minh Anh", score: 8.5, class: "CNTT02" },
  { id: 5, name: "Lê Quốc Bình", score: 5, class: "CNTT01" },
  { id: 8, name: "Trần Đình Chiến", score: 3, class: "CNTT04" },
  { id: 10, name: "Nguyễn Ngọc Danh", score: 8.5, class: "CNTT02" },
  { id: 12, name: "Lê Thị Huyền", score: 8, class: "CNTT04" },
  { id: 15, name: "Nguyễn Minh Kiên", score: 6.75, class: "CNTT03" },
  { id: 19, name: "Nguyễn Thị Linh", score: 4.5, class: "CNTT03" },
  { id: 23, name: "Trần Bảo Minh", score: 7.4, class: "CNTT03" },
  { id: 25, name: "Nguyễn Bảo Nam", score: 8, class: "CNTT01" },
  { id: 27, name: "Lý Bất Ngôn", score: 8.5, class: "CNTT03" },
  { id: 28, name: "Khanh Dữ Nguy", score: 7.75, class: "CNTT04" },
  { id: 30, name: "Lê Minh Quân", score: 7, class: "CNTT02" },
  { id: 34, name: "Phạm Ngọc Thư", score: 9.5, class: "CNTT02" },
  { id: 37, name: "Ngô Quốc Việt", score: 4.5, class: "CNTT01" }
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("all");

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [error, setError] = useState("");

  // Thêm sinh viên
  const handleAdd = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedClass = studentClass.trim();

    if (!trimmedName || score.trim() === "" || !trimmedClass) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const numericScore = Number(score);

    if (
      !Number.isFinite(numericScore) ||
      numericScore < 0 ||
      numericScore > 10
    ) {
      setError("Điểm phải là số từ 0 đến 10!");
      return;
    }

    const newStudent = {
      id: students.reduce(
        (maxId, student) => Math.max(maxId, student.id),
        0
      ) + 1,
      name: trimmedName,
      score: numericScore,
      class: trimmedClass
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);

    setName("");
    setScore("");
    setStudentClass("");
    setError("");
  };

  // Xóa sinh viên
  const handleDelete = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  // Lọc sinh viên
  const filteredStudents = students.filter((student) => {
    if (filter === "good") return student.score >= 8;
    if (filter === "fail") return student.score < 5;
    return true;
  });

  // Thống kê toàn lớp
  const totalStudents = students.length;

  const averageScore = totalStudents > 0
    ? students.reduce((sum, student) => sum + student.score, 0)
      / totalStudents
    : 0;

  return (
    <div className="app">
      <h1>Quản lý Điểm Sinh viên</h1>

      <section className="panel">
        <h2>Thêm sinh viên</h2>

        <form onSubmit={handleAdd} className="student-form">
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="number"
            placeholder="Điểm số (0-10)"
            min="0"
            max="10"
            step="any"
            value={score}
            onChange={(event) => setScore(event.target.value)}
          />

          <input
            type="text"
            placeholder="Lớp"
            value={studentClass}
            onChange={(event) =>
              setStudentClass(event.target.value)
            }
          />

          <button type="submit">Thêm sinh viên</button>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      <section className="panel">
        <h2>Thống kê</h2>

        <p>Tổng số sinh viên: {totalStudents}</p>
        <p>Điểm trung bình: {averageScore.toFixed(2)}</p>
      </section>

      <section className="panel">
        <h2>Danh sách sinh viên</h2>

        <label htmlFor="filter">Lọc danh sách: </label>

        <select
          id="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">Tất cả sinh viên</option>
          <option value="good">Sinh viên giỏi (≥ 8)</option>
          <option value="fail">Trượt môn (&lt; 5)</option>
        </select>

        <StudentList
          students={filteredStudents}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
};

export default App;
