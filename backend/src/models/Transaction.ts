import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn} from "typeorm"
import Category from "../models/Category";

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;


  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;