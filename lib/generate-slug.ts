import crypto from 'crypto';

export default function generateSlug() {
    return crypto.randomBytes(6).toString('base64url'); // "aX9kR2mP" style, 8 chars
}