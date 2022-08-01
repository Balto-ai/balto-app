-- SEED File to create mock data

INSERT INTO shelters (name, url, email, address, city, state, zipcode, phone_number)
VALUES (
    'The Real Bark',
    'https://www.therealbark.org',
    'admin@therealbark.org',
    '3740 Sunset Blvd',
    'Los Angeles',
    'CA',
    '90026',
    '3238342360'
), (
    'Vanderpump Dogs',
    'https://www.vanderpumpdogs.org',
    'admin@vanderpumpdogs.org',
    '8134 W 3rd St',
    'Los Angeles',
    'CA',
    '90026',
    '3238523647'
);

INSERT INTO users (first_name, last_name, email, password, zipcode, is_admin, created_at, shelter_id)
VALUES (
    'Annesa',
    'Tran',
    'atran@balto.ai',
    'pw',
    '90202',
    FALSE,
    NOW(),
    NULL
), (
    'Christy',
    'Xiong',
    'cxiong@balto.ai',
    'pw',
    '90210',
    FALSE,
    NOW(),
    NULL
), (
    'Charles',
    'Xu',
    'cxu@balto.ai',
    'pw',
    '90211',
    FALSE,
    NOW(),
    NULL
), (
    'Steve',
    'Irwin',
    'sirwin@balto.ai',
    'pw',
    '75225',
    TRUE,
    NOW(),
    (SELECT id FROM shelters WHERE name='The Real Bark')
), (
    'Jane',
    'Doe',
    'jdoe@balto.ai',
    'pw',
    '75228',
    TRUE,
    NOW(),
    (SELECT id FROM shelters WHERE name='Vanderpump Dogs')
);

INSERT INTO dogs (name, dob, size, breed, sex, color, desc_1, desc_2, date_entered, image_url, novice_friendly, kid_friendly, dog_friendly, cat_friendly, stranger_friendly, playfulness, energy_level, exercise_needs, created_at, shelter_id)
VALUES (
    'Marley',
    '2015-09-06',
    'large',
    'Labrador Retriever',
    'm',
    'gold',
    'energetic and easy to handle',
    'takes me on walks and shows me lots of attention',
    '2021-11-21',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80',
    TRUE, TRUE, TRUE, FALSE, TRUE,
    5, 5, 5,
    NOW(),
    (SELECT id FROM shelters WHERE name='Vanderpump Dogs')
), (
    'Cinderella',
    '2020-01-02',
    'medium',
    'Harrier',
    'f',
    'brown',
    'stubborn but extremely loyal and friendly',
    'will put up with my energy and I will reward them back with hugs and kisses :)',
    '2022-03-01',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harrier_tricolour.jpg/440px-Harrier_tricolour.jpg',
    FALSE, TRUE, FALSE, TRUE, TRUE,
    1, 2, 3,
    NOW(),
    (SELECT id FROM shelters WHERE name='The Real Bark')
), (
    'Bella',
    '2019-05-11',
    'large',
    'Italian Greyhound',
    'f',
    'gray',
    'fast as lightning!',
    'is always ready for a run or at least a trip to the park',
    '2022-06-29',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Blue_greyhound.JPG/440px-Blue_greyhound.JPG',
    TRUE, TRUE, TRUE, TRUE, TRUE,
    4, 5, 5,
    NOW(),
    (SELECT id FROM shelters WHERE name='The Real Bark')
), (
    'Doge',
    '2018-12-23',
    'small',
    'Shiba Inu',
    'm',
    'white',
    'wow, much loving, so present',
    'is willing to take a chance on me',
    '2021-01-19',
    'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg',
    FALSE, TRUE, TRUE, FALSE, FALSE,
    3, 3, 1,
    NOW(),
    (SELECT id FROM shelters WHERE name='Vanderpump Dogs')
), (
    'Balto',
    '1989-10-07',
    'large',
    'Siberian Husky',
    'm',
    'black',
    'some one who will go the distance to meet a goal or protect a friend',
    'has the same drive and dedication as I do to dog sledding, someone who will respect me and help me achieve great things',
    '2003-06-23',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Siberian_Husky_sable.jpg/440px-Siberian_Husky_sable.jpg',
    FALSE, TRUE, TRUE, TRUE, FALSE,
    2, 2, 3,
    NOW(),
    (SELECT id FROM shelters WHERE name='The Real Bark')
), (
    'Maxine',
    '2022-07-10',
    'small',
    'Akita',
    'f',
    'brown',
    'independent and introverted with strangers but loyal to my family (who could be you)',
    'respects my boundaries and trusts my abilities to protect you',
    '2017-05-22',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Boy_c11.jpg/440px-Boy_c11.jpg',
    TRUE, FALSE, FALSE, FALSE, TRUE,
    5, 3, 3,
    NOW(),
    (SELECT id FROM shelters WHERE name='Vanderpump Dogs')
), (
    'Toto',
    '2020-03-14',
    'small',
    'Cairn Terrier',
    'm',
    'beige',
    'here to help and accompany you to success',
    'will take me on adventures and journeys',
    '2019-10-15',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Керн_терьер_%28cairn_terrier%29.jpg/440px-Керн_терьер_%28cairn_terrier%29.jpg',
    FALSE, FALSE, FALSE, FALSE, FALSE,
    1, 1, 1,
    NOW(),
    (SELECT id FROM shelters WHERE name='The Real Bark')
);

INSERT INTO milestones (name, status, minutes, notes, dog_id)
VALUES (
    'Roll',
    FALSE,
    60,
    'Today, Marley tried to roll but instead laid on his tummy and waited for a belly rub',
    (SELECT id FROM dogs WHERE name='Marley' AND dob='2015-09-06')
), (
    'Sit',
    TRUE,
    180,
    'Marley did it! He sat when we told him to "sit". Incredible progress.',
    (SELECT id FROM dogs WHERE name='Marley' AND dob='2015-09-06')
), (
    'Stay',
    TRUE,
    90,
    'Marley stayed put for almost ten minutes today!',
    (SELECT id FROM dogs WHERE name='Marley' AND dob='2015-09-06')
), (
    'Roll',
    FALSE,
    60,
    'Today, Balto tried to roll but instead laid on his tummy and waited for a belly rub',
    (SELECT id FROM dogs WHERE name='Balto' AND dob='1989-10-07')
), (
    'Sit',
    TRUE,
    180,
    'Balto did it! He sat when we told him to "sit". Incredible progress.',
    (SELECT id FROM dogs WHERE name='Balto' AND dob='1989-10-07')
), (
    'Stay',
    TRUE,
    90,
    'Balto stayed put for almost ten minutes today!',
    (SELECT id FROM dogs WHERE name='Balto' AND dob='1989-10-07')
);

INSERT INTO user_dog_pairings (user_id, dog_id)
VALUES (
    (SELECT id FROM users WHERE email='atran@balto.ai'),
    (SELECT id FROm dogs WHERE name='Balto' AND dob='1989-10-07')
), (
    (SELECT id FROM users WHERE email='atran@balto.ai'),
    (SELECT id FROM dogs WHERE name='Maxine' AND dob='2022-07-10')
);



