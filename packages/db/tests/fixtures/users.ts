import { base64EncodedImage } from './image';

export const userFixtures = {
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
            about: 'You are family',
            password: 'scarf',
        },
        devices: [
            {
                refreshToken: 'vE4x9z6mD7qA1rF8yL3kP2oT5uW9jX0sZ7hN6vB4cD1mQ8pR3dadtY2',
                userAgent: 'Mobile/Android',
            },
        ],
    },
};
