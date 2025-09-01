import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'secret_refresh_token';
const REFRESH_TOKEN_EXPIRY = '14d';

export interface RefreshTokenPayload {
    userId: string;
    tokenId: string;
}

export function createRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
    } catch {
        return null;
    }
}
