import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, Like } from 'typeorm';

import { CreateGiftDto } from './dto/create-gift.dto';
import { GetGiftsQueryDto } from './dto/get-gifts-query.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { Gift } from './entities/gift.entity';
import { GiftResponseDto } from './dto/gift-response.dto';
import { GIFT_MESSAGES } from '../common/constants/messages.constant';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}

  private toDto(gift: Gift): GiftResponseDto {
    return new GiftResponseDto({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      point: gift.point,
      quantity: gift.quantity,
      createdAt: gift.createdAt,
      updatedAt: gift.updatedAt,
    });
  }

  async findAll(query: GetGiftsQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Gift> = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [gifts, total] = await this.giftRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items: gifts.map((g) => this.toDto(g)),
      meta: {
        totalItems: total,
        itemCount: gifts.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<GiftResponseDto> {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.NOT_FOUND_BY_ID(id));
    }
    return this.toDto(gift);
  }

  async create(createGiftDto: CreateGiftDto): Promise<GiftResponseDto> {
    const gift = this.giftRepository.create({
      ...createGiftDto,
      description: createGiftDto.description ?? '',
    });
    const saved = await this.giftRepository.save(gift);
    return this.toDto(saved);
  }

  async update(id: number, updateGiftDto: UpdateGiftDto): Promise<GiftResponseDto> {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.NOT_FOUND_BY_ID(id));
    }
    Object.assign(gift, updateGiftDto);
    const saved = await this.giftRepository.save(gift);
    return this.toDto(saved);
  }

  async remove(id: number): Promise<void> {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.NOT_FOUND_BY_ID(id));
    }
    await this.giftRepository.remove(gift);
  }
}
