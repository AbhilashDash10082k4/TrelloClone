import React from "react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Project #{id}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Details and board view for project ID {id}.
      </p>
    </div>
  );
}
