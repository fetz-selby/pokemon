import NodeCache from 'node-cache'

class NCache {
  private cacheInstance: NodeCache

  public constructor() {
    this.cacheInstance = new NodeCache({ stdTTL: 100, checkperiod: 120 })
  }

  public getInstance(): NodeCache {
    if (!this.cacheInstance) {
      this.cacheInstance = new NodeCache({ stdTTL: 100, checkperiod: 120 })
    }
    return this.cacheInstance
  }
}

export default NCache
