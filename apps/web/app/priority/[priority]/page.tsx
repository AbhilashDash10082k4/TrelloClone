import React from "react";

export default async function PriorityPage({
  params,
}: {
  params: Promise<{ priority: string }>;
}) {
  const { priority } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
        Priority: {priority}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Filtered view for tasks with {priority} priority level.
      </p>
    </div>
  );
}
