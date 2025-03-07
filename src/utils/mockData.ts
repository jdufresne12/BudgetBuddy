import { BudgetItem } from "../api/services/budget";
import { Transaction } from "../api/services/transaction";
import { getCurrentDate } from "./textFormatting";

const transactionMockData = {
    FOOD_TRANSACTIONS: [
        {
            "user_id": 1,
            "item_id": 4,
            "transaction_id": 1,
            "description": "Costco",
            "amount": 300,
            "type": "expense",
            "date": (getCurrentDate())
        },
        {
            "user_id": 1,
            "item_id": 5,
            "transaction_id": 2,
            "description": "Publix",
            "amount": 100,
            "type": "expense",
            "date": (getCurrentDate())
        }
    ],
    INCOME_TRANSACTIONS: [
        {
            "user_id": 1,
            "item_id": 1,
            "transaction_id": 3,
            "description": "Pay Day",
            "amount": 50000,
            "type": "income",
            "date": (getCurrentDate())
        },
    ],
    RENT_TRANSACTION: [
        {
            "user_id": 1,
            "item_id": 2,
            "transaction_id": 4,
            "description": "Rent",
            "amount": 2000,
            "type": "expense",
            "date": (getCurrentDate())
        },
    ],
    WATER_TRANSACTION: [
        {
            "user_id": 1,
            "item_id": 2,
            "transaction_id": 5,
            "description": "Water Bill",
            "amount": 120,
            "type": "expense",
            "date": (getCurrentDate())
        },
    ]
}

export const sectionMockData = {
    INCOME_SECTION_DATA: [
        {
            "section": "Income",
            "item_id": 1,
            "user_id": 1,
            "name": "Work",
            "amount": 50000,
            "type": "income",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": transactionMockData.INCOME_TRANSACTIONS
        }
    ],
    HOME_SECTION_DATA: [
        {
            "section": "Home",
            "item_id": 2,
            "user_id": 1,
            "name": "Rent",
            "amount": 2000,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": transactionMockData.RENT_TRANSACTION
        },
        {
            "section": "Home",
            "item_id": 3,
            "user_id": 1,
            "name": "Water",
            "amount": 200,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": transactionMockData.WATER_TRANSACTION
        },
    ],
    FOOD_SECTION_DATA: [
        {
            "section": "Food",
            "item_id": 4,
            "user_id": 1,
            "name": "Groceries",
            "amount": 500,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": transactionMockData.FOOD_TRANSACTIONS
        },
        {
            "section": "Food",
            "item_id": 5,
            "user_id": 1,
            "name": "Eating out",
            "amount": 200,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": []
        },
    ],
    TRANSPORTATION_SECTION_DATA: [
        {
            "section": "Transportation",
            "item_id": 6,
            "user_id": 1,
            "name": "Gas",
            "amount": 300,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": []
        },
        {
            "section": "Transportation",
            "item_id": 7,
            "user_id": 1,
            "name": "Insurance",
            "amount": 200,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": []
        },
    ],
    SUBSCRIPTION_SECTION_DATA: [
        {
            "section": "Subscriptions",
            "item_id": 8,
            "user_id": 1,
            "name": "Netflix",
            "amount": 30,
            "type": "expense",
            "start_date": (getCurrentDate()),
            "end_date": null,
            "transactions": []
        },
    ],
}
