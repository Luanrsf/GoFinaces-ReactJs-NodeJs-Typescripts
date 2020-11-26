import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm';


interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {


  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction)
    const transactions = await transactionsRepository.find();
    const reducer = (total:number, value: number) =>{
     return total + value;}

     function arrayConverter(type:"outcome"|"income"){
       const arr:Array<number> = transactions.map(transaction=>{
         if(transaction.type==type){
           return Number(transaction.value);
           }else{
           return 0
             }})
         return arr;

        }



       const arrayIncome = arrayConverter("income")
       const arrayOutcome = arrayConverter("outcome")
       const income = arrayIncome.reduce(reducer);
       const outcome = arrayOutcome.reduce(reducer);
       const total = income-outcome;


   return ({income,outcome,total});


}
}
export default TransactionsRepository;
