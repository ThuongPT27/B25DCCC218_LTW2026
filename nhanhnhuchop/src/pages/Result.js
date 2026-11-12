import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LETTERS } from '../data';
import { getStars, starText } from '../utils';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Mở /result trực tiếp (không có state) -> về trang chủ
  if (!state) return <Navigate to="/" replace />;

  const { name, answers, score, correctCount } = state;
  const rank = getStars(correctCount);

  return (
    <div>
      <h2>{rank.message}</h2>
      <p>{`Người chơi: ${name}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}/${answers.length}`}</p>
      <p>{`Điểm: ${score}`}</p>
      <p>
        {`Xếp loại: ${rank.stars} sao `}
        <span className="stars">{starText(rank.stars)}</span>
      </p>

      <h3>Xem lại</h3>
      <table>
        <thead>
          <tr>
            <th>Câu</th>
            <th>Bạn chọn</th>
            <th>Đáp án đúng</th>
            <th>Còn lại</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((a) => (
            <tr key={a.no} className={a.correct ? 'row-correct' : 'row-wrong'}>
              <td>{`Câu ${a.no}${a.swapped ? ` (đổi sang câu ${a.id})` : ''}`}</td>
              <td>{a.chosen === null ? '—' : LETTERS[a.chosen]}</td>
              <td>{LETTERS[a.answer]}</td>
              <td>{`${a.timeLeft} giây`}</td>
              <td>{a.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        <button onClick={() => navigate('/play')}>Chơi lại</button>
        <button onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    </div>
  );
};

export default Result;
