import { PaginationProps } from 'element-plus'

export interface Props extends Partial<PaginationProps> {
  autoScroll?: boolean
  hidden?: boolean
}
