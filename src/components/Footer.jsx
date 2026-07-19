export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-primary-content mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">💰 Expense Manager</h3>
          <p className="opacity-90 text-sm">
            Track your daily spending and take control of your personal finances.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Features</h4>
          <ul className="space-y-1 text-sm opacity-90">
            <li>✔ Add & Edit Expenses</li>
            <li>✔ Secure User Login</li>
            <li>✔ Personal Dashboard</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm opacity-90">
            <li>📧 support@expense.app</li>
            <li>📞 +880 1000 000000</li>
            <li>🏫 Web Database Lab Project</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-3 text-sm opacity-90">
        © {new Date().getFullYear()} Personal Expense Manager. All rights reserved.
      </div>
    </footer>
  );
}