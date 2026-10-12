-- WellSpring educational content seed data. Applied once by Flyway.
-- Example menus and wellness content are informational, not individualized medical advice.

-- Do not seed default users or administrator credentials. Provision an administrator through a controlled, audited process.

-- Diseases Data
INSERT INTO diseases (name, description, symptoms, causes, prevention) VALUES
('Diabetes', 
 'Diabetes is a chronic disease that occurs when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces.',
 'Increased thirst, frequent urination, extreme hunger, unexplained weight loss, fatigue, irritability, blurred vision, slow-healing sores.',
 'Genetics, obesity, sedentary lifestyle, unhealthy diet, age, high blood pressure, abnormal cholesterol levels.',
 'Maintain healthy weight, regular exercise, balanced diet, limit sugar intake, regular health checkups, avoid smoking.'),

('Hypertension', 
 'Hypertension, or high blood pressure, is a condition in which the force of the blood against the artery walls is too high.',
 'Headaches, shortness of breath, nosebleeds, flushing, dizziness, chest pain, visual changes, blood in urine.',
 'Obesity, family history, sedentary lifestyle, high salt diet, stress, chronic kidney disease, thyroid disorders.',
 'Reduce salt intake, maintain healthy weight, regular exercise, limit alcohol, quit smoking, manage stress, regular monitoring.'),

('Heart Disease', 
 'Heart disease describes a range of conditions that affect your heart, including blood vessel diseases, heart rhythm problems, and heart defects.',
 'Chest pain, chest tightness, shortness of breath, pain in neck/jaw/throat, pain in upper abdomen, fatigue, irregular heartbeat.',
 'High blood pressure, high cholesterol, smoking, diabetes, obesity, poor diet, physical inactivity, excessive alcohol.',
 'Quit smoking, control blood pressure, maintain cholesterol levels, exercise regularly, healthy diet, maintain healthy weight.'),

('Asthma', 
 'Asthma is a condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.',
 'Shortness of breath, chest tightness, wheezing, coughing especially at night, difficulty sleeping due to breathing.',
 'Allergens, respiratory infections, air pollutants, physical activity, cold air, stress, certain medications.',
 'Avoid triggers, take prescribed medications, use inhaler properly, get vaccinated, monitor breathing, create action plan.'),

('Arthritis', 
 'Arthritis is the swelling and tenderness of one or more joints, causing pain and stiffness that can worsen with age.',
 'Joint pain, stiffness, swelling, redness, decreased range of motion, warmth around joints, fatigue, fever.',
 'Age, family history, previous joint injury, obesity, autoimmune disorders, infections, wear and tear.',
 'Maintain healthy weight, exercise regularly, protect joints, quit smoking, eat anti-inflammatory foods, stay active.'),

('Obesity', 
 'Obesity is a complex disease involving an excessive amount of body fat that increases the risk of other health problems.',
 'Excess body fat, shortness of breath, increased sweating, snoring, inability to perform physical tasks, fatigue.',
 'Genetics, unhealthy diet, physical inactivity, certain medications, hormonal imbalances, psychological factors.',
 'Healthy eating habits, regular physical activity, behavioral changes, adequate sleep, stress management, medical support.'),

('Stress & Anxiety', 
 'Chronic stress and anxiety can lead to various physical and mental health problems affecting overall well-being.',
 'Feeling nervous, restless, increased heart rate, rapid breathing, sweating, trembling, trouble concentrating, insomnia.',
 'Work pressure, financial problems, relationship issues, health concerns, traumatic events, genetic predisposition.',
 'Regular exercise, meditation, adequate sleep, healthy diet, limit caffeine, social connections, professional help.'),

('Insomnia', 
 'Insomnia is a common sleep disorder that can make it hard to fall asleep, hard to stay asleep, or cause early waking.',
 'Difficulty falling asleep, waking up during night, waking too early, daytime tiredness, irritability, depression.',
 'Stress, irregular sleep schedule, poor sleep habits, mental health disorders, medications, caffeine, medical conditions.',
 'Consistent sleep schedule, relaxing bedtime routine, limit screen time, avoid caffeine, comfortable sleep environment.'),

('Digestive Disorders', 
 'Digestive disorders include conditions that affect the digestive system, causing discomfort and nutritional issues.',
 'Abdominal pain, bloating, constipation, diarrhea, heartburn, nausea, vomiting, blood in stool, weight loss.',
 'Poor diet, stress, infections, medications, food intolerances, autoimmune conditions, genetic factors.',
 'High-fiber diet, stay hydrated, regular exercise, limit processed foods, manage stress, eat probiotics, avoid triggers.'),

