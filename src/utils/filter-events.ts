import { CampusEvent } from "../types/campus-event";

export function filterEvents(eventsList: CampusEvent[], searchTerm: string, category: string): CampusEvent[] {
  return eventsList.filter(e => {
    const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(searchTerm.toLocaleLowerCase("tr-TR")) || 
                        e.description.toLocaleLowerCase("tr-TR").includes(searchTerm.toLocaleLowerCase("tr-TR")) ||
                        e.category.toLocaleLowerCase("tr-TR").includes(searchTerm.toLocaleLowerCase("tr-TR"));
    const kategoriUyuyor = category === "" || e.category === category;
    return metinUyuyor && kategoriUyuyor;
  });
}