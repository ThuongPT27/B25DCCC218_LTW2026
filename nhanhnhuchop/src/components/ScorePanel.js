const ScorePanel = ({ score, correctCount, gain }) => (
  <div className="score-panel">
    <p>{`Điểm: ${score}`}</p>
    <p>{`Số câu đúng: ${correctCount}`}</p>
    {gain > 0 && <p className="gain">{`+${gain} điểm`}</p>}
  </div>
);

export default ScorePanel;
