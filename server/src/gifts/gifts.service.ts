import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, Like } from 'typeorm';

import { CreateGiftDto } from './dto/create-gift.dto';
import { GetGiftsQueryDto } from './dto/get-gifts-query.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { Gift } from './entities/gift.entity';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}

  async findAll(query: GetGiftsQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Gift> = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [items, total] = await this.giftRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<Gift> {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(`Không tìm thấy quà tặng với ID ${id}`);
    }
    return gift;
  }

  async create(createGiftDto: CreateGiftDto): Promise<Gift> {
    const gift = this.giftRepository.create({
      ...createGiftDto,
      description: createGiftDto.description ?? '',
    });
    return this.giftRepository.save(gift);
  }

  async update(id: number, updateGiftDto: UpdateGiftDto): Promise<Gift> {
    const gift = await this.findOne(id);
    Object.assign(gift, updateGiftDto);
    return this.giftRepository.save(gift);
  }

  async remove(id: number): Promise<void> {
    const gift = await this.findOne(id);
    await this.giftRepository.remove(gift);
  }
}
