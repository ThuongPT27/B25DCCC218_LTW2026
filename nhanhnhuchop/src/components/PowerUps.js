const PowerUps = ({ status, used, doubling, onSwap, onDouble, onFreeze }) => {
  // Chỉ bấm được khi đang trả lời
  const canUse = status === 'answering';

  return (
    <div className="powerups">
      <button disabled={!canUse || used.swap} onClick={onSwap}>
        Đổi câu hỏi
      </button>
      <button disabled={!canUse || used.double} onClick={onDouble}>
        {doubling ? 'Đang nhân đôi' : 'Nhân đôi'}
      </button>
      <button disabled={!canUse || used.freeze} onClick={onFreeze}>
        Dừng giờ
      </button>
    </div>
  );
};

export default PowerUps;
