# STOCKAD-AI: Your Stock Market Copilot

Welcome to **StockADAI**, the ultimate assistant for stock experts. This solution empowers you with intelligent insights, aggregating and caching real-time updates from crypto and forex data sources. With **STOCKADAI**, you can make faster, more informed decisions in your work with stocks.

### MOTHERDUCK SHARED DB
-- Run this snippet to attach database
ATTACH ```'md:_share/my_db/c9abf55d-7ac8-42cd-9730-ab35dcd07eb1';```

### LOOM VIDEO

``` #### Video
1. (https://www.loom.com/share/2320474b7abf4d0cbb4e00b9ebba8acb?sid=ae434aff-1b82-498b-9abc-4fc2bbec05b9)
2. (https://www.loom.com/share/8e41ed00fdff4db3be9955058b026a45?sid=085781b2-7e19-4e43-8050-02adf9f42b46)
```
### Architectural Diagram

![architecture diagram](https://github.com/user-attachments/assets/47fe8790-7fd7-4482-b820-03cbf0bdf28c)

---
# Overview

### Key Features 

- **Real-Time Data Aggregation**:  
  Seamlessly integrates with crypto and forex data sources to provide up-to-date market information.

- **Cached Aggregations**:  
  Optimized for speed and reliability, offering cached data for quick analysis while ensuring periodic updates.

- **Airbyte Integration**:  
  Efficiently synchronizes data into **MotherDuck** for advanced analytics and visualization.

- **AI-Powered Assistance**:  
  Acts as a copilot, providing actionable insights and helping you navigate complex market scenarios.

---

### How It Works


#### Video
[Video demonstration](https://www.loom.com/share/2320474b7abf4d0cbb4e00b9ebba8acb?sid=ae434aff-1b82-498b-9abc-4fc2bbec05b9)


1. **Data Ingestion**:  
   Market data is ingested from multiple crypto and forex sources via **Airbyte connectors**.

2. **Aggregation & Caching**:  
   Data is aggregated and cached in **MotherDuck**, enabling seamless querying and analysis.

3. **Expert Assistance**:  
   AI-driven insights help stock experts analyze trends, identify opportunities, and mitigate risks.

4. **Continuous Updates**:  
   The system ensures your data remains fresh and relevant with regular updates from integrated sources.

---

### Who Is It For?

STOCKADAI is designed for:  
- **Stock Analysts**: Gain deeper insights into market trends.  
- **Traders**: Make faster, data-driven decisions.  
- **Financial Advisors**: Provide clients with accurate and actionable advice.

---

## HOW TO RUN LOCALLY
  1. clone te repo
  2. cd to api and ```pnpm install``` then ```pnpm start```  runs on ```port: 3001```
  3. cd to ui and ```pnpm install``` then ```pnpm dev``` runs on ```port: 3000```
  4. env variables for the api are as follows : 
````
MOTHERDUCK_API_TOKEN=<your_token>
AIRBYTE_CLIENT_ID=<your_client_id>
AIRBYTE_SECRET_ACCESS=<your_secret_access>
COIN_ENVIRONMENT=sandbox
DATABASE_URL=<your_database_url>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
CALLBACK_URL=http://localhost:3001/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<your_jwt_secret>
````
5. alternatively use ```docker build``` and ```docker run```


### #STOCKADAI-MD-Airbyte

Your trusted copilot for the stock market. Let **STOCKADAI** transform your workflow and take your stock expertise to the next level.

**Get started today!**

