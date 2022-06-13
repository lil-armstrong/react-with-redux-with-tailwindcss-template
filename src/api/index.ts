import { APIBase, OptionType } from './APIBase'
import Category from './category.api'

// import { useSelector, useStore, TypedUseSelectorHook } from "react-redux";
import { RootState } from '../reducer'
import { useAppSelector } from '../hooks'

interface ProviderInterface {
  Category: Category
}
interface ProviderListInterface {
  [name: string]: typeof APIBase
}

export const defaultProviders = {
  Category,
}

export class Client {
  options: OptionType
  // [name: string]: any;
  /**
   * @type ProviderType
   */
  _providers: { [name: string]: APIBase } = {}
  _useProviders: { [name: string]: (opts?: OptionType) => APIBase } = {}
  /**
   * Creates an instance of Client
   * @param {object} options
   * @param {?string} options.token
   * @param {!string} options.baseURl
   * @param {string | "50000"} [options.timeout]
   * @param {object.<string, APIBase>} providers
   * @memberof Client
   * @returns
   */
  constructor(options: OptionType, providers: ProviderListInterface) {
    // SET INITIAL OPTIONS
    // this._globalRequestConfig = globalRequestConfig;
    this.options = { ...options }
    // SET PROVIDERS
    this.registerProviders(providers)
  }

  /**
   * @description format string as capital-case
   * @param {string} name
   * @returns string
   */
  _capitalizeString = (name: string) =>
    name
      .split(/\S[-_]/gi)
      .map(
        (item) =>
          item?.charAt(0).toUpperCase() + item.substring(1).toLowerCase()
      )
      .join('')

  /**
   * @description Abort all services
   */
  abort() {
    // console.log("ABORTING ALL REQUEST...");
    Object.entries(this._providers).forEach(([key, value]) => {
      value?.abort()
    })
  }
  /**
   * @description Register service providers
   * @param {object.<String, Class>} [providers]
   */
  registerProviders = (providers: ProviderListInterface) => {
    try {
      Object.entries(providers).forEach(([pName, pValue]) => {
        // Ensure they are instances of Service
        if (!(pValue.prototype instanceof APIBase)) {
          // delete this._providers[pName];
          throw new Error(`Service(${pName}) is not a valid service object`)
        }
        const newProvider = new pValue(this.options)
        Object.defineProperty(this, pName, {
          writable: false,
          value: newProvider,
          enumerable: true,
        })
        // this[pName] = new pValue(this.options)
        this._providers[pName] = newProvider
        // useService proxy name
        let useServiceName = `use${this._capitalizeString(pName)}Service`

        // provision a new server using `useServicename`
        const fn = (options = this.options) => new pValue(options)
        Object.defineProperty(this, useServiceName, {
          writable: false,
          value: fn,
          enumerable: true,
        })
        // this[useServiceName] = fn

        // Add to useProviders collection
        this._useProviders[useServiceName] = fn
      })
    } catch (error) {
      console.error(error)
    } finally {
      // console.log("Available providers", this._providers);
    }
  }

  /**
   *
   * @param {!String} name
   * @returns {APIBase}
   */
  getProvider(name: string): APIBase | undefined {
    if (name in this._providers) {
      return this._providers[name]
    } else throw new Error(`API Service <${name}> does not exist!`)
  }

  getConfig() {
    return this.options
  }
}

export const useApi = () => {
  const session = useAppSelector((state: RootState) => state?.Session)
  const token = session?.token

  const sdk = new Client(
    {
      token,
      baseURL: 'http://localhost:5000/',
      timeout: 5000,
      globalAxiosConfig: {
        params: {
          /* livemode: setting?.livemode */
        },
      },
    },
    defaultProviders
  ) as Client & ProviderInterface

  return sdk
}

export default useApi
