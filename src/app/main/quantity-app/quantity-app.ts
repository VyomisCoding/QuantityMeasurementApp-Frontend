import { Component } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { MeasurementTypeComponent } from '../../Components/measurement-type/measurement-type';


@Component({
  selector: 'app-quantity-app',
  standalone: true,
  imports: [Navbar, MeasurementTypeComponent],
  templateUrl: './quantity-app.html',
  styleUrl: './quantity-app.css',
})
export class QuantityApp {}
