-- WellSpring Seed Data
-- Preventive Health Intelligence Platform

-- Admin User (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@wellspring.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqQzBZN0UfGNEKjN.KDG1QPNKCz9a', 'ADMIN');

-- Demo User (password: user123)
INSERT INTO users (name, email, password, role) VALUES 
('Demo User', 'user@wellspring.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqQzBZN0UfGNEKjN.KDG1QPNKCz9a', 'USER');

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

-- Medicinal Plants Data
INSERT INTO medicinal_plants (plant_name, scientific_name, uses, image_url) VALUES
('Tulsi (Holy Basil)', 
 'Ocimum sanctum', 
 'Boosts immunity, reduces stress, treats respiratory disorders, improves digestion, supports heart health, has anti-inflammatory properties. Used in treating cough, cold, fever, and skin diseases.',
 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400'),

('Neem', 
 'Azadirachta indica', 
 'Purifies blood, treats skin disorders, has antibacterial properties, supports dental health, controls diabetes, boosts immunity. Used in treating acne, eczema, and fungal infections.',
 'https://images.unsplash.com/photo-1605112442948-7fd0f0e5c9c1?w=400'),

('Ashwagandha', 
 'Withania somnifera', 
 'Reduces stress and anxiety, improves brain function, lowers cortisol levels, boosts testosterone, increases muscle mass, reduces inflammation, lowers cholesterol.',
 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400'),

('Aloe Vera', 
 'Aloe barbadensis miller', 
 'Heals wounds and burns, improves digestive health, promotes skin health, reduces dental plaque, manages blood sugar, has antioxidant properties.',
 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),

('Turmeric', 
 'Curcuma longa', 
 'Powerful anti-inflammatory, antioxidant properties, improves brain function, lowers heart disease risk, helps prevent cancer, eases arthritis symptoms, delays aging.',
 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'),

('Ginger', 
 'Zingiber officinale', 
 'Treats nausea and morning sickness, reduces muscle pain, lowers blood sugar, treats chronic indigestion, reduces menstrual pain, lowers cholesterol, has anti-cancer properties.',
 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'),

('Giloy', 
 'Tinospora cordifolia', 
 'Boosts immunity, treats chronic fever, improves digestion, treats diabetes, reduces stress, fights respiratory problems, treats arthritis, improves vision.',
 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),

('Brahmi', 
 'Bacopa monnieri', 
 'Improves memory and brain function, reduces anxiety and stress, treats ADHD symptoms, prevents age-related cognitive decline, has antioxidant properties, reduces inflammation.',
 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400'),

('Moringa', 
 'Moringa oleifera', 
 'Highly nutritious, rich in antioxidants, lowers blood sugar, reduces inflammation, lowers cholesterol, protects against arsenic toxicity, supports brain health.',
 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400'),

('Peppermint', 
 'Mentha piperita', 
 'Relieves digestive issues, treats headaches, freshens breath, relieves clogged airways, improves energy, reduces menstrual cramps, fights bacterial infections.',
 'https://images.unsplash.com/photo-1628556270448-4d4e6a4d57c1?w=400');

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

-- Ayurvedic Solutions Data
INSERT INTO ayurvedic_solutions (disease_id, herbs, home_remedy, lifestyle_changes) VALUES
(1, 
 'Gurmar (Gymnema sylvestre), Jamun (Syzygium cumini), Methi (Fenugreek), Neem, Tulsi, Amla, Vijaysar',
 'Drink methi water soaked overnight on empty stomach. Consume jamun seeds powder (1 tsp) with warm water. Drink bitter gourd juice every morning.',
 'Wake up early (Brahma muhurta), practice yoga asanas like Vajrasana after meals, avoid daytime sleeping, regular exercise, stress management through meditation.'),

(2, 
 'Arjuna (Terminalia arjuna), Ashwagandha, Brahmi, Sarpagandha, Jatamansi',
 'Mix 1 tsp of Arjuna bark powder with warm water and honey, consume twice daily. Drink hibiscus tea. Take ashwagandha powder with milk before bed.',
 'Regular pranayama (especially Anulom Vilom), avoid anger and stress, maintain regular sleep schedule, reduce salt intake, practice meditation daily.'),

(3, 
 'Arjuna, Pushkarmool (Inula racemosa), Garlic (Lasuna), Ginger, Turmeric',
 'Consume 2-3 garlic cloves raw on empty stomach. Drink ginger-turmeric tea twice daily. Take Arjuna powder with honey and warm water.',
 'Regular light exercise like walking, avoid heavy meals, quit smoking completely, practice yoga asanas like Tadasana, Bhujangasana, manage stress levels.'),

(4, 
 'Vasaka (Adhatoda vasica), Kantakari (Solanum xanthocarpum), Haridra (Turmeric), Tulsi, Pippali',
 'Drink tulsi tea with ginger and honey. Inhale steam with eucalyptus oil. Consume turmeric milk before bed. Take licorice (mulethi) decoction.',
 'Avoid cold and damp environments, practice breathing exercises (Pranayama), avoid exposure to allergens, maintain clean living space, regular light exercise.'),

(5, 
 'Shallaki (Boswellia serrata), Guggulu, Ashwagandha, Nirgundi (Vitex negundo), Eranda (Castor)',
 'Apply warm castor oil on affected joints. Consume turmeric with warm milk twice daily. Massage with sesame oil mixed with camphor.',
 'Regular gentle exercise like swimming, avoid cold and damp weather, maintain healthy weight, practice yoga asanas suitable for arthritis, hot water fomentation.'),

(6, 
 'Guggulu, Triphala, Vidanga (Embelia ribes), Musta (Cyperus rotundus), Ginger',
 'Drink warm water with lemon and honey on empty stomach. Consume triphala powder with warm water before bed. Drink ginger tea after meals.',
 'Eat only when hungry, avoid overeating, regular exercise (brisk walking), avoid daytime sleeping, practice yoga asanas like Surya Namaskar, eat early dinner.'),

(7, 
 'Brahmi, Ashwagandha, Jatamansi (Nardostachys jatamansi), Shankhpushpi, Vacha (Acorus calamus)',
 'Drink brahmi tea with honey. Massage head with warm sesame oil before bed. Take ashwagandha powder with warm milk. Practice Nasya with brahmi ghee.',
 'Regular meditation practice, adequate sleep (7-8 hours), avoid overthinking, practice Pranayama (Bhramari, Anulom Vilom), spend time in nature, digital detox.'),

(8, 
 'Tagara (Valeriana wallichii), Ashwagandha, Jatamansi, Shankhpushpi, Brahmi, Sarpagandha',
 'Drink warm milk with nutmeg powder before bed. Massage feet with warm sesame oil. Take ashwagandha with milk at night. Drink chamomile tea.',
 'Maintain regular sleep schedule, avoid daytime napping, create dark and quiet sleep environment, avoid screens 1 hour before bed, practice Yoga Nidra, light dinner.'),

(9, 
 'Triphala, Ginger, Pippali (Long pepper), Ajwain (Carom seeds), Hing (Asafoetida), Jeera (Cumin)',
 'Drink ginger-ajwain water throughout the day. Consume triphala churna with warm water before bed. Drink buttermilk with roasted cumin after meals.',
 'Eat meals at regular times, avoid overeating, chew food properly, take short walk after meals, avoid lying down immediately after eating, practice Vajrasana after meals.'),

(10, 
 'Tulsi, Ginger, Pippali, Yashtimadhu (Licorice), Haridra, Vasa (Adhatoda vasica)',
 'Drink tulsi-ginger tea with honey 3-4 times daily. Gargle with warm salt water with turmeric. Inhale steam with eucalyptus oil. Consume honey with black pepper.',
 'Rest adequately, stay warm, avoid cold foods and drinks, drink plenty of warm fluids, avoid strenuous exercise, practice Pranayama once recovered.');
