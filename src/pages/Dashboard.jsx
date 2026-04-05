const Dashboard = () => {
  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-5">
        <h1 className="text-xl font-bold mb-6">ExamMate AI 🎯</h1>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-200">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-200">Generate Notes</li>
          <li className="cursor-pointer hover:text-gray-200">History</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Mahak 👋
        </h1>

        <p className="mt-4 text-gray-600">
          Start generating AI-powered notes for your exams.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;