export const getCount = (donators: any) => {
  return donators.at(-1)?.amount / Math.pow(10, 18) || 0
}