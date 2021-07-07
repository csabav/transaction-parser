import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { transactionSchema, dataFileSchema } from './schemas';

const ajv = new Ajv({ removeAdditional: true, strict: false });
addFormats(ajv);

export const validateTransaction = ajv.compile(transactionSchema);

export const validateDataFile = ajv.compile(dataFileSchema);
