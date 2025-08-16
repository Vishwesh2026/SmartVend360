// SmartVend360 Mock Data for Frontend Development
export const mockMachines = [
  // India - Bangalore
  { id: 'VM001', name: 'Koramangala Hub', location: { lat: 12.9352, lng: 77.6245, city: 'Bangalore', country: 'India' }, status: 'active', revenue: 45200, transactions: 342, uptime: 98.5, stockLevel: 85, lastMaintenance: '2025-07-10' },
  { id: 'VM002', name: 'MG Road Station', location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore', country: 'India' }, status: 'maintenance', revenue: 32100, transactions: 256, uptime: 92.1, stockLevel: 45, lastMaintenance: '2025-07-05' },
  { id: 'VM003', name: 'Whitefield Tech Park', location: { lat: 12.9698, lng: 77.7500, city: 'Bangalore', country: 'India' }, status: 'active', revenue: 52300, transactions: 398, uptime: 99.2, stockLevel: 78, lastMaintenance: '2025-07-12' },
  { id: 'VM004', name: 'Electronic City', location: { lat: 12.8456, lng: 77.6623, city: 'Bangalore', country: 'India' }, status: 'restocking', revenue: 38900, transactions: 289, uptime: 95.8, stockLevel: 15, lastMaintenance: '2025-07-08' },
  { id: 'VM005', name: 'HSR Layout', location: { lat: 12.9081, lng: 77.6476, city: 'Bangalore', country: 'India' }, status: 'active', revenue: 41800, transactions: 312, uptime: 97.3, stockLevel: 92, lastMaintenance: '2025-07-11' },
  { id: 'VM006', name: 'Indiranagar Metro', location: { lat: 12.9784, lng: 77.6408, city: 'Bangalore', country: 'India' }, status: 'offline', revenue: 28700, transactions: 201, uptime: 78.9, stockLevel: 0, lastMaintenance: '2025-07-02' },
  { id: 'VM007', name: 'Brigade Road', location: { lat: 12.9726, lng: 77.6099, city: 'Bangalore', country: 'India' }, status: 'active', revenue: 48600, transactions: 367, uptime: 98.8, stockLevel: 88, lastMaintenance: '2025-07-13' },
  { id: 'VM008', name: 'Jayanagar Complex', location: { lat: 12.9279, lng: 77.5838, city: 'Bangalore', country: 'India' }, status: 'maintenance', revenue: 35400, transactions: 267, uptime: 89.4, stockLevel: 52, lastMaintenance: '2025-07-06' },

  // Japan - Tokyo
  { id: 'VM101', name: 'Shibuya Station', location: { lat: 35.6598, lng: 139.7006, city: 'Tokyo', country: 'Japan' }, status: 'active', revenue: 89200, transactions: 542, uptime: 99.1, stockLevel: 91, lastMaintenance: '2025-07-14' },
  { id: 'VM102', name: 'Shinjuku East', location: { lat: 35.6896, lng: 139.7006, city: 'Tokyo', country: 'Japan' }, status: 'active', revenue: 95800, transactions: 612, uptime: 98.9, stockLevel: 83, lastMaintenance: '2025-07-12' },
  { id: 'VM103', name: 'Ginza Central', location: { lat: 35.6762, lng: 139.7649, city: 'Tokyo', country: 'Japan' }, status: 'restocking', revenue: 76400, transactions: 456, uptime: 96.7, stockLevel: 22, lastMaintenance: '2025-07-10' },
  { id: 'VM104', name: 'Akihabara Tech', location: { lat: 35.6989, lng: 139.7731, city: 'Tokyo', country: 'Japan' }, status: 'active', revenue: 82300, transactions: 498, uptime: 98.2, stockLevel: 89, lastMaintenance: '2025-07-13' },
  { id: 'VM105', name: 'Harajuku Plaza', location: { lat: 35.6703, lng: 139.7027, city: 'Tokyo', country: 'Japan' }, status: 'active', revenue: 71200, transactions: 423, uptime: 97.8, stockLevel: 76, lastMaintenance: '2025-07-11' },
  { id: 'VM106', name: 'Tokyo Station', location: { lat: 35.6812, lng: 139.7671, city: 'Tokyo', country: 'Japan' }, status: 'maintenance', revenue: 88900, transactions: 534, uptime: 94.3, stockLevel: 58, lastMaintenance: '2025-07-07' },
  { id: 'VM107', name: 'Roppongi Hills', location: { lat: 35.6606, lng: 139.7292, city: 'Tokyo', country: 'Japan' }, status: 'active', revenue: 93400, transactions: 578, uptime: 99.3, stockLevel: 94, lastMaintenance: '2025-07-14' },
  { id: 'VM108', name: 'Ueno Park', location: { lat: 35.7148, lng: 139.7731, city: 'Tokyo', country: 'Japan' }, status: 'offline', revenue: 42100, transactions: 231, uptime: 82.1, stockLevel: 0, lastMaintenance: '2025-07-03' },

  // Japan - Osaka
  { id: 'VM201', name: 'Osaka Station', location: { lat: 34.7024, lng: 135.4959, city: 'Osaka', country: 'Japan' }, status: 'active', revenue: 78600, transactions: 467, uptime: 98.6, stockLevel: 87, lastMaintenance: '2025-07-13' },
  { id: 'VM202', name: 'Namba District', location: { lat: 34.6618, lng: 135.4986, city: 'Osaka', country: 'Japan' }, status: 'active', revenue: 84200, transactions: 512, uptime: 97.9, stockLevel: 79, lastMaintenance: '2025-07-11' },
  { id: 'VM203', name: 'Dotonbori Plaza', location: { lat: 34.6686, lng: 135.5023, city: 'Osaka', country: 'Japan' }, status: 'restocking', revenue: 69800, transactions: 398, uptime: 95.4, stockLevel: 18, lastMaintenance: '2025-07-09' },
  { id: 'VM204', name: 'Tennoji Hub', location: { lat: 34.6452, lng: 135.5066, city: 'Osaka', country: 'Japan' }, status: 'active', revenue: 72400, transactions: 434, uptime: 98.1, stockLevel: 92, lastMaintenance: '2025-07-12' },
  { id: 'VM205', name: 'Sumiyoshi Station', location: { lat: 34.6198, lng: 135.4936, city: 'Osaka', country: 'Japan' }, status: 'maintenance', revenue: 54300, transactions: 312, uptime: 91.7, stockLevel: 41, lastMaintenance: '2025-07-06' },
  { id: 'VM206', name: 'Universal City', location: { lat: 34.6654, lng: 135.4323, city: 'Osaka', country: 'Japan' }, status: 'active', revenue: 89700, transactions: 567, uptime: 99.0, stockLevel: 88, lastMaintenance: '2025-07-14' }
];

export const mockProducts = [
  { id: 'P001', name: 'Green Tea (500ml)', category: 'Beverages', price: { INR: 25, JPY: 120 }, popularity: 94, stock: 1250 },
  { id: 'P002', name: 'Coffee Black (250ml)', category: 'Beverages', price: { INR: 30, JPY: 150 }, popularity: 89, stock: 980 },
  { id: 'P003', name: 'Protein Bar', category: 'Snacks', price: { INR: 45, JPY: 200 }, popularity: 76, stock: 760 },
  { id: 'P004', name: 'Mineral Water (1L)', category: 'Beverages', price: { INR: 20, JPY: 100 }, popularity: 98, stock: 1540 },
  { id: 'P005', name: 'Instant Noodles', category: 'Meals', price: { INR: 35, JPY: 180 }, popularity: 82, stock: 890 },
  { id: 'P006', name: 'Energy Drink', category: 'Beverages', price: { INR: 50, JPY: 250 }, popularity: 71, stock: 450 },
  { id: 'P007', name: 'Sandwich (Veg)', category: 'Meals', price: { INR: 60, JPY: 300 }, popularity: 68, stock: 320 },
  { id: 'P008', name: 'Chips Pack', category: 'Snacks', price: { INR: 25, JPY: 130 }, popularity: 85, stock: 1120 }
];

export const mockTransactions = [
  { id: 'T001', machineId: 'VM001', productId: 'P001', timestamp: '2025-07-15T08:30:00Z', amount: 25, currency: 'INR', paymentMethod: 'UPI', customer: 'Anonymous' },
  { id: 'T002', machineId: 'VM101', productId: 'P004', timestamp: '2025-07-15T09:15:00Z', amount: 100, currency: 'JPY', paymentMethod: 'IC Card', customer: 'Anonymous' },
  { id: 'T003', machineId: 'VM003', productId: 'P002', timestamp: '2025-07-15T10:45:00Z', amount: 30, currency: 'INR', paymentMethod: 'Credit Card', customer: 'Anonymous' },
  { id: 'T004', machineId: 'VM102', productId: 'P005', timestamp: '2025-07-15T11:20:00Z', amount: 180, currency: 'JPY', paymentMethod: 'Mobile Wallet', customer: 'Anonymous' },
  { id: 'T005', machineId: 'VM007', productId: 'P003', timestamp: '2025-07-15T12:00:00Z', amount: 45, currency: 'INR', paymentMethod: 'UPI', customer: 'Anonymous' }
];

export const mockUsers = [
  { id: 'U001', name: 'Raj Patel', email: 'raj.patel@grn.co.in', role: 'Admin', country: 'India', lastLogin: '2025-07-15T06:30:00Z', status: 'active' },
  { id: 'U002', name: 'Akira Tanaka', email: 'a.tanaka@grn.co.jp', role: 'Regional Manager', country: 'Japan', lastLogin: '2025-07-15T07:15:00Z', status: 'active' },
  { id: 'U003', name: 'Priya Sharma', email: 'priya.s@grn.co.in', role: 'Operator', country: 'India', lastLogin: '2025-07-15T08:00:00Z', status: 'active' },
  { id: 'U004', name: 'Hiroshi Sato', email: 'h.sato@grn.co.jp', role: 'Technician', country: 'Japan', lastLogin: '2025-07-14T18:45:00Z', status: 'active' },
  { id: 'U005', name: 'Arun Kumar', email: 'arun.k@grn.co.in', role: 'Analyst', country: 'India', lastLogin: '2025-07-15T05:20:00Z', status: 'active' }
];

export const mockMaintenanceAlerts = [
  { id: 'M001', machineId: 'VM002', type: 'Preventive', priority: 'medium', description: 'Scheduled cleaning and coin mechanism check', assignedTo: 'U003', status: 'pending', createdAt: '2025-07-15T06:00:00Z' },
  { id: 'M002', machineId: 'VM106', type: 'Repair', priority: 'high', description: 'Display screen flickering, payment system error', assignedTo: 'U004', status: 'in-progress', createdAt: '2025-07-15T07:30:00Z' },
  { id: 'M003', machineId: 'VM008', type: 'Critical', priority: 'critical', description: 'Complete system offline, power supply failure', assignedTo: 'U004', status: 'pending', createdAt: '2025-07-15T08:45:00Z' }
];

export const mockAnalytics = {
  revenueData: {
    daily: [
      { date: '2025-07-09', India: 285600, Japan: 567800 },
      { date: '2025-07-10', India: 312400, Japan: 623400 },
      { date: '2025-07-11', India: 298700, Japan: 589200 },
      { date: '2025-07-12', India: 341200, Japan: 678900 },
      { date: '2025-07-13', India: 356800, Japan: 701500 },
      { date: '2025-07-14', India: 334500, Japan: 645300 },
      { date: '2025-07-15', India: 378900, Japan: 724600 }
    ],
    paymentMethods: {
      India: { UPI: 45, 'Credit Card': 25, 'Debit Card': 20, 'Mobile Wallet': 10 },
      Japan: { 'IC Card': 40, 'Mobile Wallet': 30, 'Credit Card': 20, Cash: 10 }
    }
  }
};

export const currencyRates = { INR_TO_JPY: 1.8, JPY_TO_INR: 0.56 };

export const statusColors = {
  active: '#10b981',
  maintenance: '#f59e0b', 
  offline: '#ef4444',
  restocking: '#1e40af'
};

export const rolePermissions = {
  Admin: ['dashboard', 'inventory', 'analytics', 'maintenance', 'users', 'settings'],
  'Regional Manager': ['dashboard', 'inventory', 'analytics', 'maintenance'],
  Operator: ['dashboard', 'inventory', 'maintenance'],
  Technician: ['dashboard', 'maintenance'],
  Analyst: ['dashboard', 'analytics']
};