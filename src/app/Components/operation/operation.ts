import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelComponent } from '../input-panel/input-panel'; // ✅ FIXED

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [CommonModule, InputPanelComponent], // ✅ UPDATED
  templateUrl: './operation.html',
  styleUrls: ['./operation.css']
})
export class OperationComponent {

  selectedOperation = 'convert';

  @Input() selectedType!: string;

  operations = [
  { title: 'Conversion', emoji: '🔄', type: 'convert' },
  { title: 'Add', emoji: '➕', type: 'add' },
  { title: 'Subtract', emoji: '➖', type: 'subtract' },
  { title: 'Divide', emoji: '➗', type: 'divide' },
  { title: 'Compare', emoji: '⚖️', type: 'compare' }
];

getDescription(type: string): string {
  switch (type) {
    case 'convert': return 'Convert units';
    case 'add': return 'Add quantities';
    case 'subtract': return 'Subtract values';
    case 'divide': return 'Divide values';
    case 'compare': return 'Compare two values';
    default: return '';
  }
}

  selectOperation(type: string) {
    this.selectedOperation = type;
  }
}