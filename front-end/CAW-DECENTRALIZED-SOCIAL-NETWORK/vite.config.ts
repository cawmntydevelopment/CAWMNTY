import {defineConfig, PluginOption} from 'vite'
import {visualizer} from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';
import viteReact from "@vitejs/plugin-react";
import merge from "ts-deepmerge";
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import dotenvParseVariables from 'dotenv-parse-variables';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({mode}) => {
    const defaultEnv = dotenv.config({path: `.env`})?.parsed ?? {};
    const modeEnv = dotenv.config({path: `.env.${mode}`})?.parsed ?? {};
    const mergedEnv = merge(defaultEnv, modeEnv);
    const parsedEnv = dotenvParseVariables(mergedEnv);
    const env = parsedEnv;

    const define = {
        'process.env': env,
    };

    let plugins: PluginOption[] = [
        viteReact()
    ];

    if (env.BUILD_COMPRESS_GZIP) {
        plugins.push(viteCompression({algorithm: 'gzip', ext: '.gz'}));
    }
    if (env.BUILD_COMPRESS_BROTLI) {
        plugins.push(viteCompression({algorithm: 'brotliCompress', ext: '.br'}));
    }
    if (env.BUILD_VISUALIZE) {
        // put it the last one
        plugins.push(visualizer((opts) => {
            return {
                gzipSize: true,
                brotliSize: true
            };
        }));
    }

    return {
        define,
        manualChunks: (id: string) => {
            if (id.includes("node_modules")) {
                if (id.includes("@mui")) {
                    return "vendor_mui";
                }

                return "vendor"; // all other package goes here
            }
        },
        plugins,
        resolve: {
            alias: [
                {
                    find: /^@mui\/icons-material\/(.*)/,
                    replacement: "@mui/icons-material/esm/$1"
                },
                {
                    find: "process",
                    replacement: 'process/browser'
                },
                {
                    find: "util",
                    replacement: 'util',
                }
            ]
        },
        build: {
            sourcemap: env.BUILD_GENERATE_SOURCEMAPS,
            target: "esnext"
        },
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: 'globalThis',
                },
            }
        }
    }
})
