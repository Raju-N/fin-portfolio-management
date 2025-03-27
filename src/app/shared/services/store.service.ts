import { AssetDetail, InvestmentOnAsset, InvestmentSummary, TransactionHistory } from '../interfaces/global.interface';
import { transactionHistoryMock } from '../mocks/transaction-history';
import { AssetsList } from './../mocks/assets-list';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private assetsList: AssetDetail[] = AssetsList;
  //private transactionHistory: transactionHistory[] = [];
  private transactionHistory: TransactionHistory[] = transactionHistoryMock;

  // Cached Computed Data per Asset
  private portfolioData: InvestmentSummary = {};

  private sectorAllocation: { [sector: string]: number } = {};
  private totalMarketValue = 0;
  private totalProfitLoss = 0;

  onPortfolioUpdate = new BehaviorSubject<any>('');

  constructor() {
    this.updatePortfolio();
  }

  /** Resets all computed values */
  private resetData(): void {
    this.portfolioData = {};
    this.sectorAllocation = {};
    this.totalMarketValue = 0;
    this.totalProfitLoss = 0;
  }

  /** #region ---- Processes transaction history and updates portfolioData */
  private processTransactions(): void {
    this.transactionHistory.forEach((txn) => {
      const { ticker, sector } = txn.assetDetails;
      const cmp = this.getCurrentMarketPrice(ticker);

      if (!this.portfolioData[ticker]) {
        this.portfolioData[ticker] = {
          totalInvestment: 0,
          currentValue: 0,
          quantity: 0,
          averagePurchasePrice: 0,
          profitLossAmount: 0,
          profitLossPercentage: '0',
          assetName: '',
          currentMarketPrice: 0,
        };
      }

      // Update investment, quantity, and current value
      const assetData = this.portfolioData[ticker];
      assetData.totalInvestment += txn.quantity * txn.purchasePrice;
      assetData.quantity += txn.quantity;
      assetData.currentValue += txn.quantity * cmp;

      // Track sector-wise allocation
      this.sectorAllocation[sector] = (this.sectorAllocation[sector] || 0) + txn.quantity * txn.purchasePrice;
    });

    this.calculateAveragePurchasePrice();
  }

  /** #endregion ---- Processes transaction history and updates portfolioData */

  /** #region ---- Calculates average purchase price for each asset */
  private calculateAveragePurchasePrice(): void {
    Object.keys(this.portfolioData).forEach((ticker) => {
      const asset = this.portfolioData[ticker];
      asset.averagePurchasePrice = asset.quantity > 0 ? asset.totalInvestment / asset.quantity : 0;
    });
  }
  /** #endregion ---- Calculates average purchase price for each asset */

  /** #region ---- Calculates profit/loss for each asset */
  private calculateProfitLoss(): void {
    Object.keys(this.portfolioData).forEach((ticker) => {
      const asset = this.portfolioData[ticker];
      asset.profitLossAmount = asset.currentValue - asset.totalInvestment;
      asset.profitLossPercentage =
        asset.totalInvestment > 0 ? ((asset.profitLossAmount / asset.totalInvestment) * 100).toFixed() : '0';
    });
  }
  /** #endregion ---- Calculates profit/loss for each asset */

  /** #region ---- Calculates total market value and total profit/loss */
  private calculateTotalValues(): void {
    this.totalMarketValue = Object.values(this.portfolioData).reduce((sum, asset) => sum + asset.currentValue, 0);
    this.totalProfitLoss = Object.values(this.portfolioData).reduce((sum, asset) => sum + asset.profitLossAmount, 0);
  }
  /** #endregion ---- Calculates total market value and total profit/loss */

  /** Returns current market price of an asset */
  private getCurrentMarketPrice(ticker: string): number {
    return this.assetsList.find((a) => a.ticker === ticker)?.cmp || 0;
  }

  getAssets() {
    return this.assetsList;
  }

  updateTransaction(transaction: TransactionHistory) {
    this.transactionHistory.push(transaction);
    this.updatePortfolio();
  }

  /** Updates the portfolio by recomputing all values */
  updatePortfolio(): void {
    this.resetData();
    this.processTransactions();
    this.calculateProfitLoss();
    this.calculateTotalValues();
  }

  // GET WIDGET DATA - Get Sector-wise Allocation
  getSectorWiseAllocation(): { [sector: string]: number } {
    return this.sectorAllocation;
  }

  // GET WIDGET DATA - Get Performance Metrics
  getPerformanceMetrics(): InvestmentOnAsset[] {
    return this.assetsList
      .filter((liveAsset) => this.portfolioData[liveAsset.ticker]) // Ensure asset is in portfolio
      .map((liveAsset) => {
        const portfolioAsset = this.portfolioData[liveAsset.ticker];

        return {
          ...portfolioAsset,
          assetName: liveAsset.name,
          currentMarketPrice: liveAsset.cmp,
        };
      });
  }

  // GET WIDGET DATA - Get Market Trend
  getMarketTrend(): { totalMarketValue: number; totalProfitLoss: number } {
    return {
      totalMarketValue: this.totalMarketValue,
      totalProfitLoss: this.totalProfitLoss,
    };
  }
}
