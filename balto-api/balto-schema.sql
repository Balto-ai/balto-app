
CREATE TABLE shelters (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    url         TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    address     TEXT NOT NULL,
    city        TEXT NOT NULL,
    state       TEXT NOT NULL,
    zipcode     TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    image_url   TEXT NOT NULL,
    latitude    FLOAT NOT NULL,
    longitude   FLOAT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dogs (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    dob             DATE NOT NULL,
    size            TEXT NOT NULL,
    breed           TEXT NOT NULL,
    sex             TEXT NOT NULL,
    color           TEXT NOT NULL,
    desc_1          TEXT NOT NULL,
    desc_2          TEXT NOT NULL,
    date_entered    DATE NOT NULL,
    image_name      TEXT NOT NULL,
    image_url       TEXT NOT NULL,
    novice_friendly BOOLEAN NOT NULL DEFAULT FALSE,
    kid_friendly    BOOLEAN NOT NULL DEFAULT FALSE,
    dog_friendly    BOOLEAN NOT NULL DEFAULT FALSE,
    cat_friendly    BOOLEAN NOT NULL DEFAULT FALSE,
    stranger_friendly BOOLEAN NOT NULL DEFAULT FALSE,
    playfulness     INTEGER NOT NULL CHECK (playfulness BETWEEN 0 and 5),
    energy_level    INTEGER NOT NULL CHECK (energy_level BETWEEN 0 and 5),
    exercise_needs  INTEGER NOT NULL CHECK (exercise_needs BETWEEN 0 and 5),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    shelter_id      INTEGER NOT NULL,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id)
);

CREATE TABLE image_gallery (
    id          SERIAL PRIMARY KEY,
    image_name  TEXT NOT NULL,
    image_url   TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dog_gallery_pairings (
    id          SERIAL PRIMARY KEY,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    gallery_id  INTEGER NOT NULL,
    dog_id      INTEGER NOT NULL,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
    FOREIGN KEY (gallery_id) REFERENCES image_gallery(id) ON DELETE CASCADE
);

CREATE TABLE milestones (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    status      BOOLEAN NOT NULL DEFAULT FALSE,
    minutes     INTEGER NOT NULL DEFAULT 0,
    notes       TEXT NOT NULL DEFAULT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    dog_id      INTEGER NOT NULL,
    FOREIGN KEY (dog_id) REFERENCES dogs(id)
);

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    password    TEXT NOT NULL,
    zipcode     TEXT NOT NULL,
    is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    shelter_id  INTEGER,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id)
);

CREATE TABLE user_dog_pairings (
    id          SERIAL PRIMARY KEY,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id     INTEGER NOT NULL,
    dog_id      INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);

CREATE TABLE adoption_inquiries (
    id              SERIAL PRIMARY KEY,
    email           TEXT NOT NULL CHECK (POSITION('@' IN email) > 1),
    phone_number    TEXT,
    comments        TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id         INTEGER NOT NULL,
    dog_id          INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);