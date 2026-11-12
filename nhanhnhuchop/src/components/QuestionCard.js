import AnswerButton from './AnswerButton';
import { LEVELS, LETTERS } from '../data';

const QuestionCard = ({ number, total, question, status, chosen, cursor = -1, onPick }) => {
  // Màu của từng nút: chỉ lộ khi đã trả lời xong (revealed)
  const getState = (i) => {
    if (status !== 'revealed') return 'normal';
    if (i === question.answer) return 'correct';
    if (i === chosen) return 'wrong';
    return 'normal';
  };

  return (
    <div className="question-card">
      <p className="meta">{`Câu ${number}/${total} · ${LEVELS[question.level]}`}</p>
      <h2>{question.question}</h2>
      <div className="answers">
        {question.options.map((option, i) => (
          <AnswerButton
            key={`${question.id}-${i}`}
            label={LETTERS[i]}
            text={option}
            state={getState(i)}
            focused={status === 'answering' && i === cursor}
            disabled={status !== 'answering'}
            onClick={() => onPick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
