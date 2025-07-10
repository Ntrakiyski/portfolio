
export interface NavItem {
  name: string;
  href: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}
