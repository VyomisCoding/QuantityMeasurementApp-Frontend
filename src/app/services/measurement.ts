import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ArithmeticRequestDTO, 
  CompareRequestDTO, 
  ConvertRequestDTO, 
  QuantityMeasurementDTO 
} from '../models/measurement.models';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private http = inject(HttpClient);
  private baseUrl = 'https://quantitymeasurementapp-production-c47a.up.railway.app/api/measurements';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  add(request: ArithmeticRequestDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.baseUrl}/add`, request, { headers: this.getHeaders() });
  }

  subtract(request: ArithmeticRequestDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.baseUrl}/subtract`, request, { headers: this.getHeaders() });
  }

  divide(request: ArithmeticRequestDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.baseUrl}/divide`, request, { headers: this.getHeaders() });
  }

  convert(request: ConvertRequestDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.baseUrl}/convert`, request, { headers: this.getHeaders() });
  }

  compare(request: CompareRequestDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.baseUrl}/compare`, request, { headers: this.getHeaders() });
  }

  getHistory(): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.baseUrl}/history`, { headers: this.getHeaders() });
  }

  getByOperation(operation: string): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.baseUrl}/history/${operation}`, { headers: this.getHeaders() });
  }

  getByType(measurementType: string): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.baseUrl}/history/type/${measurementType}`, { headers: this.getHeaders() });
  }

  getErrorHistory(): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.baseUrl}/history/errored`, { headers: this.getHeaders() });
  }

  getOperationCount(operation: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count/${operation}`, { headers: this.getHeaders() });
  }
}
