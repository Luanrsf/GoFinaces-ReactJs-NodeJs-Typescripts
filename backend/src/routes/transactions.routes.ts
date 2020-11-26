import { Router } from 'express';
import { getRepository} from 'typeorm';

import Transaction from "../models/Transaction";
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from "../config/upload";
import multer from 'multer';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getRepository(Transaction);
  const repositoryTransactions = new TransactionsRepository();
  const transactions = await transactionsRepository.find();
  const balance = await repositoryTransactions.getBalance();

  response.json({transactions,balance})

});

transactionsRouter.post('/', async (request, response) => {
  const {title,value,type,category} = request.body;
  const createTransactionService = new CreateTransactionService();
  const transactions = await createTransactionService.execute({title,value,type,category})
  return response.json(transactions)


});

transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params;
  const deleteTransaction = new DeleteTransactionService();
  await deleteTransaction.execute(id)
  return response.send(204).send();

});

transactionsRouter.post('/import',
upload.single("file"),
async (request, response) => {
  const importTransactions = new ImportTransactionsService();
  const transaction = await importTransactions.execute(request.file.path);
  return response.json(transaction);

});

export default transactionsRouter;
