-- =====================================================
-- TRIPEASE DATABASE COMPLETE SQL SCRIPT
-- =====================================================
-- Author: Bharath Kumar
-- Email: bharathkitty9009@gmail.com
-- Project: TripEase - AI Enabled Travel Management Portal
-- =====================================================

-- Drop database if exists (Caution: This will delete all data)
-- Uncomment the following line only if you want to reset everything
-- DROP DATABASE IF EXISTS tripease_db;

-- Create database
CREATE DATABASE IF NOT EXISTS tripease_db;
USE tripease_db;

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(10, 2),
    total_expenses DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'PLANNING',
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_trips_user_id (user_id),
    INDEX idx_trips_dates (start_date, end_date),
    INDEX idx_trips_status (status),
    CONSTRAINT chk_trip_dates CHECK (end_date >= start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    trip_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    INDEX idx_expenses_trip_id (trip_id),
    INDEX idx_expenses_category (category),
    INDEX idx_expenses_date (expense_date),
    CONSTRAINT chk_amount_positive CHECK (amount > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- AI Recommendations table
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL DEFAULT 'TRAVEL',
    content TEXT NOT NULL,
    destination VARCHAR(255),
    budget_range VARCHAR(100),
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_recommendations_user_id (user_id),
    INDEX idx_recommendations_type (type),
    INDEX idx_recommendations_destination (destination),
    FULLTEXT INDEX idx_recommendations_content (content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. INSERT SAMPLE DATA
-- =====================================================

-- Insert admin user (password: Admin@123)
-- BCrypt hash for 'Admin@123' is: $2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL
INSERT INTO users (first_name, last_name, email, password, role) VALUES 
('Admin', 'User', 'admin@tripease.com', '$2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL', 'ADMIN')
ON DUPLICATE KEY UPDATE email=email;

-- Insert test user (password: Password123)
-- BCrypt hash for 'Password123' is: $2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL
INSERT INTO users (first_name, last_name, email, password, role) VALUES 
('Test', 'User', 'test@example.com', '$2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL', 'USER')
ON DUPLICATE KEY UPDATE email=email;

-- Insert sample user (John Doe)
INSERT INTO users (first_name, last_name, email, password, role) VALUES 
('John', 'Doe', 'john.doe@example.com', '$2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL', 'USER')
ON DUPLICATE KEY UPDATE email=email;

-- Insert sample user (Jane Smith)
INSERT INTO users (first_name, last_name, email, password, role) VALUES 
('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$rTgqKpYgLqXpYgLqXpYgLOuXpYgLqXpYgLqXpYgLOuXpYgLqXpYgL', 'USER')
ON DUPLICATE KEY UPDATE email=email;

-- Get user IDs for reference (run this separately if needed)
-- SELECT id, email FROM users;

-- =====================================================
-- 3. INSERT SAMPLE TRIPS (Assuming user IDs)
-- Note: Replace user_id values with actual IDs from your database
-- Run this after you know the actual user IDs
-- =====================================================

-- For demonstration, we'll use variables
-- In actual execution, replace 1,2,3 with actual user IDs

-- Trip 1: Goa Vacation (for user with ID 2 - test@example.com)
INSERT INTO trips (title, description, destination, start_date, end_date, budget, status, user_id) VALUES
('Goa Beach Vacation', 'Relaxing beach vacation with friends', 'Goa, India', '2026-12-20', '2026-12-25', 50000.00, 'PLANNING', 2);

-- Trip 2: Manali Adventure (for user with ID 2)
INSERT INTO trips (title, description, destination, start_date, end_date, budget, status, user_id) VALUES
('Manali Winter Trip', 'Skiing and snow adventures', 'Manali, Himachal Pradesh', '2027-01-10', '2027-01-17', 45000.00, 'PLANNING', 2);

-- Trip 3: Kerala Backwaters (for user with ID 2)
INSERT INTO trips (title, description, destination, start_date, end_date, budget, status, user_id) VALUES
('Kerala Family Trip', 'Houseboat experience in Alleppey', 'Kerala, India', '2026-11-15', '2026-11-22', 60000.00, 'PLANNING', 2);

-- Trip for John Doe (user ID 3)
INSERT INTO trips (title, description, destination, start_date, end_date, budget, status, user_id) VALUES
('Europe Tour', 'Exploring Paris and Rome', 'Paris, France & Rome, Italy', '2027-05-10', '2027-05-25', 150000.00, 'PLANNING', 3);

-- Trip for Jane Smith (user ID 4)
INSERT INTO trips (title, description, destination, start_date, end_date, budget, status, user_id) VALUES
('Bali Honeymoon', 'Romantic getaway in Bali', 'Bali, Indonesia', '2027-02-14', '2027-02-21', 80000.00, 'PLANNING', 4);

-- =====================================================
-- 4. INSERT SAMPLE EXPENSES
-- =====================================================

-- Expenses for Goa Trip (assuming trip_id = 1)
INSERT INTO expenses (title, description, amount, expense_date, category, trip_id) VALUES
('Flight Tickets', 'Round trip Mumbai to Goa', 8500.00, '2026-12-20', 'Transportation', 1),
('Hotel Booking', '5 nights at Beach Resort', 25000.00, '2026-12-20', 'Accommodation', 1),
('Water Sports', 'Parasailing and jet skiing', 5000.00, '2026-12-21', 'Activities', 1),
('Seafood Dinner', 'Restaurant by the beach', 3500.00, '2026-12-22', 'Food', 1),
('Shopping', 'Souvenirs and local items', 4500.00, '2026-12-23', 'Shopping', 1);

-- Expenses for Manali Trip (assuming trip_id = 2)
INSERT INTO expenses (title, description, amount, expense_date, category, trip_id) VALUES
('Bus Tickets', 'Delhi to Manali Volvo', 3000.00, '2027-01-10', 'Transportation', 2),
('Hotel Snow View', '7 nights accommodation', 21000.00, '2027-01-10', 'Accommodation', 2),
('Skiing Equipment', 'Rental for 3 days', 4500.00, '2027-01-12', 'Activities', 2),
('Local Food', 'Cafes and restaurants', 6000.00, '2027-01-15', 'Food', 2),
('Winter Clothing', 'Jackets and gloves', 8000.00, '2027-01-11', 'Shopping', 2);

-- Expenses for Kerala Trip (assuming trip_id = 3)
INSERT INTO expenses (title, description, amount, expense_date, category, trip_id) VALUES
('Train Tickets', 'Cochin Express', 4000.00, '2026-11-15', 'Transportation', 3),
('Houseboat Booking', '2 nights in deluxe houseboat', 35000.00, '2026-11-15', 'Accommodation', 3),
('Ayurvedic Massage', 'Traditional Kerala massage', 3000.00, '2026-11-18', 'Activities', 3),
('Seafood Dinner', 'Fresh seafood restaurant', 2500.00, '2026-11-19', 'Food', 3),
('Spices Shopping', 'Local spices and tea', 2000.00, '2026-11-20', 'Shopping', 3);

-- Expenses for Europe Trip (assuming trip_id = 4)
INSERT INTO expenses (title, description, amount, expense_date, category, trip_id) VALUES
('International Flights', 'Mumbai to Paris return', 45000.00, '2027-05-10', 'Transportation', 4),
('Hotels', 'Paris and Rome accommodations', 60000.00, '2027-05-10', 'Accommodation', 4),
('Museum Tickets', 'Louvre, Eiffel Tower, Colosseum', 15000.00, '2027-05-12', 'Activities', 4),
('Food & Dining', 'European cuisine experience', 20000.00, '2027-05-15', 'Food', 4);

-- Expenses for Bali Trip (assuming trip_id = 5)
INSERT INTO expenses (title, description, amount, expense_date, category, trip_id) VALUES
('Flight Tickets', 'Singapore Airlines', 25000.00, '2027-02-14', 'Transportation', 5),
('Villa Booking', 'Private pool villa', 35000.00, '2027-02-14', 'Accommodation', 5),
('Temple Tours', 'Guided tours', 5000.00, '2027-02-16', 'Activities', 5),
('Romantic Dinner', 'Beachfront dinner', 8000.00, '2027-02-17', 'Food', 5);

-- =====================================================
-- 5. INSERT SAMPLE AI RECOMMENDATIONS
-- =====================================================

-- AI Recommendations for test user (user_id = 2)
INSERT INTO ai_recommendations (type, content, destination, budget_range, user_id) VALUES
('TRAVEL', 'Based on your interest in Bali with a moderate budget, we recommend visiting during April-October for best weather. Top attractions include Uluwatu Temple, Ubud Monkey Forest, and Seminyak beaches. Estimated daily budget: $100-150. Consider staying in Seminyak for nightlife or Ubud for cultural experience.', 'Bali, Indonesia', 'moderate', 2);

INSERT INTO ai_recommendations (type, content, destination, budget_range, user_id) VALUES
('TRAVEL', 'For your Paris trip with luxury budget, we recommend staying in Le Marais district. Must-visit: Eiffel Tower, Louvre Museum, Notre-Dame. Book restaurant reservations in advance. Consider a Seine river cruise at sunset. Estimated daily budget: $300-400.', 'Paris, France', 'luxury', 2);

INSERT INTO ai_recommendations (type, content, destination, budget_range, user_id) VALUES
('TRAVEL', 'Swiss Alps on a moderate budget: Visit Interlaken and Grindelwald. Take the Jungfrau railway, try hiking in summer or skiing in winter. Stay in hostels or budget hotels to save money. Swiss Travel Pass offers good value. Estimated daily budget: $150-200.', 'Swiss Alps', 'moderate', 2);

-- AI Recommendations for John Doe (user_id = 3)
INSERT INTO ai_recommendations (type, content, destination, budget_range, user_id) VALUES
('TRAVEL', 'Tokyo travel tips: Best time to visit is March-April for cherry blossoms or October-November for autumn colors. Stay in Shinjuku or Shibuya. Try local cuisine at Tsukiji outer market. Get a Suica card for easy transport. Estimated daily budget: $150-200.', 'Tokyo, Japan', 'moderate', 3);

-- AI Recommendations for Jane Smith (user_id = 4)
INSERT INTO ai_recommendations (type, content, destination, budget_range, user_id) VALUES
('TRAVEL', 'Maldives honeymoon guide: Best luxury resorts include Soneva Jani and St. Regis. Visit during November-April for best weather. Book overwater villa for ultimate experience. All-inclusive packages recommended. Estimated daily budget: $500-800.', 'Maldives', 'luxury', 4);

-- =====================================================
-- 6. UPDATE TRIP TOTAL EXPENSES (Run after inserting expenses)
-- =====================================================

-- Update total_expenses for all trips based on sum of expenses
UPDATE trips t
SET t.total_expenses = (
    SELECT COALESCE(SUM(e.amount), 0)
    FROM expenses e
    WHERE e.trip_id = t.id
);

-- =====================================================
-- 7. CREATE TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

DELIMITER //

-- Trigger to update trip total expenses when expense is inserted
CREATE TRIGGER after_expense_insert
AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
    UPDATE trips 
    SET total_expenses = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM expenses 
        WHERE trip_id = NEW.trip_id
    )
    WHERE id = NEW.trip_id;
END//

-- Trigger to update trip total expenses when expense is updated
CREATE TRIGGER after_expense_update
AFTER UPDATE ON expenses
FOR EACH ROW
BEGIN
    UPDATE trips 
    SET total_expenses = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM expenses 
        WHERE trip_id = NEW.trip_id
    )
    WHERE id = NEW.trip_id;
END//

-- Trigger to update trip total expenses when expense is deleted
CREATE TRIGGER after_expense_delete
AFTER DELETE ON expenses
FOR EACH ROW
BEGIN
    UPDATE trips 
    SET total_expenses = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM expenses 
        WHERE trip_id = OLD.trip_id
    )
    WHERE id = OLD.trip_id;
