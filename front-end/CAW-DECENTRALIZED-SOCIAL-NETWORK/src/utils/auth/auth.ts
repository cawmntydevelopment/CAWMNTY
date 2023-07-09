import {load, save} from "../storage"
// @ts-ignore
import {AUTH_KEY} from "../storage/keys.json"

interface AuthData {
    token?: string | undefined | null
}

export function loadAuthData(): AuthData {
    try {
        const authData = load(AUTH_KEY)

        return authData ?? {}
    } catch {
        return {}
    }
}

export function saveAuthData(authData: AuthData): boolean {
    try {
        save(AUTH_KEY, authData)

        return true
    } catch {
        return false
    }
}

export function clearAuthData(): boolean {
    try {
        const cleared = saveAuthData({})

        return cleared
    } catch {
        return false
    }
}

export function loadAuthToken(): string | null {
    try {
        const authData = loadAuthData()

        return authData.token ?? null
    } catch {
        return null
    }
}

export function saveAuthToken(value: string | null): boolean {
    try {
        let authData = loadAuthData()
        authData.token = value

        const saved = saveAuthData(authData)

        return saved
    } catch {
        return false
    }
}

export function clearAuthToken(): boolean {
    try {
        const cleared = saveAuthToken(null)

        return cleared
    } catch {
        return false
    }
}
