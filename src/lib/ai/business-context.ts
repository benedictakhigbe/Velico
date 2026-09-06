import { adminDb } from "@/lib/firebase/admin";
import { getActiveOrganizationId, type SessionUser } from "@/lib/firebase/auth";
import { customers, expenses, invoices, products } from "@/lib/velico/demo-data";

export type BusinessContext = {
  organizationId?: string;
  source: "firebase" | "demo";
  summary: {
    products: number;
    lowStockProducts: number;
    customers: number;
    invoices: number;
    overdueInvoices: number;
    expenses: number;
    monthlyExpenseTotal: number;
  };
  highlights: string[];
};

function parseNaira(value: string | number | undefined) {
  if (typeof value === "number") {
    return value;
  }

  return Number(String(value ?? "0").replace(/[^\d.-]/g, "")) || 0;
}

function demoContext(): BusinessContext {
  const lowStockProducts = products.filter((product) => product.status === "Low stock");
  const overdueInvoices = invoices.filter((invoice) => invoice.status.toLowerCase() === "overdue");
  const monthlyExpenseTotal = expenses.reduce((total, expense) => total + parseNaira(expense.amount), 0);

  return {
    organizationId: "demo-organization",
    source: "demo",
    summary: {
      products: products.length,
      lowStockProducts: lowStockProducts.length,
      customers: customers.length,
      invoices: invoices.length,
      overdueInvoices: overdueInvoices.length,
      expenses: expenses.length,
      monthlyExpenseTotal,
    },
    highlights: [
      ...lowStockProducts.map((product) => `${product.name} is below reorder level.`),
      ...overdueInvoices.map((invoice) => `${invoice.number} for ${invoice.customer} is overdue.`),
      `Recent tracked expenses total ₦${monthlyExpenseTotal.toLocaleString("en-NG")}.`,
    ],
  };
}

export async function getBusinessContext(user: SessionUser): Promise<BusinessContext> {
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId || organizationId === "demo-organization") {
    return demoContext();
  }

  try {
    const db = adminDb();
    const [productsSnapshot, customersSnapshot, invoicesSnapshot, expensesSnapshot] =
      await Promise.all([
        db.collection("products").where("organizationId", "==", organizationId).limit(50).get(),
        db.collection("customers").where("organizationId", "==", organizationId).limit(50).get(),
        db.collection("invoices").where("organizationId", "==", organizationId).limit(50).get(),
        db.collection("expenses").where("organizationId", "==", organizationId).limit(50).get(),
      ]);
    const productDocs = productsSnapshot.docs.map((doc) => doc.data());
    const invoiceDocs = invoicesSnapshot.docs.map((doc) => doc.data());
    const expenseDocs = expensesSnapshot.docs.map((doc) => doc.data());
    const lowStockProducts = productDocs.filter((product) => {
      const stock = Number(product.stock ?? product.quantity ?? 0);
      const reorder = Number(product.reorder ?? product.reorderLevel ?? 0);
      return reorder > 0 && stock <= reorder;
    });
    const overdueInvoices = invoiceDocs.filter((invoice) => String(invoice.status ?? "").toLowerCase() === "overdue");
    const monthlyExpenseTotal = expenseDocs.reduce((total, expense) => {
      return total + (typeof expense.amount === "number" ? expense.amount : 0);
    }, 0);

    return {
      organizationId,
      source: "firebase",
      summary: {
        products: productsSnapshot.size,
        lowStockProducts: lowStockProducts.length,
        customers: customersSnapshot.size,
        invoices: invoicesSnapshot.size,
        overdueInvoices: overdueInvoices.length,
        expenses: expensesSnapshot.size,
        monthlyExpenseTotal,
      },
      highlights: [
        ...lowStockProducts.slice(0, 5).map((product) => `${product.name ?? product.sku ?? "A product"} is at or below reorder level.`),
        ...overdueInvoices.slice(0, 5).map((invoice) => `${invoice.number ?? "An invoice"} is overdue.`),
        `Tracked expenses total ₦${monthlyExpenseTotal.toLocaleString("en-NG")} across the latest ${expensesSnapshot.size} records.`,
      ],
    };
  } catch {
    return demoContext();
  }
}
