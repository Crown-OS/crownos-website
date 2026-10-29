import { crownos } from "./crownos";
import { crownpaper } from "./crownpaper";
import { crownui } from "./crownui";

export * from "./types";

export const docsProjects = [crownos, crownui, crownpaper] as const;

export const docsSource = {
  edit: "https://github.com/Crown-OS/crownos-website/edit/main/src/content/docs",
};

export const findDocsProject = (id: string) =>
  docsProjects.find((project) => project.id === id);
