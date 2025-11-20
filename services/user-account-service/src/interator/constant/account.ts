import { AccountStatus } from "../../domain/entities/Account";

export const DEFAULT_IFSC = "FIGR0VIR001";
export const currency={
    INR:"INR",
    USD:"USD",
    EUR:"EUR",
    GBP:"GBP",
}

export const accountType={
    SAVINGS:"savings",
    CHECKING:"checking",
    BUSINESS:"business",
    CURRENT:"current",
    SALARY:"salary"

}
export const accountStatus:Record<string,AccountStatus>={
    ACTIVE:"active",
    FROZEN:"frozen",
    CLOSED:"closed"
}
