import { starText } from '../utils';

const History = ({ history, setHistory }) => {
  // Sắp xếp trên bản sao: điểm giảm dần, bằng điểm thì nhiều câu đúng hơn đứng trước
  const sorted = [...history].sort(
    (a, b) => b.score - a.score || b.correctCount - a.correctCount
  );

  const count = history.length;
  const totalScore = history.reduce((sum, h) => sum + h.score, 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);
  const average = count === 0 ? 0 : Math.round(totalScore / count);
  const rate = count === 0 ? 0 : Math.round((totalCorrect / (15 * count)) * 100);

  const handleDelete = (id) => setHistory(history.filter((h) => h.id !== id));
  const handleClear = () => setHistory([]);

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      <p>{`Số lượt chơi: ${count}`}</p>
      <p>{`Điểm trung bình: ${average}`}</p>
      <p>{`Tỉ lệ trả lời đúng: ${rate}%`}</p>
      <button onClick={handleClear} disabled={count === 0}>Xóa lịch sử</button>

      {count === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Người chơi</th>
              <th>Số câu đúng</th>
              <th>Xếp loại</th>
              <th>Điểm</th>
              <th>Thời gian</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((h) => (
              <tr key={h.id}>
                <td>{h.name}</td>
                <td>{h.correctCount}</td>
                <td className="stars">{starText(h.stars)}</td>
                <td>{h.score}</td>
                <td>{h.playedAt}</td>
                <td>
                  <button onClick={() => handleDelete(h.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
