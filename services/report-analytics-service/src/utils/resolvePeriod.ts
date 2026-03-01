import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export function resolvePeriod(q: {
  type: "duration" | "fy" | "custom";
  value: string;
  customRange?: { startDate: string; endDate: string };
}) {
  const now = new Date();

  if (q.type === "duration") {
    switch (q.value) {
      case "current_month":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };

      case "last_month":
        const lm = subMonths(now, 1);
        return {
          start: startOfMonth(lm),
          end: endOfMonth(lm),
        };

      case "last_2_months":
        return {
          start: startOfMonth(subMonths(now, 2)),
          end: endOfMonth(now),
        };

      case "current_fy":
        return getFinancialYearRange(now, "current_fy");

      case "last_fy":
        return getFinancialYearRange(now, "last_fy");
    }
  }

//   if (q.type === "fy") {
//     return getFinancialYearRange(now,);  
//   }

  if (q.type === "custom" && q.customRange) {
    return {
      start: new Date(q.customRange.startDate),
      end: new Date(q.customRange.endDate),
    };
  }

  throw new Error("Invalid period");
}

function getFinancialYearRange(now: Date, type?: "current_fy" | "last_fy") {
  const year = now.getFullYear();
  const month = now.getMonth() + 1; 

  const fyStartYear = month >= 4 ? year : year - 1;

  if (type === "current_fy") {
    return {
      start: new Date(fyStartYear, 3, 1), // Apr 1
      end: new Date(fyStartYear + 1, 2, 31), // Mar 31
    };
  }

  if (type === "last_fy") {
    return {
      start: new Date(fyStartYear - 1, 3, 1),
      end: new Date(fyStartYear, 2, 31),
    };
  }

  throw new Error("Invalid FY type");
}
