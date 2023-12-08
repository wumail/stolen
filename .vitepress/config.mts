import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

function genSideBar(dir: string, sidebar: any[]) {
  const tmp = fs
    .readdirSync(dir)
    .filter(
      (item) =>
        !item.startsWith(".") && !["node_modules", "pictures"].includes(item)
    )
    .sort((a, b) => {
      if (a.includes(".md") && b.includes(".md")) {
        return a > b ? 1 : -1;
      } else {
        return a.includes(".md") ? -1 : 1;
      }
    });
  tmp.forEach((item) => {
    const stat = fs.statSync(path.join(dir, item));
    if (!stat.isDirectory() && item.endsWith(".md")) {
      sidebar.push({
        text: item.replace(".md", ""),
        link: path.join(dir, item),
      });
    } else if (stat.isDirectory()) {
      const obj = {
        text: item,
        collapsed: true,
        items: [],
      };
      sidebar.push(obj);
      genSideBar(path.join(dir, item), obj.items);
    }
  });
}

const sidebar = [];
genSideBar("./docs", sidebar);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Stolen documents",
  description: "stfu, you should just do it",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Labuladong",
        link: "/docs/labuladong-fucking-algorithm/目录.md",
      },
    ],
    sidebar: [...sidebar],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  outDir: 'dist',
  base: '/stolen/',
  vite: {
    assetsInclude: ["**/*.PNG"],
  },
});