END//

DELIMITER ;

-- =====================================================
-- 8. CREATE VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for user trip summary
CREATE OR REPLACE VIEW user_trip_summary AS
SELECT 
    u.id AS user_id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(t.id) AS total_trips,
    COALESCE(SUM(t.budget), 0) AS total_budget,
    COALESCE(SUM(t.total_expenses), 0) AS total_spent,
    COUNT(CASE WHEN t.status = 'PLANNING' THEN 1 END) AS planning_trips,
    COUNT(CASE WHEN t.status = 'ONGOING' THEN 1 END) AS ongoing_trips,
    COUNT(CASE WHEN t.status = 'COMPLETED' THEN 1 END) AS completed_trips
FROM users u
LEFT JOIN trips t ON u.id = t.user_id
GROUP BY u.id, u.first_name, u.last_name, u.email;

-- View for expense category summary
CREATE OR REPLACE VIEW category_expense_summary AS
SELECT 
    t.user_id,
    e.category,
    COUNT(e.id) AS expense_count,
    COALESCE(SUM(e.amount), 0) AS total_amount
FROM expenses e
JOIN trips t ON e.trip_id = t.id
GROUP BY t.user_id, e.category
ORDER BY t.user_id, total_amount DESC;

-- View for upcoming trips
CREATE OR REPLACE VIEW upcoming_trips AS
SELECT 
    t.*,
    u.first_name,
    u.last_name,
    u.email,
    DATEDIFF(t.start_date, CURDATE()) AS days_until_start
