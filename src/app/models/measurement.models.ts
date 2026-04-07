export interface GrantedAuthority {
  authority: string;
}

export interface User {
  id?: number;
  username: string;
  password?: string;
  enabled?: boolean;
  authorities?: GrantedAuthority[];
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  accountNonExpired?: boolean;
}

export interface QuantityDTO {
  value: number;
  unit: string;
}

export interface ArithmeticRequestDTO {
  thisQuantity: QuantityDTO;
  thatQuantity: QuantityDTO;
  targetUnit?: string;
}

export interface ConvertRequestDTO {
  thisQuantity: QuantityDTO;
  targetUnit: string;
}

export interface CompareRequestDTO {
  thisQuantity: QuantityDTO;
  thatQuantity: QuantityDTO;
}

export interface QuantityMeasurementDTO {
  thisValue?: number;
  thisUnit?: string;
  thisMeasurementType?: string;
  thatValue?: number;
  thatUnit?: string;
  thatMeasurementType?: string;
  operation?: string;
  resultString?: string;
  resultValue?: number;
  resultUnit?: string;
  resultMeasurementType?: string;
  errorMessage?: string;
  error?: boolean;
}
