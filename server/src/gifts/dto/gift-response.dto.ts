export class GiftResponseDto {
  id: number;
  name: string;
  description: string;
  point: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<GiftResponseDto>) {
    Object.assign(this, partial);
  }
}

export class GiftListResponseDto {
  items: GiftResponseDto[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
