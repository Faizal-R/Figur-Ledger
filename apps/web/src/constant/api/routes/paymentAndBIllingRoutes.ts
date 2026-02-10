export const billingRoutes={

}


export const billerRoutes={
    CREATE:'/payments/billers',
    UPDATE:(billerId:string)=>`/payments/billers/${billerId}`,
    GET_ALL:(category:string)=>`/payments/billers?category=${category}`,
    GET_BY_ID:(billerId:string)=>`/payments/billers/${billerId}`,
    SAVE:'/payments/billers/save',
    GET_ALL_SAVED:(userId:string, category:string)=>`/payments/billers/saved?userId=${userId}&category=${category}`,
}

export const billRoutes={
    GET:(category:string)=>`/payments/bills?category=${category}`,
    // GET_ALL:(userId:string)=>`/payments/bills?userId=${userId}`,
    // GET_BY_ID:(billId:string)=>`/payments/bills/${billId}`,
}

export const paymentRoutes={
    PAYMENTS:'/payments',
    GET_HISTORY:(userId:string)=>`/payments?userId=${userId}`
}