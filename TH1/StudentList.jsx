
import StudentItem from "./StudentItem";

const StudentList = ({ students, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm</th>
          <th>Lớp</th>
          <th>Xếp loại</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="6">Không có sinh viên nào.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentList;
