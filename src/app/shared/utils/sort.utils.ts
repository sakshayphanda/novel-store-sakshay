export function sortByTitle(sortBy: string) {
  return (a: any, b: any) => a[sortBy].localeCompare(b[sortBy]);
}

export function sortByYear(sortBy: string) {
  return (a: any, b: any) => a[sortBy] - b[sortBy];
}
