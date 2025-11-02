export default function ErrorFallback({ error, onRetry }) {
  return (
    <div role="alert" className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-red-700 font-semibold mb-2">Ocurrió un error</h2>
      <pre className="text-sm text-red-800 overflow-auto max-h-40 mb-4">{String(error?.message || error)}</pre>
      <button onClick={onRetry} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Reintentar
      </button>
    </div>
  );
}