('Common Cold & Flu', 
 'The common cold and flu are viral infections of the upper respiratory tract that affect the nose, throat, and sinuses.',
 'Runny nose, sore throat, cough, congestion, body aches, headache, sneezing, fever, fatigue, weakness.',
 'Viral infections (rhinovirus, influenza virus), close contact with infected people, weakened immune system.',
 'Wash hands frequently, avoid touching face, stay away from sick people, boost immune system, get flu vaccine.');

-- Medicinal plant entries are educational descriptions, not treatment claims.
INSERT INTO medicinal_plants (plant_name, scientific_name, uses, image_url) VALUES
('Tulsi (Holy Basil)', 'Ocimum tenuiflorum', 'Aromatic herb used in food and traditional practices. Evidence and safety depend on preparation; this entry does not recommend it to treat illness.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400'),
('Neem', 'Azadirachta indica', 'Tree used in some traditional products. Preparation and dose affect safety; oral use may be harmful and should be discussed with a qualified clinician.', 'https://images.unsplash.com/photo-1605112442948-7fd0f0e5c9c1?w=400'),
('Ashwagandha', 'Withania somnifera', 'Herb used in some traditional wellness products. Evidence is limited for many claims, and it may interact with medicines or be unsuitable for some people.', 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400'),
('Aloe Vera', 'Aloe barbadensis miller', 'Gel is commonly used in topical skincare products. Oral aloe products have different risks and should not be used as treatment without professional advice.', 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),
('Turmeric', 'Curcuma longa', 'Common culinary spice. Concentrated supplements differ from food use and may interact with medicines; this entry does not claim disease-prevention or treatment effects.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'),
('Ginger', 'Zingiber officinale', 'Culinary spice used in food and beverages. Concentrated supplements can have side effects or interactions; consult a clinician if you take medication.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'),
('Giloy', 'Tinospora cordifolia', 'Herbal product used in traditional practices. Liver injury has been reported with some products; do not use it as a treatment without qualified medical advice.', 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),
('Brahmi', 'Bacopa monnieri', 'Herb used in some traditional preparations. Evidence, product quality and safety vary; it may interact with medicines and is not a substitute for care.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400'),
('Moringa', 'Moringa oleifera', 'Edible plant used as food in some regions. Supplements and extracts differ from ordinary food and should be assessed for quality and suitability.', 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),
('Peppermint', 'Mentha × piperita', 'Aromatic herb used in foods and teas. Concentrated essential oils can be harmful if misused; follow product safety instructions and seek professional advice when needed.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400');

-- Diet Plans Data
INSERT INTO diet_plans (disease_id, age_group, type, breakfast, lunch, dinner, avoid_food) VALUES
(1, '18-40', 'VEG', 
 'Oats porridge with cinnamon, 1 boiled egg white (optional), green tea',
 'Brown rice, dal, mixed vegetable curry, cucumber salad, buttermilk',
 '2 multigrain rotis, palak paneer, bottle gourd curry, dal soup',
 'Sugar, white bread, fried foods, processed snacks, sugary beverages, full-fat dairy'),

(1, '18-40', 'NONVEG', 
 'Egg white omelette with vegetables, whole wheat toast, green tea',
 'Grilled chicken breast, brown rice, steamed vegetables, salad',
 'Baked fish, quinoa, roasted vegetables, clear soup',
 'Sugar, white bread, fried foods, processed meats, sugary beverages, full-fat dairy'),

(1, '40-60', 'VEG', 
 'Sprouts salad with lemon, 1 small bowl poha, herbal tea',
 'Brown rice, mixed dal, seasonal vegetables, curd, salad',
 '2 jowar/bajra rotis, lauki curry, methi dal, vegetable soup',
 'Sugar, refined flour, fried foods, packaged snacks, carbonated drinks, excess salt'),

(2, '18-40', 'VEG', 
 'Oats with flaxseeds, 1 banana, low-fat milk',
 'Brown rice, rajma, cucumber raita, beetroot salad',
 '2 rotis, ridge gourd curry, moong dal, warm milk',
 'Salt, processed foods, canned foods, pickles, excess oil, alcohol, caffeine'),

(2, '40-60', 'NONVEG', 
 'Boiled eggs, whole grain toast, fresh orange juice',
 'Grilled fish, brown rice, spinach, carrot salad',
 'Chicken soup, multigrain bread, steamed broccoli',
 'Salt, processed meats, canned soups, chips, alcohol, high-sodium foods'),

(6, '18-40', 'VEG', 
 'Vegetable poha, green tea, 1 apple',
 'Brown rice, dal, large portion of salad, buttermilk',
 '2 rotis, mixed vegetable curry, clear soup, cucumber slices',
 'Fried foods, sweets, processed snacks, sugary drinks, white bread, high-calorie foods'),

(6, '18-40', 'NONVEG', 
 'Egg whites, grilled vegetables, herbal tea',
 'Grilled chicken, quinoa, large green salad',
 'Fish curry, 1 small roti, steamed vegetables',
 'Fried foods, sweets, processed meats, sugary drinks, white rice, high-fat dairy'),

(7, 'All Ages', 'VEG', 
 'Oatmeal with nuts, chamomile tea, fresh fruits',
 'Brown rice, dal, steamed vegetables, curd',
 'Khichdi with vegetables, buttermilk, warm milk with turmeric',
 'Caffeine, alcohol, processed foods, excess sugar, fried foods, spicy foods'),

(8, 'All Ages', 'VEG', 
 'Warm milk with turmeric, 2 small bananas, almonds',
 'Brown rice, light dal, steamed vegetables, curd',
 'Khichdi, buttermilk, warm milk with nutmeg',
 'Caffeine, heavy meals, spicy food, alcohol, chocolate, large amounts of liquids before bed'),

(9, 'All Ages', 'VEG', 
 'Papaya, soaked raisins, warm water with lemon',
 'Brown rice, moong dal, steamed vegetables, buttermilk',
 '2 rotis, bottle gourd curry, dal soup, warm water',
 'Spicy food, fried foods, processed foods, excess dairy, carbonated drinks, alcohol');

-- Educational Ayurvedic content only. This seed deliberately avoids prescribing herbs or home remedies.
-- Herbal products can cause adverse effects and interact with medicines; consult a qualified clinician.
INSERT INTO ayurvedic_solutions (disease_id, herbs, home_remedy, lifestyle_changes) VALUES
(1, 'Educational overview only. No herb is recommended as a diabetes treatment by this seed.', 'Do not use home remedies to replace prescribed diabetes care. Discuss supplements with a qualified clinician.', 'Follow an individualized care plan from a qualified healthcare professional.'),
(2, 'Educational overview only. No herb is recommended as a blood-pressure treatment by this seed.', 'Do not use home remedies to replace blood-pressure monitoring or prescribed treatment.', 'Follow a clinician-approved plan for monitoring, nutrition, activity and prescribed treatment.'),
(3, 'Educational overview only. No herb is recommended as a heart-disease treatment by this seed.', 'Herbal products are not emergency care and may interact with heart medicines.', 'Follow your clinician-approved heart-health plan and seek urgent care for possible emergency symptoms.'),
(4, 'Educational overview only. No herb is recommended as an asthma treatment by this seed.', 'Do not replace prescribed inhalers or an asthma action plan with herbal remedies.', 'Follow the asthma action plan provided by a qualified healthcare professional.'),
(5, 'Educational overview only. No herb is recommended as an arthritis treatment by this seed.', 'Discuss any topical or oral herbal product with a qualified clinician or pharmacist before use.', 'Choose activity and joint-care options with a healthcare professional based on your individual needs.'),
(6, 'Educational overview only. No herb is recommended as an obesity treatment by this seed.', 'Avoid unverified weight-loss products and consult a qualified healthcare professional for personalized advice.', 'Seek supportive, sustainable nutrition and activity guidance appropriate to your circumstances.'),
(7, 'Educational overview only. No herb is recommended as a mental-health treatment by this seed.', 'Do not stop prescribed treatment or rely on supplements without discussing them with a qualified clinician.', 'Consider evidence-based support and consult a qualified mental-health professional when needed.'),
(8, 'Educational overview only. No herb is recommended as an insomnia treatment by this seed.', 'Discuss supplements or sleep products with a qualified clinician, especially if taking medication.', 'A clinician can help assess persistent sleep difficulties and discuss evidence-based options.'),
(9, 'Educational overview only. No herb is recommended as a digestive-disorder treatment by this seed.', 'Persistent, severe or worsening digestive symptoms need professional assessment; avoid unverified remedies.', 'Seek individualized guidance for ongoing symptoms, dietary needs or possible food intolerances.'),
(10, 'Educational overview only. No herb is recommended as a cold or flu treatment by this seed.', 'Do not use herbal remedies as a substitute for professional care when symptoms are severe or worsening.', 'Follow public-health guidance and consult a qualified healthcare professional if concerned.');
