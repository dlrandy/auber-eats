import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

// alternative https://github.com/leosuncin/nest-typeorm-custom-repository/blob/master/src/task/task.module.ts
@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Category | undefined> {
    return await this.createQueryBuilder()
      .where(`Category.${column} ${operator} :value`, { value: value })
      .getOne();
  }
  async getOrCreateCategory(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({
      where: { slug: categorySlug },
    });
    if (!category) {
      category = await this.save(
        this.create({
          name: categoryName,
          slug: categorySlug,
        }),
      );
    }
    return category;
  }
}

// import { EntityRepository, Repository } from 'typeorm';
// import { Category } from '../entities/category.entity';
// @EntityRepository(Category)
// export class CategoryRepository extends Repository<Category> {
//   // your custom methods...
// }
