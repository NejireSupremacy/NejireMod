import { rolesCacheStructure } from '../../utils/Interfaces/cacheStructures';

import { BaseCache } from '../BaseCache.js';

export class RolesCache extends BaseCache<string, rolesCacheStructure> {}