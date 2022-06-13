import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import Qs from 'qs'

export interface APIBaseInterface {
  setupAxios(): void
  getHeaders(): { [x: string]: string }
  getToken(): string | undefined
  abort(): void
}

export type OptionType = {
  token: string | undefined
  timeout: number | 5000
  baseURL: string
  globalAxiosConfig: Partial<AxiosRequestConfig>
}

export class APIBase implements APIBaseInterface {
  _name: string
  token: string | undefined
  uri: string | ''
  baseURL: string | ''
  timeout: number = 5000
  _initializer: OptionType | undefined
  headers: { [key: string]: string }
  axiosConfig: AxiosRequestConfig
  axiosSource: any | undefined
  axios!: NonNullable<
    (config: AxiosRequestConfig, debug?: boolean) => Promise<AxiosResponse<any>>
  >
  _globalAxiosConfig: Partial<AxiosRequestConfig>

  constructor(init: OptionType, uri: string = '') {
    this._name = 'ROOT'
    this.token = init?.token
    this.uri = uri
    this.baseURL = init?.baseURL
    this.timeout = init?.timeout
    this._initializer = init
    // axios headers config
    this.headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `bearer ${this.token}` }),
    }
    this._globalAxiosConfig = init?.globalAxiosConfig

    this.axiosConfig = {
      headers: this?.headers,
      baseURL: init?.baseURL + this.uri,
      timeout: this?.timeout,
      paramsSerializer: function (params: any) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
    }
    this.setupAxios()

    return this
  }

  /**
   * @description Reconfigures axios globals
   */
  setupAxios() {
    try {
      this.axiosSource = axios.CancelToken.source()
      let _axios = axios.create({
        ...this.axiosConfig,
        cancelToken: this.axiosSource.token,
      })
      this.axios = async (config: AxiosRequestConfig, debug?: boolean) => {
        // For debugging purpose only
        if (debug)
          console.log({
            config: {
              ...config,
              url: `${this.baseURL}${this.uri}${config.url}`,
            },
          })
        return await _axios({
          ...config,
          params: this._globalAxiosConfig,
        })
      }
    } catch (err) {
      // console.error(err);
    }
  }

  // ================ OUR TOKEN AND HEADER ===============
  getHeaders = () => this.headers
  getToken = () => this.token

  /**
   * @method
   * @param {String } [message]
   * @returns
   */
  abort = (message: string = 'Request cancelled. Reload page'): void => {
    this.axiosSource.cancel(message.toString())
    this.setupAxios()
  }
}
