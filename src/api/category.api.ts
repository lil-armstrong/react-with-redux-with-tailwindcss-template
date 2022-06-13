import { APIBase, OptionType } from './APIBase'
import { CategoryItem } from '../reducer/types'

type ResponseObject<T = CategoryItem[]> = {
  limit: number
  offset: number
  total: number
  results: T
}

export default class Category extends APIBase {
  constructor(init: OptionType) {
    super(init, 'items')
    this._name = 'Item'
    return this
  }

  async listItems() {
    const res = await this.axios(
      {
        url: '',
        method: 'get',
      },
      true
    )
    return res.data as ResponseObject
  }

  async createNewItem(args: {
    data: {
      name: string
      description: string
      parentId: string
    }
  }) {
    const res = await this.axios(
      {
        url: '',
        method: 'post',
      },
      true
    )
    return res.data as CategoryItem
  }

  async updateItem(args: {
    data: {
      name: string
      description: string
      parentId: string
    }
    params: {
      itemId: string
    }
  }) {
    const res = await this.axios(
      {
        url: `/${args?.params?.itemId}`,
        method: 'put',
        data: args?.data,
      },
      true
    )
    return res.data as CategoryItem
  }

  async deleteItem(args: { params: { itemId: string } }) {
    const res = await this.axios(
      {
        url: `/${args?.params?.itemId}`,
        method: 'delete',
      },
      true
    )
    return res.data as string
  }
}
