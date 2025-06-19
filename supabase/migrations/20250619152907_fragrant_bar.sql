/*
  # Seed Initial Portfolio Data

  1. Insert sample projects
  2. Insert certifications and education
  3. Insert work experiences
  4. Insert skill categories
  5. Insert personal information
*/

-- Insert sample projects
INSERT INTO projects (title, description, challenge, solution, impact, technologies, category, live_url, video_url) VALUES
(
  'Executive Sales Intelligence Dashboard',
  'Interactive Power BI dashboard providing executive insights on sales trends, store performance, and inventory management across 200+ retail locations.',
  'Fortune 500 retailer needed real-time sales performance visibility across 200+ stores',
  'Developed interactive Power BI dashboard integrating multiple data sources with advanced DAX measures to provide executive insights on sales trends, store performance, and inventory management.',
  '32% reduction in reporting time, $1.2M identified in revenue opportunities, and improved decision-making across regional management teams.',
  ARRAY['Power BI', 'SQL', 'DAX', 'Azure Data Factory'],
  'Power BI',
  'https://app.powerbi.com/links/sample-executive-dashboard',
  NULL
),
(
  'Customer Churn Prediction Model',
  'Machine learning model predicting customer churn 60 days in advance using random forest algorithm with 24% reduction in churn rate.',
  'Financial services company experiencing unexpected customer attrition',
  'Developed ML model predicting likely churners 60 days in advance using random forest algorithm with feature engineering on transactional and demographic data points.',
  '24% reduction in churn rate, $850K annual savings in retention costs, and improved customer satisfaction metrics across targeted segments.',
  ARRAY['Python', 'scikit-learn', 'Azure ML', 'SQL'],
  'Machine Learning',
  NULL,
  'https://www.example.com/demos/churn-prediction'
),
(
  'Healthcare Claims ETL Pipeline',
  'Automated ETL pipeline with data quality frameworks integrating 12 healthcare systems, reducing claim processing time from 72 hours to 4 hours.',
  'Healthcare provider struggling with data integration from 12 systems',
  'Designed automated ETL pipeline with validation rules and data quality frameworks to standardize inputs from disparate healthcare systems.',
  '95% reduction in manual data processing, 99.8% data accuracy achievement, and reduced claim processing time from 72 hours to 4 hours.',
  ARRAY['Azure Data Factory', 'SQL', 'Python', 'Power BI'],
  'Data Engineering',
  NULL,
  'https://www.example.com/demos/healthcare-pipeline'
);

-- Insert certifications and education
INSERT INTO certifications (title, organization, date, skills, is_education) VALUES
(
  'Bachelor''s in Computer Science',
  'Hilcoe School',
  '2019',
  ARRAY['Data Structures', 'Algorithms', 'Database Systems'],
  true
),
(
  'IBM Certified Data Scientist',
  'IBM',
  'November 2022',
  ARRAY['Machine Learning', 'Statistical Analysis', 'Python'],
  false
),
(
  '365 Data Science Certified Data Scientist',
  '365 Data Science',
  'August 2022',
  ARRAY['Data Analysis', 'Visualization', 'Statistical Modeling'],
  false
),
(
  '365 Data Science Certified Data Analyst',
  '365 Data Science',
  'May 2022',
  ARRAY['SQL', 'Data Visualization', 'Business Intelligence'],
  false
),
(
  'PwC Power BI Job Simulation',
  'PwC/Forage',
  'March 2022',
  ARRAY['Dashboard Development', 'Data Transformation', 'DAX'],
  false
),
(
  'Microsoft Power BI Specialist',
  'Microsoft',
  'January 2022',
  ARRAY['Power BI', 'Data Modeling', 'DAX Functions'],
  false
),
(
  'SQL Advanced Certification',
  'DataCamp',
  'December 2021',
  ARRAY['Complex Queries', 'Database Design', 'Optimization'],
  false
);