FROM trips t
JOIN users u ON t.user_id = u.id
WHERE t.start_date >= CURDATE() 
  AND t.status IN ('PLANNING', 'ONGOING')
ORDER BY t.start_date ASC;

-- =====================================================
-- 9. SAMPLE QUERIES FOR TESTING
-- =====================================================

-- Get all users
-- SELECT * FROM users;

-- Get all trips for a specific user (replace 2 with actual user_id)
-- SELECT * FROM trips WHERE user_id = 2;

-- Get all expenses for a specific trip (replace 1 with actual trip_id)
-- SELECT * FROM expenses WHERE trip_id = 1;

-- Get total expenses by category for a user (replace 2 with actual user_id)
-- SELECT category, SUM(amount) as total FROM expenses e
-- JOIN trips t ON e.trip_id = t.id
-- WHERE t.user_id = 2
-- GROUP BY category
-- ORDER BY total DESC;

-- Get budget summary for a user (replace 2 with actual user_id)
-- SELECT 
--     SUM(budget) as total_budget,
--     SUM(total_expenses) as total_spent,
--     SUM(budget) - SUM(total_expenses) as remaining_budget,
--     (SUM(total_expenses) / SUM(budget)) * 100 as percentage_used
-- FROM trips
-- WHERE user_id = 2;

