-- WellSpring database bootstrap schema.
-- SAFE TO RE-RUN: this script never drops or truncates existing tables/data.
-- Back up existing databases before applying schema changes.

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_users_role CHECK (role IN ('USER', 'ADMIN'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS diseases (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    symptoms TEXT,
    causes TEXT,
    prevention TEXT,
    INDEX idx_diseases_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS medicinal_plants (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(300),
    uses TEXT,
    image_url VARCHAR(500),
    INDEX idx_plants_name (plant_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS diet_plans (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disease_id BIGINT NOT NULL,
    age_group VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    dinner TEXT,
    avoid_food TEXT,
    CONSTRAINT fk_diet_plans_disease FOREIGN KEY (disease_id)
        REFERENCES diseases(id) ON DELETE CASCADE,
    CONSTRAINT chk_diet_plans_type CHECK (type IN ('VEG', 'NONVEG')),
    INDEX idx_diet_plans_disease (disease_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ayurvedic_solutions (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disease_id BIGINT NOT NULL,
    herbs TEXT,
    home_remedy TEXT,
    lifestyle_changes TEXT,
    CONSTRAINT fk_ayurvedic_disease FOREIGN KEY (disease_id)
        REFERENCES diseases(id) ON DELETE CASCADE,
    INDEX idx_ayurvedic_disease (disease_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS support_messages (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_support_created (created_at)
) ENGINE=InnoDB;
