const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api/v1').replace(/\/+$/, '')

const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const error = new Error(data.error ?? data.message ?? 'Request failed')
        error.status = response.status
        throw error
    }

    return data
}

export const authApi = {
    async checkSession() {
        try {
            const data = await request('/auth/check')
            return data.user
        } catch (error) {
            if (error.status === 401) return null
            throw error
        }
    },
    login(credentials) {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    },
    signup(credentials) {
        return request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    },
    logout() {
        return request('/auth/logout', { method: 'POST' })
    },
}