
export interface NavItem {
  name: string;
  href: string;
  shortcut?: string; // Optional shortcut property
  subItems?: NavItem[]; // Optional array for sub-navigation items
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}
