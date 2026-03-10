export const SIDEBAR_SECTIONS = [
  {
    key: "main",
    items: [
      { key: "dashboard", label: "Dashboard", path: "/dashboard" },
      { key: "products", label: "Products", path: "/products" },
      { key: "favourites", label: "Favourites", path: "/favourites" },
      { key: "inbox", label: "Inbox", path: "/inbox" },
      { key: "order-lists", label: "Order Lists", path: "/order-lists" },
      { key: "product-stock", label: "Product Stock", path: "/product-stock" },
    ],
  },
  {
    key: "pages",
    heading: "Pages",
    items: [
      { key: "pricing", label: "Pricing", path: "/pricing" },
      { key: "calendar", label: "Calendar", path: "/calendar" },
      { key: "to-do", label: "To-Do", path: "/to-do" },
      { key: "contact", label: "Contact", path: "/contact" },
      { key: "invoice", label: "Invoice", path: "/invoice" },
      { key: "ui-elements", label: "UI Elements", path: "/ui-elements" },
      { key: "team", label: "Team", path: "/team" },
      { key: "table", label: "Table", path: "/table" },
    ],
  },
  {
    key: "account",
    items: [
      { key: "settings", label: "Settings", path: "/settings" },
      { key: "logout", label: "Logout", path: "/logout" },
    ],
  },
];

export const AUTH_SESSION_KEY = "auth_session";
export const DARK_MODE_KEY = "dark_mode_enabled";
