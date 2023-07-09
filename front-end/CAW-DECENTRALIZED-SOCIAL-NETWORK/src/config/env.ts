import {_} from "../utils/primary-utils";
import merge from "ts-deepmerge";

export const vitePrefix = "VITE_";
export const immutablePrefix = "_";
export const env_json = (await fetch("/env.json?v=" + Date.now()).then(response => response?.ok ? response.json() : {}));
export const env_vite = process.env;

export const env_vite_processed = Object.entries(env_vite).reduce(
    (prev, [key, val]) => {
        // remove vitePrefix from beginning of the key
        const viteRemovedKey = _.trimStart(key, vitePrefix);
        // remove immutablePrefix from beginning of the key
        const immutableRemovedKey = _.trimStart(viteRemovedKey, immutablePrefix);

        return {
            ...prev,
            [immutableRemovedKey]: val,
        }
    },
    {},
);

export const env_json_processed = Object.entries(env_json).reduce(
    (prev, [key, val]) => {
        // replace key to uppercase
        const upperCasedKey = key.toUpperCase();
        // check if key is in env_vite
        const envViteHasThisKey = env_vite.hasOwnProperty(immutablePrefix + upperCasedKey) ||
            env_vite.hasOwnProperty(vitePrefix + immutablePrefix + upperCasedKey);
        if (envViteHasThisKey) {
            return {
                ...prev
            }
        }

        const replacedKey = upperCasedKey;
        return {
            ...prev,
            [replacedKey]: val,
        }
    },
    {},
);

const env = (() => {
    const merged_env = merge(env_vite_processed, env_json_processed);

    return merged_env as any;
})();

export default env;
