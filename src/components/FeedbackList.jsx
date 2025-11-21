export default function FeedbackList({ feedbacks = [] }) {
  console.log("FeedbackList получил:", feedbacks); // Добавь эту строку

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <p className="text-muted">Пока нет отзывов</p>
        </div>
      </div>
    );
  }
  // ... остальной код

  return (
    <div className="card">
      <div className="card-body">
        <h5>Список отзывов ({feedbacks.length})</h5>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="border-bottom pb-2 mb-2">
            <strong>{feedback.name}</strong> ({feedback.email})
            <p className="mb-0 mt-1">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
