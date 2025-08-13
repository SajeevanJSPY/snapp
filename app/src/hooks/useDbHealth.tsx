import { useEffect, useState } from 'react';

export const useDbHealth = () => {
    const [dbHealth, setDbHealth] = useState(false);

    useEffect(() => {
        async function checkDbHealth() {
            console.log('checkDbHealth trace');
            let dbHealth = await fetch('api/db-health');
            if (dbHealth.ok) {
                setDbHealth(true);
            } else {
                setDbHealth(false);
            }
        }
        checkDbHealth();
        let intervalId = setInterval(checkDbHealth, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return dbHealth;
};
