export const orders = [
  {
    id: 1,
    customer: "John Doe (Table 5)",
    product: "Margherita Pizza & Coke",
    orderNumber: "RES-1001",
    date: "2025-10-03",
    status: "pending", 
    confirmation: false,
  },
  {
    id: 2,
    customer: "Sarah Smith (Table 2)",
    product: "Caesar Salad & Grilled Chicken",
    orderNumber: "RES-1002",
    date: "2025-10-03",
    status: "canceled",
    confirmation: true,
  },
  {
    id: 3,
    customer: "Michael Brown (Table 8)",
    product: "Spaghetti Bolognese & Garlic Bread",
    orderNumber: "RES-1003",
    date: "2025-10-02",
    status: "completed",
    confirmation: true,
  },
  {
    id: 4,
    customer: "Emma Wilson (Table 1)",
    product: "Cheeseburger, Fries & Milkshake",
    orderNumber: "RES-1004",
    date: "2025-10-01",
    status: "canceled",
    confirmation: false,
  },
  {
    id: 5,
    customer: "David Johnson (Table 3)",
    product: "Grilled Salmon & Lemonade",
    orderNumber: "RES-1005",
    date: "2025-09-30",
    status: "completed",
    confirmation: true,
  },
  {
    id: 6,
    customer: "Sophia Lee (Table 6)",
    product: "Pepperoni Pizza & Iced Tea",
    orderNumber: "RES-1006",
    date: "2025-09-29",
    status: "pending",
    confirmation: false,
  },
];
export const stockAlerts = [
  {
    id: 1,
    product: "Grilled Chicken Sandwich",
    status: "Running low",
    action: "Refill",
  },
  {
    id: 2,
    product: "Margherita Pizza",
    status: "out of stock",
    action: "Refill",
  },
  {
    id: 3,
    product: "Caesar Salad",
    status: "Running low",
    action: "Refill",
  },
  {
    id: 4,
    product: "Beef Burger",
    status: "out of stock",
    action: "Refill",
  },
  {
    id: 5,
    product: "Pasta Alfredo",
    status: "Running low",
    action: "Refill",
  },
  {
    id: 6,
    product: "Chocolate Lava Cake",
    status: "restocked",
    action: "Refill",
  },
];
export const categories = [
  {
    id: 1,
    category: "Appetizers",
    numberOfItems: 12,
  },
  {
    id: 2,
    category: "Main Courses",
    numberOfItems: 25,
  },
  {
    id: 3,
    category: "Pizzas",
    numberOfItems: 18,
  },
  {
    id: 4,
    category: "Burgers & Sandwiches",
    numberOfItems: 15,
  },
  {
    id: 5,
    category: "Salads",
    numberOfItems: 10,
  },
  {
    id: 6,
    category: "Pastas",
    numberOfItems: 14,
  },
  {
    id: 7,
    category: "Desserts",
    numberOfItems: 9,
  },
  {
    id: 8,
    category: "Beverages",
    numberOfItems: 20,
  },
];

