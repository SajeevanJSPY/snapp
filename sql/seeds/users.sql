-- users list
SELECT
    *
FROM
    register_user(
        'eren@begins.rmb',
        'eren',
        'Tatakawanakereba, Katenai!',
        'rumbling500',
        '192.168.41.24',
        'linux/firefox',
    );

SELECT
    *
FROM
    register_user(
        'goku@dbz.earth',
        'goku',
        'Saiyan raised on Earth',
        'kamehameha123',
        '192.168.1.101',
        'windows/chrome'
    );

SELECT
    *
FROM
    register_user(
        'lelouch@britannia.zero',
        'lelouch',
        'The man with the Geass',
        'rebellion!',
        '10.0.0.42',
        'linux/firefox'
    );

SELECT
    *
FROM
    register_user(
        'itachi@uchiha.clan',
        'itachi',
        'For peace, I chose to be a traitor.',
        'sharingan4life',
        '172.16.3.14',
        'mac/safari'
    );

SELECT
    *
FROM
    register_user(
        'luffy@strawhat.pirates',
        'luffy',
        'Future King of the Pirates!',
        'meatlover123',
        '192.168.77.88',
        'android/samsung-internet'
    );

SELECT
    *
FROM
    register_user(
        'light@kira.world',
        'light',
        'I am Justice!',
        'notekira123',
        '10.10.10.10',
        'windows/edge'
    );

SELECT
    *
FROM
    register_user(
        'vegeta@anime.com',
        'vegeta',
        'Prince of Saiyans',
        'finalflash',
        '192.168.1.2',
        'saiyan/os'
    );

SELECT
    *
FROM
    register_user(
        'naruto@anime.com',
        'naruto',
        'Hokage of Hidden Leaf',
        'ramen123',
        '192.168.1.3',
        'ninja/os'
    );

SELECT
    *
FROM
    register_user(
        'sasuke@anime.com',
        'sasuke',
        'Shadow Ninja',
        'chidori',
        '192.168.1.4',
        'ninja/os'
    );

SELECT
    *
FROM
    register_user(
        'luffy@anime.com',
        'luffy',
        'Future Pirate King',
        'gear5',
        '192.168.1.5',
        'pirate/os'
    );

SELECT
    *
FROM
    register_user(
        'zoro@anime.com',
        'zoro',
        'Sword Master',
        'santoryu',
        '192.168.1.6',
        'pirate/os'
    );

-- contacts list
SELECT
    contact('goku', 'vegeta');

SELECT
    contact('naruto', 'sasuke');

SELECT
    contact('luffy', 'zoro');

SELECT
    contact('vegeta', 'goku');

SELECT
    contact('zoro', 'luffy');

SELECT
    contact('goku', 'naruto');