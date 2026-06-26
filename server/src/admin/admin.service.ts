import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../gifts/entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}

  async createGift(createGiftDto: CreateGiftDto): Promise<Gift> {
    const gift = this.giftRepository.create(createGiftDto);
    return this.giftRepository.save(gift);
  }

  async findAllGifts(): Promise<Gift[]> {
    return this.giftRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findGiftById(id: number): Promise<Gift> {
    const gift = await this.giftRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(`Không tìm thấy quà tặng với ID ${id}`);
    }
    return gift;
  }

  async updateGift(id: number, updateGiftDto: UpdateGiftDto): Promise<Gift> {
    const gift = await this.findGiftById(id);
    Object.assign(gift, updateGiftDto);
    return this.giftRepository.save(gift);
  }

  async deleteGift(id: number): Promise<void> {
    const gift = await this.findGiftById(id);
    await this.giftRepository.remove(gift);
  }
}
