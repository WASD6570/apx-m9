export function paginationLimit(
  limit: string,
  offset: string,
  totalRows: number
): { realLimit: number; realOffset: number } {
  return {
    realLimit: parseInt(limit) > 10 ? 10 : parseInt(limit),
    realOffset:
      parseInt(offset) >= totalRows ? totalRows - 1 : parseInt(offset),
  };
}
