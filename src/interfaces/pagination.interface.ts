export interface Pagination {
  limit: number;
  page: number;
  sort?: string;
  populate?: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
    unwind?: Boolean;
  }[];
}
