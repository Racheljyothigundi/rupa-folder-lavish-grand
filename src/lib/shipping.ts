export function getDeliveryCharge(subtotal: number) {
  if (subtotal <= 0) return 0;
  if (subtotal < 499) return 99;
  if (subtotal <= 999) return 49;
  return 0;
}

export function getFreeDeliveryShortfall(subtotal: number) {
  if (subtotal <= 0 || subtotal > 999) return 0;
  return 1000 - subtotal;
}
