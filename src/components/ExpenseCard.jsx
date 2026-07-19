export default function ExpenseCard({ expense, onEdit, onDelete }) {
  return (
    <div className="expense-card">
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <h3 className="card-title">{expense.title}</h3>
          <div className="badge badge-primary badge-outline">{expense.category}</div>
        </div>
        <p className="text-2xl font-extrabold tracking-tight">${Number(expense.amount).toFixed(2)}</p>
        <p className="text-sm text-base-content/55">{expense.expense_date}</p>
        {expense.description && <p className="text-sm text-base-content/70 line-clamp-2">{expense.description}</p>}
        <div className="card-actions justify-end mt-2">
          <button onClick={() => onEdit(expense)} className="btn btn-sm btn-ghost">Edit</button>
          <button
            onClick={() => {
              if (window.confirm("Delete this expense?")) onDelete(expense.id);
            }}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
