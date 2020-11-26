import AppError from '../errors/AppError';

import Category from "../models/Category";
import Transaction from '../models/Transaction';
import TransactionsRepository from "../repositories/TransactionsRepository";
import { getRepository,getCustomRepository } from 'typeorm';

interface Response {
  title:string;
  value:number;
  type:"income"|"outcome";
  category:string;
}

class CreateTransactionService {
  public async execute({title,value,type,category}:Response): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction)
    const categoryRepository = getRepository(Category);
    const findTransacitions = await transactionRepository.find()

    if(type=="outcome"){
      const repositoryOfTransaction = new TransactionsRepository();
      const balance = await repositoryOfTransaction.getBalance()
      if(!findTransacitions[0] || balance.total-value<=0){
        throw new AppError("insuficent balance",400)
      }

    }

    const findTitle = await categoryRepository.findOne({
        where:{category}})


    if(!findTitle){
      const categoryCreated = categoryRepository.create({
        title:category,
      });
      const categories = await categoryRepository.save(categoryCreated);
      const transactionCreated = transactionRepository.create({
        title,
        value,
        type,
        category_id:categories.id
      })

      const transaction = await transactionRepository.save(transactionCreated);


      return transaction;

    }



    const transactionCreated = transactionRepository.create({
      title,
      value,
      type,
      category_id:findTitle.id
    })
    const transaction = await transactionRepository.save(transactionCreated);
    return transaction

  }
}

export default CreateTransactionService;
