import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret_access_token';
const ACCESS_TOKEN_EXPIRY = '30m';

export interface JwtPayload {
    userId: string;
    email: string;
}

export function createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
}

export function verifyAccessToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch {
        return null;
    }
}
