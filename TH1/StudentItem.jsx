const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        {score >= 8 ? "Giỏi" : score < 5 ? "Trượt môn" : "Đạt"}
      </td>
      <td>
        <button onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
