import { guildsCacheStructure } from '../../utils/Interfaces/cacheStructures';

import { BaseCache } from '../BaseCache.js';

export class GuildsCache extends BaseCache<string, guildsCacheStructure> {}