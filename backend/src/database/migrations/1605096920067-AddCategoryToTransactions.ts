import {MigrationInterface, QueryRunner,TableColumn,TableForeignKey} from "typeorm";

export default class AddCategoryToTransactions1605096920067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'transactions',
        new TableColumn( {
          name:"category_id",
          type:'uuid',
          isNullable:true,
        })

      );
      await queryRunner.createForeignKey(
        "transactions",
        new TableForeignKey({
          name:"transactions_category",
          columnNames:["category_id"],
          referencedColumnNames:['id'],
          referencedTableName:"categories",
          onUpdate:'CASCADE',
          onDelete:"SET NULL"
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('transactions',"transactions_category")
      await queryRunner.dropColumn('transactions','category_id')
    }

}
