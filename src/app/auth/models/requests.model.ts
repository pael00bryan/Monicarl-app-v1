export class Request{
    id !: string;
    user_id !: string;
    loan_type !: string;
    amount_money !: number;
    status !: string; 
    created_at !: Date;
    token !: string;
    request_reason!: string;
    decline_reason!: string;
    current_address!: string;
    employment_address!: string;
}

export class UserRequest{
    id!: string;
    user_id!: {
        firstname: string;
        middlename: string;
        lastname: string;
    }
    loan_type !: string;
    amount_money !: number;
    status !: string; 
    created_at !: Date;
}

