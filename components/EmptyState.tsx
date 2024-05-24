export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string[];
}) {
  return (
    <div className="text-center rounded-2xl p-8 bg-slate-50 shadow">
      <div className="text-2xl mb-4">{title}</div>
      <div className="flex flex-col items-start text-left">
        {description.map((sentence, index) => (
          <div key={index}>{sentence}</div>
        ))}
      </div>
    </div>
  );
}
