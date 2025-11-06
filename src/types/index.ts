export interface Banner {
  id: number;
  title: string;
  // Prisma may return null for optional fields stored as nullable in the DB
  content: string | null;
  image?: string | null;
  order: number;
}

export interface News {
  id: number;
  title: string;
  excerpt: string | null;
  // full content may be nullable in the database
  content: string | null;
  createdAt: Date;
}

export interface Market {
  id: number;
  symbol: string;
  // price comes from DB as string in some seeds/providers
  price: string;
  change: string;
  updatedAt: Date;
}