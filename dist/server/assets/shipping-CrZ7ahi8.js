//#region src/lib/shipping.ts
function getDeliveryCharge(subtotal) {
	if (subtotal <= 0) return 0;
	if (subtotal < 499) return 99;
	if (subtotal <= 999) return 49;
	return 0;
}
function getCodDeliveryCharge(city, state) {
	const normalizedCity = city.trim().toLowerCase();
	const normalizedState = state.trim().toLowerCase();
	if (normalizedCity === "hyderabad") return 50;
	if (normalizedState.includes("andhra")) return 90;
	return 70;
}
function getFreeDeliveryShortfall(subtotal) {
	if (subtotal <= 0 || subtotal > 999) return 0;
	return 1e3 - subtotal;
}
//#endregion
export { getDeliveryCharge as n, getFreeDeliveryShortfall as r, getCodDeliveryCharge as t };
