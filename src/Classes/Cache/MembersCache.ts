import { membersCacheStructure } from '../../utils/Interfaces/cacheStructures';

import { BaseCache } from '../BaseCache.js';

export class MembersCache extends BaseCache<string, membersCacheStructure> {
    get(guildId: string, memberId: string) {
        const find = (key: string, value: membersCacheStructure) => key === memberId && value.guildId === guildId;
        let v;
        
        for (const [key, { value }] of this.data) {
            if (find(key, value)) {
                v = value;
            }
        }

        return v;
    }

    override has(key: string) {
        return this.data.has(key);
    }

    override delete(key: string) {
        return this.data.delete(key);
    }
} 