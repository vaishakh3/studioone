import { defineConfig, godoc } from "sourcey";

export default defineConfig({
  name: "Studio One · chi reference",
  siteUrl: "https://www.thestudioone.xyz",
  baseUrl: "/docs/chi",
  repo: "https://github.com/go-chi/chi",
  editBranch: "b1c9ab47626cc46b34393ad4d35779c4363c4e1e",
  navigation: {
    tabs: [
      {
        tab: "Go API",
        slug: "",
        source: godoc({ snapshot: "./godoc.json", mode: "snapshot" }),
      },
    ],
  },
  navbar: {
    links: [
      { type: "link", label: "Studio One", href: "https://www.thestudioone.xyz/" },
      {
        type: "link",
        label: "Usage guide",
        href: "https://github.com/vaishakh3/studioone/blob/main/docs/chi/README.md",
      },
      {
        type: "github",
        label: "Upstream",
        href: "https://github.com/go-chi/chi/tree/b1c9ab47626cc46b34393ad4d35779c4363c4e1e",
      },
    ],
  },
  footer: {
    links: [
      { type: "link", label: "MIT license", href: "/docs/chi/LICENSE.txt" },
      { type: "link", label: "Build evidence", href: "/docs/chi/evidence.json" },
    ],
  },
});
