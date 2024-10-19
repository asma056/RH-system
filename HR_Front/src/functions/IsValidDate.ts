export const isValidDate = (date: Date): boolean => {
  const year = date.getFullYear()
  if (year < 1920) return false
  return true
}
