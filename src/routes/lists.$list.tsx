import { createFileRoute, notFound } from "@tanstack/react-router";

import { ListPage } from "@/components/list/ListPage";
import { getList } from "@/data/lists";

export const Route = createFileRoute("/lists/$list")({
  loader: ({ params }) => {
    const list = getList(params.list);
    if (!list) throw notFound();
    return { list };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "List unavailable — Fleet Detail Kit" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { list } = loaderData;
    const title = `${list.title} — Fleet Detail Kit`;
    return {
      meta: [
        { title },
        { name: "description", content: list.description },
        { property: "og:title", content: title },
        { property: "og:description", content: list.description },
      ],
    };
  },
  component: ListRoute,
});

function ListRoute() {
  const { list } = Route.useLoaderData();
  return <ListPage list={list} />;
}
