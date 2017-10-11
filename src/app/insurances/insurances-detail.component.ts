import { Component, Input } from '@angular/core';

import { Insurance } from './../shared/models/insurance.model';

@Component({
    selector: 'app-insurances-detail',
    templateUrl: './insurances-detail.component.html',
})
export class InsurancesDetailComponent {
    @Input()
    insurance: Insurance
}