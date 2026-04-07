import { Component, Input, OnChanges, SimpleChanges, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeasurementService } from '../../services/measurement';
import { ArithmeticRequestDTO, CompareRequestDTO, ConvertRequestDTO } from '../../models/measurement.models';

@Component({
  selector: 'app-input-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-panel.html',
  styleUrls: ['./input-panel.css'],
})
export class InputPanelComponent implements OnChanges {

  private measurementService = inject(MeasurementService);

  @Input() operation!: string;
  @Input() type!: string;

  // ✅ Signals (instead of normal variables)
  value1 = signal(0);
  value2 = signal(0);
  result = signal<string | number>(0);

  unit1 = signal('');
  unit2 = signal('');
  targetUnit = signal('');

  units: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.setUnits();
      this.resetValues();
    }
  }

  setUnits() {
    if (this.type === 'LengthUnit') {
      this.units = ['INCHES', 'FEET', 'YARD', 'CENTIMETRE'];
    } 
    else if (this.type === 'TemperatureUnit') {
      this.units = ['CELSIUS', 'FAHRENHEIT', 'KELVIN'];
    } 
    else if (this.type === 'VolumeUnit') {
      this.units = ['LITER', 'GALLON', 'MILLILITER'];
    } 
    else if (this.type === 'WeightUnit') {
      this.units = ['GRAMS', 'KILOGRAMS', 'POUNDS'];
    } 
    else {
      this.units = [];
    }

    this.unit1.set(this.units[0] || '');
    this.unit2.set(this.units[1] || this.units[0] || '');
    this.targetUnit.set(this.units[0] || '');
  }

  resetValues() {
    this.value1.set(0);
    this.value2.set(0);
    this.result.set(0);
  }

  sendData() {
    console.log("Operation:", this.operation);

    switch (this.operation) {
      case 'convert': {
        const request: ConvertRequestDTO = {
          thisQuantity: { value: this.value1(), unit: this.unit1() },
          targetUnit: this.targetUnit()
        };
        this.measurementService.convert(request).subscribe({
          next: (res) => this.result.set(res?.resultValue ?? 0),
          error: (err) => console.error("Error:", err)
        });
        break;
      }
      case 'compare': {
        const request: CompareRequestDTO = {
          thisQuantity: { value: this.value1(), unit: this.unit1() },
          thatQuantity: { value: this.value2(), unit: this.unit2() }
        };
        this.measurementService.compare(request).subscribe({
          next: (res) => this.result.set(res?.resultString ?? "No result"),
          error: (err) => console.error("Error:", err)
        });
        break;
      }
      case 'add': {
        const request: ArithmeticRequestDTO = {
          thisQuantity: { value: this.value1(), unit: this.unit1() },
          thatQuantity: { value: this.value2(), unit: this.unit2() },
          targetUnit: this.targetUnit()
        };
        this.measurementService.add(request).subscribe({
          next: (res) => this.result.set(res?.resultValue ?? 0),
          error: (err) => console.error("Error:", err)
        });
        break;
      }
      case 'subtract': {
        const request: ArithmeticRequestDTO = {
          thisQuantity: { value: this.value1(), unit: this.unit1() },
          thatQuantity: { value: this.value2(), unit: this.unit2() },
          targetUnit: this.targetUnit()
        };
        this.measurementService.subtract(request).subscribe({
          next: (res) => this.result.set(res?.resultValue ?? 0),
          error: (err) => console.error("Error:", err)
        });
        break;
      }
      case 'divide': {
        const request: ArithmeticRequestDTO = {
          thisQuantity: { value: this.value1(), unit: this.unit1() },
          thatQuantity: { value: this.value2(), unit: this.unit2() },
          targetUnit: this.targetUnit()
        };
        this.measurementService.divide(request).subscribe({
          next: (res) => this.result.set(res?.resultValue ?? 0),
          error: (err) => console.error("Error:", err)
        });
        break;
      }
      default:
        console.error("Unknown operation:", this.operation);
    }
  }
}