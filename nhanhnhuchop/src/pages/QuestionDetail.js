import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams(); // luôn là chuỗi
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{`Câu hỏi số ${question.id} – ${LEVELS[question.level]} · ${question.reserve ? 'Dự bị' : 'Chính thức'}`}</h2>
      <p>{question.question}</p>
      <ul className="options">
        {question.options.map((option, i) => {
          const isRight = showAnswer && i === question.answer;
          return (
            <li key={i} className={`option ${isRight ? 'correct' : ''}`}>
              {LETTERS[i]}. {option}
              {isRight && ' (Đáp án đúng)'}
            </li>
          );
        })}
      </ul>
      {showAnswer && <p>{`Giải thích: ${question.explain}`}</p>}
      <div className="actions">
        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
        </button>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
