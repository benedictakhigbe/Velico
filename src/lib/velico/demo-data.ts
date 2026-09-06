export const products = [
  { name: "Premium Ankara Fabric", sku: "ANK-001", category: "Fashion", stock: 18, reorder: 12, price: "NGN 18,500", status: "In stock" },
  { name: "Hair Treatment Kit", sku: "HTK-014", category: "Beauty", stock: 6, reorder: 10, price: "NGN 9,000", status: "Low stock" },
  { name: "Delivery Service", sku: "SRV-DEL", category: "Service", stock: "-", reorder: "-", price: "NGN 2,500", status: "Service" },
];

export const customers = [
  { name: "Adaora Okeke", phone: "+234 803 000 1122", balance: "NGN 42,000", lastPurchase: "Today" },
  { name: "Musa Bello", phone: "+234 806 222 9100", balance: "NGN 0", lastPurchase: "Yesterday" },
  { name: "Kemi Stores", phone: "+234 701 887 3344", balance: "NGN 128,500", lastPurchase: "Aug 29" },
];

export const invoices = [
  { number: "VEL-0001", customer: "Kemi Stores", due: "Sep 03", total: "NGN 128,500", status: "Sent" },
  { number: "VEL-0002", customer: "Adaora Okeke", due: "Sep 07", total: "NGN 42,000", status: "Overdue" },
  { number: "VEL-0003", customer: "Musa Bello", due: "Sep 12", total: "NGN 76,000", status: "Draft" },
];

export const expenses = [
  { category: "Rent", vendor: "Shop landlord", date: "Aug 30", amount: "₦250,000" },
  { category: "Logistics", vendor: "Dispatch rider", date: "Aug 30", amount: "₦18,500" },
  { category: "Electricity", vendor: "Power distribution", date: "Aug 28", amount: "₦32,000" },
];

export const financeRows = [
  { metric: "Revenue", period: "This month", value: "₦1,420,000", status: "Tracked" },
  { metric: "Expenses", period: "This month", value: "₦300,500", status: "Review" },
  { metric: "Gross profit estimate", period: "This month", value: "₦486,000", status: "Estimate" },
  { metric: "Outstanding payments", period: "Current", value: "₦170,500", status: "Follow up" },
];

export const staffPerformance = [
  { name: "Sales Desk", orders: 18, revenue: "₦486,000", conversion: "64%", status: "Improving" },
  { name: "Demo Owner", orders: 11, revenue: "₦352,000", conversion: "72%", status: "Strong" },
  { name: "Accountant", orders: 0, revenue: "₦0", conversion: "-", status: "Back office" },
];

export const automationRules = [
  { rule: "Low stock alert", when: "Stock reaches reorder level", then: "Create notification", status: "Ready" },
  { rule: "Overdue invoice follow-up", when: "Payment is overdue", then: "Add follow-up task", status: "Ready" },
  { rule: "Expense threshold", when: "Category spend rises", then: "Generate AI recommendation", status: "Draft" },
];

export const integrations = [
  { provider: "Paystack", category: "Payments", status: "Available", note: "Live keys can be connected" },
  { provider: "Flutterwave", category: "Payments", status: "Planned", note: "Interface prepared" },
  { provider: "Bank transfer", category: "Payments", status: "Planned", note: "Manual reconciliation first" },
  { provider: "WhatsApp Business", category: "Commerce", status: "Planned", note: "No fake connection" },
  { provider: "Instagram / Meta", category: "Commerce", status: "Planned", note: "No fake connection" },
  { provider: "Google Sheets", category: "Data import", status: "Planned", note: "Import interface later" },
];

export const recommendations = [
  {
    priority: "High",
    signal: "Hair Treatment Kit may run out soon",
    data: "6 units left, reorder level is 10",
    action: "Restock before pushing new sales.",
  },
  {
    priority: "High",
    signal: "One invoice is overdue",
    data: "VEL-0002 has ₦42,000 outstanding",
    action: "Send a short payment reminder today.",
  },
  {
    priority: "Medium",
    signal: "Logistics needs review",
    data: "Recent dispatch cost is ₦18,500",
    action: "Compare delivery cost against average order value.",
  },
];

export const team = [
  { name: "Demo Owner", email: "demo@velico.app", role: "Owner", status: "Active" },
  { name: "Sales Desk", email: "sales@velico.app", role: "Sales staff", status: "Invited" },
  { name: "Accountant", email: "accounts@velico.app", role: "Accountant", status: "Active" },
];

export const notifications = [
  { title: "Hair Treatment Kit is below reorder level", type: "Low stock", time: "12 min ago" },
  { title: "VEL-0002 is overdue", type: "Invoice", time: "1 hour ago" },
  { title: "Weekly business summary is ready", type: "AI", time: "Today" },
];
