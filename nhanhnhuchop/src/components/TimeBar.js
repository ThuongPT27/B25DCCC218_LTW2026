const TimeBar = ({ timeLeft, total, frozen = false }) => {
  const percent = Math.max(0, (timeLeft / total) * 100);
  const color = timeLeft <= 5 ? '#dc2626' : '#16a34a';

  return (
    <div>
      <p>{`Còn ${timeLeft} giây${frozen ? ' (đã dừng)' : ''}`}</p>
      <div className="timebar">
        <div
          className="timebar-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default TimeBar;
