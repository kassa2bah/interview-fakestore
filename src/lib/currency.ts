// Currency utility for Gambian Dalasi (GMD)
// Exchange rate: 1 USD ≈ 67 GMD (approximate)

const USD_TO_GMD_RATE = 67;

export const formatGMD = (usdPrice: number): string => {
  const gmdPrice = usdPrice * USD_TO_GMD_RATE;
  return `D${gmdPrice.toLocaleString('en-GM', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

export const convertToGMD = (usdPrice: number): number => {
  return usdPrice * USD_TO_GMD_RATE;
};
