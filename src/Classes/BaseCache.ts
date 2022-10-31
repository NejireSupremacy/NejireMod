export class BaseCache<K, V> {
    readonly data = new Map<K, {
		value: V;
		expire: number;
		expireOn: number
	}>();
    private timeout?: NodeJS.Timeout;

    constructor(readonly options = {
        limit: Infinity
    }) {}

    set(key: K, value: V, expire = 10000) {
        if (this.options.limit <= 0) return;

        if (expire > 0) {
            const expireOn = Date.now() + expire;

            this.resetTimeout();
            this.data.set(key, { value, expire, expireOn });
        } else {
            this.data.set(key, { value, expire: -1, expireOn: -1 });
        }

        if (this.options.limit && this.size > this.options.limit) {
            const iter = this.data.keys();

            while (this.size > this.options.limit) {
                this.delete(iter.next().value);
            }
        }
    }

    resetTimeout() {
        this.stopTimeout();
        this.startTimeout();
    }

    stopTimeout() {
        clearTimeout(this.timeout);
        delete this.timeout;
    }

    startTimeout() {
        const { expireOn, expire } = this.closer || { expire: -1, expireOn: -1 };

        if (expire === -1) return;
        if (this.timeout) throw new Error('timeout not cleared');

        this.timeout = setTimeout(() => {
            this.clearExpired();
            this.stopTimeout();
            this.startTimeout();
        }, expireOn - Date.now());
    }

    clearExpired() {
        for (const [key, value] of this.data) {
            if (value.expireOn === -1) continue;
            if (Date.now() > value.expireOn) this.data.delete(key);
        }
    }

    get closer() {
        let d;
        
        for (const value of this.data.values()) {
            if (value.expire === -1) continue;
            if (!d) {
                d = value;
                continue;
            }
            if (d.expireOn > value.expireOn) d = value;
        }
        return d;
    }
    
    get(key: K, ..._args: any[]) {
        const data = this.data.get(key);
        return data?.value;
    }

    has(key: K) {
        return this.data.has(key);
    }

    delete(key: K) {
        return this.data.delete(key);
    }

    get size() {
        return this.data.size;
    }
}