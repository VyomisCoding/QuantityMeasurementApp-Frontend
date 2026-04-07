import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { MeasurementService } from '../../services/measurement';
import { QuantityMeasurementDTO } from '../../models/measurement.models';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.html',
  standalone: true,
  imports: [CommonModule, Navbar],
  styleUrls: ['./history-sidebar.css']
})
export class HistorySidebarComponent implements OnInit {

  private measurementService = inject(MeasurementService);

  operations = [
    { title: 'Convert', emoji: '🔄', type: 'CONVERT' },
    { title: 'Add', emoji: '➕', type: 'ADD' },
    { title: 'Subtract', emoji: '➖', type: 'SUBTRACT' },
    { title: 'Divide', emoji: '➗', type: 'DIVIDE' },
    { title: 'Compare', emoji: '⚖️', type: 'COMPARE' }
  ];

  selectedOperation = 'CONVERT';
  history = signal<QuantityMeasurementDTO[]>([]);
  loading = false;

  ngOnInit() {
    this.loadHistory();
  }

  selectOperation(op: string) {
    this.selectedOperation = op;
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;

    this.measurementService.getByOperation(this.selectedOperation).subscribe({
      next: (res) => this.history.set(res),
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }
}