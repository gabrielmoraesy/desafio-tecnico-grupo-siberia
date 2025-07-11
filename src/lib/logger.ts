// Utilitário para logs seguros
export const logger = {
    // Log apenas em desenvolvimento
    dev: (message: string, data?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEV] ${message}`, data);
        }
    },

    // Log de informações gerais (sempre)
    info: (message: string, data?: any) => {
        console.log(`[INFO] ${message}`, data);
    },

    // Log de erros (sempre, mas sem dados sensíveis)
    error: (message: string, error?: any) => {
        console.error(`[ERROR] ${message}`, error?.message || error);
    },

    // Log de warning (sempre)
    warn: (message: string, data?: any) => {
        console.warn(`[WARN] ${message}`, data);
    },

    // Helper para filtrar dados sensíveis
    sanitize: (data: any, sensitiveFields: string[] = ['password', 'token', 'secret']) => {
        if (!data || typeof data !== 'object') return data;

        const sanitized = { ...data };
        sensitiveFields.forEach(field => {
            if (sanitized[field]) {
                sanitized[field] = '[REDACTED]';
            }
        });

        return sanitized;
    }
};
