export interface LimitFields {
  method: string;
  limits: string;
  tntcLimit: string;
  tftcLimit: string;
}

export interface SwabSample {
  id: string;
  methodUsed: string;
  solvantName: string;
  solvantQuantity: string;
  defaultRecovery: string;
  useRecovery: string;
  mocs: MOC[];
}

export interface MOC {
  id: string;
  moc: string;
  recovery: string;
}
