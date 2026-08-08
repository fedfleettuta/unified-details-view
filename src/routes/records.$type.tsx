import { createFileRoute, notFound } from "@tanstack/react-router";

import { RecordDetail } from "@/components/detail/RecordDetail";
import { getRecord } from "@/data/records";

export const Route = createFileRoute("/records/$type")({
  loader: ({ params }) => {
    const record = getRecord(params.type);
    if (!record) throw notFound();
    return { record };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Record unavailable — Fleet Detail Kit" }, { name: "robots", content: "noindex" }],
      };
    }
    const { record } = loaderData;
    const title = `${record.typeLabel} — ${record.vehicle?.reg ?? record.crumb} · Fleet Detail Kit`;
    return {
      meta: [
        { title },
        { name: "description", content: record.description },
        { property: "og:title", content: title },
        { property: "og:description", content: record.description },
      ],
    };
  },
  component: RecordPage,
});

function RecordPage() {
  const { record } = Route.useLoaderData();
  return <RecordDetail record={record} />;
}