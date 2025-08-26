import { healthCheck } from '@snapp/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await healthCheck();
        return NextResponse.json({ healthy: true });
    } catch (err) {
        return NextResponse.json({ healthy: false }, { status: 500 });
    }
}
