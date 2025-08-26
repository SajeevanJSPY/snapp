import { base64EncodedImage } from './image';

type Device = {
    refreshToken: string;
    userAgent: string;
};

type User = {
    email: string;
    username: string;
    about: string;
    password: string;
    avatar?: string;
};

type Fixture = {
    user: User;
    devices: Device[];
};

export const fixtures: Record<string, Fixture> = {
    eren: {
        user: {
            email: 'eren@begins.rmb',
            username: 'eren',
            about: 'Tatakawanakereba, Katenai',
            password: 'secret',
            avatar: base64EncodedImage,
        },
        devices: [
            {
                refreshToken: 'vE4x9z6mD7qA1rF8yL3kP2oT5uW9jX0sZ7hN6vB4cD1mQ8pR3tY2',
                userAgent: 'Linux/Firefox',
            },
            {
                refreshToken: 'vE4x9z6mD7qA1rF8yL3kP2oT5uW9jX0sZ7hN6vB4cD1mQ8pR3dstY2',
                userAgent: 'Mobile/Android',
            },
        ],
    },
    mikasa: {
        user: {
            email: 'mikasa@ack.rmb',
            username: 'mikasa',
            about: 'I will protect Eren at all costs.',
            password: 'scarf',
        },
        devices: [
            {
                refreshToken: 'vE4x9z6mD7qA1rF8yL3kP2oT5uW9jX0sZ7hN6vB4cD1mQ8pR3dadtY2',
                userAgent: 'Mobile/Android',
            },
        ],
    },
    armin: {
        user: {
            email: 'armin@strategist.rmb',
            username: 'armin',
            about: 'Sometimes, you have to abandon humanity to save humanity.',
            password: 'tactics',
        },
        devices: [
            {
                refreshToken: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f0d9s8a7q6w5',
                userAgent: 'Windows/Chrome',
            },
            {
                refreshToken: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5',
                userAgent: 'Tablet/iOS',
            },
        ],
    },
    levi: {
        user: {
            email: 'levi@humanity.rmb',
            username: 'levi',
            about: "The only thing we're allowed to do is believe.",
            password: 'captain',
        },
        devices: [
            {
                refreshToken: 'm9n8b7v6c5x4z3a2s1d0f9g8h7j6k5l4p3o2i1u0y9t8r7e6w5',
                userAgent: 'Linux/CLI',
            },
        ],
    },
    hinata: {
        user: {
            email: 'hinata@karasuno.jp',
            username: 'hinata',
            about: 'I may be small, but I can fly!',
            password: 'secret',
        },
        devices: [
            {
                refreshToken: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
                userAgent: 'Windows/Chrome',
            },
            {
                refreshToken: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1',
                userAgent: 'iOS/Safari',
            },
        ],
    },
    kageyama: {
        user: {
            email: 'kageyama@karasuno.jp',
            username: 'kageyama',
            about: 'A setter who always aims for the perfect toss.',
            password: 'secret',
        },
        devices: [
            {
                refreshToken: 'l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9',
                userAgent: 'MacOS/Safari',
            },
            {
                refreshToken: 'h8g7f6e5d4c3b2a1z0y9x8w7v6u5t4s3r2q1p0',
                userAgent: 'Android/Chrome',
            },
        ],
    },
    daichi: {
        user: {
            email: 'daichi@karasuno.jp',
            username: 'daichi',
            about: 'Reliable captain and pillar of the team.',
            password: 'secret',
        },
        devices: [
            {
                refreshToken: 'p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9',
                userAgent: 'Linux/Firefox',
            },
        ],
    },
    nishinoya: {
        user: {
            email: 'nishinoya@karasuno.jp',
            username: 'nishinoya',
            about: 'Guardian Deity of Karasuno — The Libero!',
            password: 'secret',
        },
        devices: [
            {
                refreshToken: 'u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9',
                userAgent: 'Windows/Edge',
            },
            {
                refreshToken: 'r9q8p7o6n5m4l3k2j1i0h9g8f7e6d5c4b3a2z1',
                userAgent: 'iPadOS/Safari',
            },
        ],
    },
    tsukishima: {
        user: {
            email: 'tsukki@karasuno.jp',
            username: 'tsukishima',
            about: 'Tall blocker with a sharp tongue.',
            password: 'secret',
        },
        devices: [
            {
                refreshToken: 'x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9',
                userAgent: 'Windows/Opera',
            },
        ],
    },
    naruto: {
        user: {
            email: 'naruto@konoha.nin',
            username: 'naruto',
            about: 'Dattebayo!',
            password: 'ramenlover',
        },
        devices: [
            {
                refreshToken: 'k7xL9z3mF8qA1rS2yP0oT5uW4nV6bM1hJ9tR2fK3pL7qY8dX6v',
                userAgent: 'Windows/Chrome',
            },
            {
                refreshToken: 'z3mK9x7qL8rA1pF2oT4uW6yN9hJ1tM2bR5kC8vD7sQ0nG3wX6l',
                userAgent: 'iOS/Safari',
            },
        ],
    },
    sasuke: {
        user: {
            email: 'sasuke@uchiha.nin',
            username: 'sasuke',
            about: 'Revenge will be mine.',
            password: 'sharingan',
        },
        devices: [
            {
                refreshToken: 't7pQ2nW4xF6mL8kR9aS1jH3oV5bZ0yC2uE7rM4dK8wX9nF2qL6',
                userAgent: 'Linux/Firefox',
            },
        ],
    },
    kakashi: {
        user: {
            email: 'kakashi@jonin.nin',
            username: 'kakashi',
            about: 'In the ninja world, those who break the rules are scum…',
            password: 'copycat',
        },
        devices: [
            {
                refreshToken: 'm3xK7rN9qJ5oL2yW4vT1hF8bZ6dC0pE2kR9nM7sQ3fV6gX1wY5',
                userAgent: 'MacOS/Safari',
            },
        ],
    },
    itachi: {
        user: {
            email: 'itachi@akatsuki.nin',
            username: 'itachi',
            about: 'Those who forgive themselves… are truly strong.',
            password: 'tsukuyomi',
        },
        devices: [
            {
                refreshToken: 'f7nQ3kJ9rM5oL2yT8vF1hB6dC4pZ0eE7kR9mS2nV6gX1wY5qK3',
                userAgent: 'Linux/Brave',
            },
            {
                refreshToken: 'q1nF9mR3kJ7oT2yW4vL5hB8dC6pZ0eE7kR9sM2gX1wY5qK3nJ7',
                userAgent: 'Windows/Opera',
            },
        ],
    },
    madara: {
        user: {
            email: 'madara@uchiha.clan',
            username: 'madara',
            about: 'Wake up to reality. Nothing ever goes as planned in this world.',
            password: 'infiniteTsukuyomi',
        },
        devices: [
            {
                refreshToken: 'z1x9y8w7v6u5t4s3r2q1p0o9n8m7l6k5j4h3g2f1',
                userAgent: 'Windows/Edge',
            },
            {
                refreshToken: 'y9x8z7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f0',
                userAgent: 'iOS/Safari',
            },
        ],
    },
    mightGuy: {
        user: {
            email: 'might.guy@konoha.jp',
            username: 'mightguy',
            about: 'Power of youth is infinite!',
            password: 'eightGates',
        },
        devices: [
            {
                refreshToken: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
                userAgent: 'Linux/Chrome',
            },
            {
                refreshToken: 'b2a1c3d4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0',
                userAgent: 'Android/Chrome',
            },
        ],
    },
    obito: {
        user: {
            email: 'obito@uchiha.org',
            username: 'obito',
            about: 'The moment people come to know love, they run the risk of carrying hate.',
            password: 'kamuiPortal',
        },
        devices: [
            {
                refreshToken: 'c3d4e5f6g7h8i9j0a1b2c3d4e5f6g7h8i9j0k1l2',
                userAgent: 'Windows/Firefox',
            },
            {
                refreshToken: 'd4c3e5f6h7g8i9j0a1b2k1l2m3n4o5p6q7r8s9t0',
                userAgent: 'MacOS/Safari',
            },
        ],
    },
    hashirama: {
        user: {
            email: 'hashirama@senju.clan',
            username: 'hashirama',
            about: 'I will protect my friends with my life.',
            password: 'woodRelease',
        },
        devices: [
            {
                refreshToken: 'e5f6g7h8i9j0a1b2c3d4f5g6h7i8j9k0l1m2n3o4',
                userAgent: 'Linux/Brave',
            },
            {
                refreshToken: 'f6e5g7h8i9j0a1b2k3l4m5n6o7p8q9r0s1t2u3v4',
                userAgent: 'iPad/Safari',
            },
        ],
    },
};
