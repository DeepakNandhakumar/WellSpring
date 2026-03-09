-- WellSpring Database Schema
-- Preventive Health Intelligence Platform

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS support_messages;
DROP TABLE IF EXISTS ayurvedic_solutions;
DROP TABLE IF EXISTS diet_plans;
DROP TABLE IF EXISTS medicinal_plants;
DROP TABLE IF EXISTS diseases;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (role IN ('USER', 'ADMIN'))
);

-- Diseases Table
CREATE TABLE diseases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    symptoms TEXT,
    causes TEXT,
    prevention TEXT
);

-- Medicinal Plants Table
CREATE TABLE medicinal_plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(300),
    uses TEXT,
    image_url VARCHAR(500)
);

-- Diet Plans Table
CREATE TABLE diet_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    disease_id BIGINT NOT NULL,
    age_group VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    dinner TEXT,
    avoid_food TEXT,
    FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE,
    CHECK (type IN ('VEG', 'NONVEG'))
);

-- Ayurvedic Solutions Table
CREATE TABLE ayurvedic_solutions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    disease_id BIGINT NOT NULL,
    herbs TEXT,
    home_remedy TEXT,
    lifestyle_changes TEXT,
    FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
);

-- Support Messages Table
CREATE TABLE support_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_diseases_name ON diseases(name);
CREATE INDEX idx_plants_name ON medicinal_plants(plant_name);
CREATE INDEX idx_diet_plans_disease ON diet_plans(disease_id);
CREATE INDEX idx_ayurvedic_disease ON ayurvedic_solutions(disease_id);
CREATE INDEX idx_support_created ON support_messages(created_at);
