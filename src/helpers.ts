export const reorderList = ({ list, startIndex, endIndex }: { list: any[]; startIndex: number; endIndex: number }) => {
  const reorderedList = [...list]
  const [removed] = reorderedList.splice(startIndex, 1)
  reorderedList.splice(endIndex, 0, removed)

  return reorderedList
}