-- Get upcoming trips for a user (replace 2 with actual user_id)
-- SELECT * FROM trips 
-- WHERE user_id = 2 
--   AND start_date >= CURDATE() 
-- ORDER BY start_date ASC;

-- Get AI recommendations for a user (replace 2 with actual user_id)
-- SELECT * FROM ai_recommendations 
-- WHERE user_id = 2 
-- ORDER BY created_at DESC;

-- =====================================================
-- 10. CLEANUP SCRIPTS (Use with caution)
-- =====================================================

-- Delete all data (but keep tables)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE expenses;
-- TRUNCATE TABLE ai_recommendations;
-- TRUNCATE TABLE trips;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Drop all tables
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS expenses;
-- DROP TABLE IF EXISTS ai_recommendations;
-- DROP TABLE IF EXISTS trips;
-- DROP TABLE IF EXISTS users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Drop database completely
-- DROP DATABASE IF EXISTS tripease_db;

-- =====================================================
-- END OF SCRIPT
-- =====================================================

-- Success message
SELECT 'TripEase Database created successfully!' AS 'Status';
SELECT CONCAT('Total Users: ', COUNT(*)) AS 'Summary' FROM users;
SELECT CONCAT('Total Trips: ', COUNT(*)) AS 'Summary' FROM trips;
SELECT CONCAT('Total Expenses: ', COUNT(*)) AS 'Summary' FROM expenses;
SELECT CONCAT('Total AI Recommendations: ', COUNT(*)) AS 'Summary' FROM ai_recommendations;
