// state: 'normal' | 'correct' | 'wrong'
const AnswerButton = ({ label, text, state, focused, disabled, onClick }) => (
  <button
    className={`answer-btn ${state} ${focused ? 'focused' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {`${label}. ${text}`}
  </button>
);

export default AnswerButton;
