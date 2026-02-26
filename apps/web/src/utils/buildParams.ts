import { ITransactionFilters } from "@/components/features/customer/transactions/TransactionCard";

export function buildParams(filters: ITransactionFilters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });
    console.log(params.toString());
    return params.toString();
}