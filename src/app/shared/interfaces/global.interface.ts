export interface AssetDetail {
  name: string;
  ticker: string;
  sector: string;
  cmp: number;
}

export interface TransactionHistory {
  assetName: string;
  assetDetails: AssetDetail;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}

export interface InvestmentOnAsset {
  totalInvestment: number;
  currentValue: number;
  quantity: number;
  averagePurchasePrice: number;
  profitLossAmount: number;
  profitLossPercentage: string;
  assetName: string;
  currentMarketPrice: number;
}

export interface InvestmentSummary {
  [ticker: string]: InvestmentOnAsset;
}
