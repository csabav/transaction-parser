const validCurrenciesLowerCase = ['usd'];
const validCurrenciesUpperCase = ['USD'];

const toFromSchema = {
  additionalProperties: false,
  type: 'object',
  properties: {
    routing_number: { type: 'string', pattern: '^[0-9]+$' },
    account_number: { type: 'string', pattern: '^[0-9]+$' },
  },
  required: ['routing_number', 'account_number'],
};

const amountSchema = {
  additionalProperties: false,
  type: 'object',
  properties: {
    amount: { type: 'number', minimum: 0, maximum: Number.MAX_VALUE },
    currency: { anyOf: [{ enum: validCurrenciesLowerCase }, { enum: validCurrenciesUpperCase }] },
  },
  required: ['amount', 'currency'],
};

export const transactionSchema = {
  additionalProperties: false,
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    to: toFromSchema,
    from: toFromSchema,
    amount: amountSchema,
  },
  required: ['id', 'to', 'from', 'amount'],
};

export const dataFileSchema = {
  additionalProperties: true,
  type: 'object',
  properties: {
    transaction_count: { type: 'number', minimum: 0 },
    transactions: {
      type: 'array',
      minItems: 0,
      items: [{ type: 'object' }],
    },
  },
  required: ['transaction_count', 'transactions'],
};
