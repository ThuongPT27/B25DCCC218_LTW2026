import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import QuestionCard from '../components/QuestionCard';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import PowerUps from '../components/PowerUps';
import { TIME_PER_QUESTION } from '../data';
import { calcPoints, calcTotal, getStars } from '../utils';

const TOTAL = 15;

const Game = ({ questions, playerName, onFinish }) => {
  const navigate = useNavigate();

  // 15 câu chính thức theo thứ tự id (filter tạo mảng mới nên sort không ảnh hưởng state gốc)
  const mains = questions.filter((q) => !q.reserve).sort((a, b) => a.id - b.id);

  const [status, setStatus] = useState('countdown'); // countdown -> answering -> revealed -> answering ...
  const [index, setIndex] = useState(0); // câu thứ index + 1
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]);
  const [chosen, setChosen] = useState(null); // đáp án vừa chọn (null = hết giờ)
  const [gain, setGain] = useState(0); // điểm vừa được ở câu hiện tại
  const [cursor, setCursor] = useState(0); // đáp án đang trỏ bằng phím
  const [swaps, setSwaps] = useState({}); // { vị trí câu: câu dự bị đã thay vào }
  const [used, setUsed] = useState({ swap: false, double: false, freeze: false });
  const [doubling, setDoubling] = useState(false); // câu hiện tại đang nhân đôi
  const [frozen, setFrozen] = useState(false); // câu hiện tại đã dừng giờ

  const question = swaps[index] || mains[index];
  const score = calcTotal(answers);
  const correctCount = answers.filter((a) => a.correct).length;

  // Chốt đáp án: pick là vị trí 0-3, hoặc null nếu hết giờ
  const submit = (pick) => {
    if (status !== 'answering') return;
    const correct = pick !== null && pick === question.answer;
    let points = correct ? calcPoints(question, timeLeft) : 0;
    if (correct && doubling) points = points * 2;
    setAnswers((prev) => [
      ...prev,
      {
        no: index + 1,
        id: question.id,
        chosen: pick,
        answer: question.answer,
        correct,
        timeLeft,
        points,
        swapped: Boolean(swaps[index]),
      },
    ]);
    setChosen(pick);
    setGain(points);
    setStatus('revealed');
  };

  const goNext = () => {
    setIndex(index + 1);
    setStatus('answering');
    setTimeLeft(TIME_PER_QUESTION);
    setChosen(null);
    setGain(0);
    setCursor(0);
    setDoubling(false);
    setFrozen(false);
  };

  const finishGame = () => {
    const name = playerName.trim();
    onFinish({
      id: Date.now(),
      name,
      score,
      correctCount,
      stars: getStars(correctCount).stars,
      playedAt: new Date().toLocaleString('vi-VN'),
    });
    navigate('/result', { replace: true, state: { name, answers, score, correctCount } });
  };

  const handleCountdownDone = useCallback(() => setStatus('answering'), []);

  // Đồng hồ: chỉ chạy khi đang trả lời
  useEffect(() => {
    if (status !== 'answering' || frozen) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, index, frozen, question.id]);

  // Hết giờ -> chốt là không chọn gì
  useEffect(() => {
    if (status === 'answering' && timeLeft <= 0) submit(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, status]);

  // Chờ 1,5 giây sau khi lộ đáp án rồi sang câu tiếp / kết thúc
  useEffect(() => {
    if (status !== 'revealed') return;
    const timer = setTimeout(() => {
      if (index === TOTAL - 1) finishGame();
      else goNext();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Phím tắt. Không có mảng phụ thuộc => chạy lại mỗi lần render
  // để handleKey luôn thấy state mới nhất; cleanup gỡ listener cũ.
  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'answering') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCursor((c) => (c % 2 === 1 ? c - 1 : c));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCursor((c) => (c % 2 === 0 ? c + 1 : c));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => (c >= 2 ? c - 2 : c));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => (c < 2 ? c + 2 : c));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        submit(cursor);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  // Tiêu đề tab
  useEffect(() => {
    document.title = `Câu ${index + 1}/${TOTAL} – đúng ${correctCount} câu`;
    return () => {
      document.title = 'Nhanh như chớp';
    };
  }, [index, correctCount]);

  // Quyền trợ giúp
  const handleSwap = () => {
    const reserve = questions.find((q) => q.reserve && q.level === question.level);
    if (!reserve) return;
    setSwaps({ ...swaps, [index]: reserve });
    setUsed({ ...used, swap: true });
    setTimeLeft(TIME_PER_QUESTION);
  };
  const handleDouble = () => {
    setUsed({ ...used, double: true });
    setDoubling(true);
  };
  const handleFreeze = () => {
    setUsed({ ...used, freeze: true });
    setFrozen(true);
  };

  if (status === 'countdown') {
    return <Countdown onDone={handleCountdownDone} />;
  }

  return (
    <div>
      <TimeBar
        timeLeft={timeLeft}
        total={TIME_PER_QUESTION}
        frozen={frozen}
      />
      <ScorePanel score={score} correctCount={correctCount} gain={gain} />
      <QuestionCard
        number={index + 1}
        total={TOTAL}
        question={question}
        status={status}
        chosen={chosen}
        cursor={cursor}
        onPick={submit}
      />
      <PowerUps
        status={status}
        used={used}
        doubling={doubling}
        onSwap={handleSwap}
        onDouble={handleDouble}
        onFreeze={handleFreeze}
      />
    </div>
  );
};

// Chặn vào thẳng /play khi chưa có tên
const Play = ({ questions, playerName, onFinish }) => {
  if (playerName.trim() === '') return <Navigate to="/" replace />;
  return <Game questions={questions} playerName={playerName} onFinish={onFinish} />;
};

export default Play;
