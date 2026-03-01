export type TBillCategory = "ELECTRICITY" | "WATER" | "INTERNET" | "MOBILE" | "CABLE" | "GAS";

interface BillBreakdown {
  description: string;
  amount: number;
}

interface IBillResponse {
  billNumber: string;
  billPeriod: string;
  dueDate: string;
  daysLeft: number;
  totalAmount: number;
  breakdown: BillBreakdown[];
   category: TBillCategory;
  previewId: string;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

      export const generateUtilityBill = (category: TBillCategory): IBillResponse => {
  const now = new Date();

  const billNumber = `BL${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${random(100, 999)}`;

  const previewId = `PREV-${Date.now()}-${random(10, 99)}`;

  const dueDateObj = new Date();
  dueDateObj.setDate(now.getDate() + random(5, 12));

  const dueDate = dueDateObj.toDateString();
  const daysLeft = Math.ceil(
    (dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (category === "ELECTRICITY") {
    const energy = random(1200, 2500);
    const fixed = random(80, 150);
    const tax = Math.round((energy + fixed) * 0.18);
    const discount = -random(100, 500);

    const totalAmount = energy + fixed + tax + discount;

    return {
      previewId,
      category,
      billNumber,
      billPeriod: "Current Cycle",
      dueDate,
      daysLeft,
      totalAmount,
      breakdown: [
        { description: "Energy Charges", amount: energy },
        { description: "Fixed Charges", amount: fixed },
        { description: "GST", amount: tax },
        { description: "Discount", amount: discount },
      ],
    };
  }

  if (category === "WATER") {
    const water = random(400, 900);
    const sewer = random(100, 250);
    const tax = Math.round((water + sewer) * 0.12);
    const discount = -random(50, 200);

    const totalAmount = water + sewer + tax + discount;

    return {
      previewId,
      category,
      billNumber,
      billPeriod: "Current Cycle",
      dueDate,
      daysLeft,
      totalAmount,
      breakdown: [
        { description: "Water Charges", amount: water },
        { description: "Sewerage", amount: sewer },
        { description: "Tax", amount: tax },
        { description: "Discount", amount: discount },
      ],
    };
  }

  const amount = random(300, 1500);

  return {
    previewId,
    category,
    billNumber,
    billPeriod: "Current Cycle",
    dueDate,
    daysLeft,
    totalAmount: amount,
    breakdown: [{ description: "Service Charges", amount }],
  };
};
