export interface PhysicalCardData {
  type?: string;
  id?: string;
  style?: {
    width?: string;
    height?: string;
    max_width?: string;
    max_height?: string;
    cover_max_height?: string;
  };
  color?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  url?: string;
  cover?: string;
  categories?: string[];
  tags?: string[];
  properties?: Array<{
    icon?: string;
    value?: any;
    view?: string;
    payload?: any;
  }>;
  details?: {
    table?: {
      rows?: Array<{
        columns?: Array<{
          label?: string;
          value?: any;
          view?: string;
          payload?: any;
        }>;
      }>;
    };
  };
}