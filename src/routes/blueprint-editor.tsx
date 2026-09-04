import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { BlueprintEditor } from "@/components/blueprint/BlueprintEditor";

const TITLE = "Blueprint editor — upload vehicle images, draw damage zones";
const DESCRIPTION =
  "Admin tool to upload a real vehicle image per view, draw polygon damage zones on it and save them for the Start Vehicle and Return Vehicle inspections.";

export const Route = createFileRoute("/blueprint-editor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlueprintEditorPage,
});

function BlueprintEditorPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:py-12">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Fleet
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
            <li aria-current="page" className="text-foreground">
              Blueprint editor
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl space-y-2">
          <p className="label-micro">Admin tooling</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Vehicle blueprint editor
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Upload the real image for each view, draw a polygon zone per panel and save it. Start
            Vehicle, Return Vehicle and the admin damage review all render the saved geometry.
          </p>
        </div>
      </header>

      <BlueprintEditor />
    </div>
  );
}