-- Insert work experiences
INSERT INTO experiences (title, company, period, location, description, responsibilities, technologies, achievements) VALUES
(
  'Data Scientist',
  'CodePoint Creatives',
  'June 2023 - Present',
  'Addis Ababa, Ethiopia',
  'Developed & deployed ML models for predictive analytics, focusing on feature engineering, model selection & evaluation',
  ARRAY[
    'Developed & deployed ML models for predictive analytics, focusing on feature engineering, model selection & evaluation',
    'Engineered & optimized ETL pipelines on Azure, improving data accessibility & quality for large-scale analytics',
    'Conducted EDA to identify trends & patterns, delivering key insights to C-suite executives',
    'Designed scalable data warehousing solutions & data models on Azure for complex reporting & role-based access',
    'Established data governance strategies & validation protocols ensuring data security, accuracy & compliance',
    'Developed high-impact Power BI dashboards for C-suite, visualizing KPIs (sales, quality, training, project management)'
  ],
  ARRAY['Python', 'Azure', 'SQL', 'Power BI', 'Machine Learning', 'ETL', 'Data Governance'],
  ARRAY[
    'Improved data accessibility and quality for large-scale analytics',
    'Delivered key insights to C-suite executives through comprehensive EDA',
    'Established data governance frameworks ensuring security and compliance'
  ]
),
(
  'Data Science Intern',
  'Afronex Tech Hub',
  'April 2024 - May 2024',
  'Addis Ababa, Ethiopia',
  'Enhanced analytical skills and applied machine learning techniques to real-world projects, gaining practical experience in data modeling and analysis',
  ARRAY[
    'Enhanced analytical skills and applied machine learning techniques to real-world projects',
    'Gained practical experience in data modeling and analysis during internship period',
    'Applied advanced statistical methods to solve complex business challenges',
    'Collaborated with senior data scientists on impactful data-driven solutions'
  ],
  ARRAY['Python', 'Machine Learning', 'Data Modeling', 'Statistical Analysis', 'Data Analytics'],
  ARRAY[
    'Successfully completed comprehensive data science internship program',
    'Gained hands-on experience with advanced analytical techniques',
    'Applied machine learning to solve real-world business problems'
  ]
),
(
  'Machine Learning Intern',
  'SYNC INTERN''S',
  'November 2023 - December 2023',
  'Remote',
  'Worked on diverse machine learning projects, applying AI techniques to solve real-world problems and enhance technological solutions',
  ARRAY[
    'ChatBot Creation: Developed a conversational AI with a focus on creating engaging and intelligent interactions, enhancing user experience with witty and insightful responses',
    'Real-Time Face Mask Detection: Leveraged AI to build a model that accurately detects face mask usage in real-time, contributing to improved health protocols and awareness',
    'Boston House Price Predictions: Conducted data analysis and modeling to predict real estate price trends using the Boston Housing dataset, providing valuable insights into the housing market',
    'Sign Language Classification: Designed an AI model to classify sign language gestures, facilitating better communication and inclusivity for individuals with hearing impairments'
  ],
  ARRAY['Python', 'NLP', 'Computer Vision', 'Deep Learning', 'TensorFlow', 'OpenCV', 'AI/ML'],
  ARRAY[
    'Successfully delivered 4 diverse ML projects within 2-month timeframe',
    'Enhanced user experience through intelligent conversational AI development',
    'Contributed to improved health protocols with real-time detection systems',
    'Facilitated better communication and inclusivity through sign language classification'
  ]
),
(
  'Power BI Job Simulation',
  'PwC',
  'September 2024 - September 2024',
  'Remote',
  'Developed Power BI dashboards to effectively convey KPIs, enhancing data-driven decision-making',
  ARRAY[
    'Developed Power BI dashboards to effectively convey KPIs, enhancing data-driven decision-making',
    'Analyzed HR data, focusing on gender-related KPIs, and provided actionable insights to address gender balance issues'
  ],
  ARRAY['Power BI', 'Data Visualization', 'HR Analytics', 'KPI Development'],
  ARRAY[
    'Enhanced data-driven decision-making through effective KPI visualization',
    'Provided actionable insights to address organizational gender balance issues'
  ]
);

-- Insert skill categories
INSERT INTO skill_categories (title, icon, skills) VALUES
(
  'Data Analysis',
  '📊',
  '[
    {"name": "Power BI Dashboard Development", "percentage": 95},
    {"name": "Exploratory Data Analysis", "percentage": 90},
    {"name": "KPI Tracking Systems", "percentage": 92},
    {"name": "Executive-Level Reporting", "percentage": 88}
  ]'::jsonb
),
(
  'Data Science',
  '🧠',
  '[
    {"name": "Machine Learning Model Development", "percentage": 85},
    {"name": "Predictive Analytics", "percentage": 88},
    {"name": "Feature Engineering", "percentage": 82},
    {"name": "Statistical Analysis", "percentage": 90}
  ]'::jsonb
),
(
  'Data Engineering',
  '⚙️',
  '[
    {"name": "ETL Pipeline Optimization", "percentage": 87},
    {"name": "Data Warehousing on Azure", "percentage": 84},
    {"name": "Data Governance and Validation", "percentage": 80},
    {"name": "Database Design & Management", "percentage": 83}
  ]'::jsonb
),
(
  'Programming',
  '💻',
  '[
    {"name": "Python", "percentage": 92},
    {"name": "SQL", "percentage": 95},
    {"name": "R", "percentage": 78},
    {"name": "DAX", "percentage": 90},
    {"name": "JavaScript", "percentage": 75}
  ]'::jsonb
);

-- Insert personal information
INSERT INTO personal_info (name, title, email, phone, location, profile_image, bio, resume, social, about_description) VALUES
(
  'Simon Asnake',
  'Data Scientist & Power BI Expert',
  'simon.asnake@example.com',
  '+251 911 123 456',
  'Addis Ababa, Ethiopia',
  '/placeholder.svg',
  'Passionate data scientist specializing in machine learning, business intelligence, and data-driven solutions. Expert in Power BI development and advanced analytics.',
  '/simon-asnake-resume.pdf',
  '{"linkedin": "https://linkedin.com/in/simon-asnake", "github": "https://github.com/simon-asnake", "twitter": "https://twitter.com/simon_asnake"}'::jsonb,
  'I am a data scientist with extensive experience in developing machine learning models, creating interactive dashboards, and driving data-driven decision making across various industries.'
);