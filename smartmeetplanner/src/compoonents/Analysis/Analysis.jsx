export function Analysis({ data }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-1xl shadow border p-6 text-center h-full">
        <div className="w-16 h-16 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
          📋
        </div>
        <h3 className="font-semibold text-gray-700">No Analysis Yet</h3>
        <p className="text-sm text-gray-500">
          Paste a meeting transcript and click "Analyze Meeting"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-lg font-semibold mb-4">Analysis</h2>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="font-medium text-blue-600">Summary</h3>
        <p className="text-sm text-gray-600">{data.summary}</p>
      </div>

      {/* Tasks */}
      <div>
        <h3 className="font-medium text-purple-600 mb-2">Tasks</h3>
        <ul className="space-y-2">
          {data.tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 border rounded-xl"
            >
              <span>{task.task}</span>
              <span className="text-xs px-2 py-1 rounded bg-linear-to-r from-blue-100 to-purple-100">
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}