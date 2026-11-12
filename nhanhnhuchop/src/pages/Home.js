import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history = [] }) => {
  const navigate = useNavigate();


  return (
    <div>
      <h1>Nhanh như chớp</h1>
      <h3>Luật chơi</h3>
      <ul>
        <li>15 câu hỏi về HTML, CSS, JavaScript và React, mỗi câu có 15 giây.</li>
        <li>Sai hoặc hết giờ không bị loại, chỉ được 0 điểm cho câu đó.</li>
        <li>Đúng được điểm theo mức độ (Dễ 50, Trung bình 100, Khó 150) cộng 10 điểm cho mỗi giây còn lại.</li>
        <li>Cuối lượt được xếp loại từ 0 đến 3 sao.</li>
      </ul>
      <p>
        <label>
          Tên người chơi:{' '}
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nhập tên của bạn"
          />
        </label>
      </p>
      <button disabled={playerName.trim() === ''} onClick={() => navigate('/play')}>
        Bắt đầu
      </button>
    </div>
  );
};

export default Home;
