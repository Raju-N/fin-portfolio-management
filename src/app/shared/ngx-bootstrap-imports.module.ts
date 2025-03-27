import { NgModule } from '@angular/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [BsDatepickerModule, ModalModule, TypeaheadModule],
  exports: [BsDatepickerModule, ModalModule, TypeaheadModule],
  providers: [BsModalService],
})
export class NgxBootstrapImportsModule {}
