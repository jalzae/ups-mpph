export interface FormatAction {
  action: string;
  class?: string;
  model: string;
  title?: string;
  icon?: string;
}

export interface Format {
  header: string[];
  body: string[];
  btn2?: any[];
  action: FormatAction[];
}
