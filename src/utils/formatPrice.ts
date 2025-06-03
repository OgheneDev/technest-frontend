export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
