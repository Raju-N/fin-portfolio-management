import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StoreService } from '@financial-management/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AssetDetail } from '../../../../shared/interfaces/global.interface';

@Component({
  selector: 'app-investment-form',
  standalone: false,
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.scss',
})
export class InvestmentFormComponent implements OnInit {
  investmentForm: FormGroup = {} as FormGroup;
  modalRef?: BsModalRef;

  assetsList: AssetDetail[] = [];

  constructor(private fb: FormBuilder, private modalService: BsModalService, private storeService: StoreService) {}

  getFormControl(controlName: string) {
    return (
      this.investmentForm?.get(controlName) ?? ({ invalid: false, touched: false, errors: {} } as ValidationErrors)
    );
  }

  ngOnInit() {
    this.createInvestmentForm();
    this.fetchAssets();
  }

  fetchAssets() {
    this.assetsList = this.storeService.getAssets();
  }

  private resetInvestmentForm() {
    this.investmentForm.reset({
      assetName: '', // Reset asset name field
      assetDetails: {}, // Ensure assetDetails is cleared properly
      quantity: '',
      purchasePrice: '',
      purchaseDate: null,
    });
  }

  private createInvestmentForm() {
    this.investmentForm = this.fb.group({
      assetName: ['', [Validators.required, this.validateAssetType]],
      assetDetails: [{}],
      quantity: ['', [Validators.required, Validators.min(1)]],
      purchasePrice: ['', [Validators.required, Validators.min(1)]],
      purchaseDate: [null, Validators.required],
    });
  }

  // Custom validator to check if entered asset type exists in assetList
  validateAssetType = (control: any) => {
    if (!control.value) return null;
    const assetExists = this.assetsList.some((asset) => asset.name === control.value);
    return assetExists ? null : { invalidAsset: true };
  };

  onAssetSelect(event: any) {
    const selectedAsset = event.item; // Get the full object
    // Update form with the full object instead of just the name
    this.investmentForm.patchValue({
      assetDetails: selectedAsset, // Store the full object
    });
  }

  onSubmitConfirmed() {
    if (this.investmentForm.invalid) return;
    this.storeService.updateTransaction(this.investmentForm.getRawValue());
    this.modalRef?.hide();
    this.resetInvestmentForm();
  }

  openReviewModal(template: TemplateRef<any>) {
    if (this.investmentForm.invalid) return;
    this.modalRef = this.modalService.show(template);
  }

  confirmSubmit() {
    this.modalRef?.hide(); // Close modal after confirmation
  }
}
