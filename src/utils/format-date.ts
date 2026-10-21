export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });
}