export default function ExpenseCard({ expense, onEdit, onDelete }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h3 className="card-title">{expense.title}</h3>
          <div className="badge badge-primary">{expense.category}</div>
        </div>
        <p className="text-2xl font-bold">${Number(expense.amount).toFixed(2)}</p>
        <p className="text-sm opacity-70">{expense.expense_date}</p>
        {expense.description && <p>{expense.description}</p>}
        <div className="card-actions justify-end">
          <button onClick={() => onEdit(expense)} className="btn btn-sm btn-outline">Edit</button>
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