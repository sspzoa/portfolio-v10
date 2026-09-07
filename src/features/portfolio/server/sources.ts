import type { NotionSort } from "@/server/notion/query";

interface PortfolioSource {
  id: string;
  sorts: readonly NotionSort[];
}

const dateDescending = [{ property: "date", direction: "descending" }] as const;

export const portfolioSources = {
  aboutMe: { id: "25fcc9b7-2a9c-80f4-a759-000b59d1f09f", sorts: [] },
  activities: { id: "889a539f-82dc-4f83-ab36-340172a96423", sorts: dateDescending },
  awards: { id: "405fc2ab-6a7e-4a82-ad81-32a95f57fc60", sorts: dateDescending },
  careers: { id: "2c6cc9b7-2a9c-81fa-acfd-000bdde3a07f", sorts: dateDescending },
  certificates: { id: "3cedc9df-03cd-4f10-ba58-0285dee8c4c1", sorts: dateDescending },
  educations: { id: "2c6cc9b7-2a9c-8170-8a33-000bb91df281", sorts: dateDescending },
  experiences: { id: "b67f0d03-5df5-4cb4-a3e6-0b3e05cf744a", sorts: dateDescending },
  projects: {
    id: "4314b88e-8d9d-4c21-b890-4ae84eeb9998",
    sorts: [
      { property: "isSideProject", direction: "ascending" },
      { property: "workPeriod", direction: "descending" },
    ],
  },
  skills: {
    id: "6ea68ec8-532c-4499-9eb7-1ea85b91440b",
    sorts: [
      { property: "category", direction: "ascending" },
      { property: "name", direction: "ascending" },
    ],
  },
} as const satisfies Record<string, PortfolioSource>;

export type PortfolioSourceKey = keyof typeof portfolioSources;
