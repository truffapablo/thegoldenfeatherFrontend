
export const eventPriceHasChanged = (currentPrice = 0, reservedPrice = 0) => {
    if (currentPrice !== reservedPrice) {
        return true;
    }
    return false;
}