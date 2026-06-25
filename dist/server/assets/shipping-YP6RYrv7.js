//#region src/lib/shipping.ts
function getDeliveryCharge(subtotal) {
	if (subtotal <= 0) return 0;
	if (subtotal < 499) return 99;
	if (subtotal <= 999) return 49;
	return 0;
}
function getFreeDeliveryShortfall(subtotal) {
	if (subtotal <= 0 || subtotal > 999) return 0;
	return 1e3 - subtotal;
}
//#endregion
export { getFreeDeliveryShortfall as n, getDeliveryCharge as t };
