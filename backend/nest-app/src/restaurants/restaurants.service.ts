import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Raw, Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';

import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryOutput, CategoryInput } from './dtos/category.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos/search-restaurant.dto';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class RestaurantService {
  async findCategoryBySlug({
    slug,
    page = 1,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categorys.findOne({
        where: {
          slug,
        },
        // relations: ['restaurants'], too much data
      });
      if (!category) {
        return {
          ok: false,
          error: 'Could not found category',
        };
      }
      const restaurants = await this.restaurants.find({
        where: {
          category: { id: category.id },
        },
        take: 25,
        skip: (page - 1) * 25,
        order: {
          isPromoted: 'DESC',
        },
      });
      category.restaurants = restaurants;
      const totalRestaurantsInCategory = await this.countRestaurant(category);
      return {
        ok: true,
        category,
        totalPages: Math.ceil(totalRestaurantsInCategory / 25),
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'delete restaurant something wrong',
      };
    }
  }
  countRestaurant(category: Category): Promise<number> {
    return this.restaurants.countBy({ category: { id: category.id } });
  }
  async deleteRestaurant(
    owner: User,
    deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: {
          id: deleteRestaurantInput.restaurantId,
        },
        loadRelationIds: true,
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Could not found restaurant',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: 'Could not delete this restaurant',
        };
      }

      await this.restaurants.delete(deleteRestaurantInput.restaurantId);
      return {
        ok: true,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'delete restaurant something wrong',
      };
    }
  }
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    // @InjectRepository(CategoryRepository) 不需要是因为本身就是repository
    private readonly categorys: CategoryRepository, //Repository<Category>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categorys.getOrCreateCategory(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'Could not create restaurant',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: {
          id: editRestaurantInput.restaurantId,
        },
        loadRelationIds: true,
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Could not found restaurant',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: 'Could not edit this restaurant',
        };
      }
      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.categorys.getOrCreateCategory(
          editRestaurantInput.categoryName,
        );
      }
      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'something wrong',
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categorys.find();

      return {
        ok: true,
        categories,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'Could not query all categories',
      };
    }
  }
  async allRestaurants({ page }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
        order: {
          isPromoted: 'DESC',
        },
      });
      return {
        ok: true,
        restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalItems: totalResults,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'Could not query all restaurants',
      };
    }
  }
  async findRestaurantById({
    restaurantId,
  }: RestaurantInput): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: {
          id: restaurantId,
        },
        relations: ['menu'],
      });
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'Could not query the restaurant',
      };
    }
  }
  async searchRestaurantsByName({
    query,
    page,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const [restaurants, totalItems] = await this.restaurants.findAndCount({
        where: {
          // name: ILike(`%${query}%`),
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
      });
      return {
        ok: true,
        restaurants,
        totalItems,
        totalPages: Math.ceil(totalItems / 25),
      };
    } catch (error) {
      console.log('error ', error);
      return {
        ok: false,
        error: 'Could not query the restaurant',
      };
    }
  }
  async createDish(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: createDishInput.restaurantId },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.dishes.save(
        this.dishes.create({ ...createDishInput, restaurant }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not create dish',
      };
    }
  }

  async checkDishOwner(ownerId: number, dishId: number) {}

  async editDish(
    owner: User,
    editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    try {
      const dish = await this.dishes.findOne({
        where: { id: editDishInput.dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: 'Dish not found',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.dishes.save([
        {
          id: editDishInput.dishId,
          ...editDishInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete dish',
      };
    }
  }

  async deleteDish(
    owner: User,
    { dishId }: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishes.findOne({
        where: { id: dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: 'Dish not found',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.dishes.delete(dishId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete dish',
      };
    }
  }
}
