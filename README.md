# News Aggregator API
 
This is a News Aggregator API built with Node.js and Express.js. It allows users to register, log in, set their preferences, and fetch news articles based on their preferences. Users can also mark news articles as read or favorite them. An external news api has been used to fetch the news articles.

## Endpoints
 
### User Endpoints
 
- **POST** `/users/signup`  
  Register a new user.
  - **Request Body:**
    ```json
    { 
      "name" : "your_name",
      "email": "your_email",
      "password": "your_password",
       "preferences": ["trump" ,                          "tesla"]
    }
    ```
  - **Response:**
    ```json
    {
      "message": "user registered successfully!"
    }
    ```
 
- **POST** `/users/login`  
  Log in to get a token.
  - **Request Body:**
    ```json
    {
      "email": "your_email",
      "password": "your_password"
    }
    ```
  - **Response:**
    ```json
    {
        "message": "Authencation Success",
        "token": "your_token"
    }
    ```
 
- **PUT** `/users/preferences`  
  Update user preferences.

  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Request Body:**
    ```json
    {
      "preferences": ["trump" , "tesla"]
    }
    ```
  - **Response:**
    ```json
    {
      "message": "preferences updated!"
    }   
    ```
 
- **GET** `/users/preferences`  
  Get user preferences.
  
  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "preferences": [
            "crime",
            "tesla"
        ]
    }
    ```
 
### News Endpoints
 
- **GET** `/news`  
  Fetch news based on user preferences.
  
  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "news": [
            {
                "id": "361c9a779a6685f915f2d322b073c7d4",
                "author": "Andrew J. Hawkins",
                "title": "By endorsing Trump, Elon Musk is gambling with Tesla’s future",
                "url": "https://www.theverge.com/2024/7/21/24202062/elon-musk-donald-trump-endorsement-tesla-ev-tax-credit"
            },
            {
                "id": "df03d0949f3ceeb5390f74a9eaf97595",
                "author": "Andrew J. Hawkins",
                "title": "Elon Musk is not answering the most important questions about the Tesla robotaxi",
                "url": "https://www.theverge.com/2024/7/23/24204794/tesla-robotaxi-elon-musk-earnings-fmvss-steering-wheel"
            }
        ]
    }
    ```
 
- **POST** `/:id/read`  
  Mark news as read based on the ID.

  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "message": "marked as read!"
    }
    ```
 
- **POST** `/:id/favorite`  
  Mark news as favorite based on the ID.

  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "message": "marked as favorite!"
    }
    ```
 
- **GET** `/read`  
  Fetch all the news marked as read.

  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "news": [
            {
                "id": "7657e3ebcba19ef7a5694819c8df13ed",
                "author": "Jennifer Ouellette",
                "title": "Teaser for Hellboy: The Crooked Man brings the low-budget horror vibes",
                "url": "https://arstechnica.com/culture/2024/07/teaser-for-hellboy-the-crooked-man-brings-the-low-budget-horror-vibes/"
            }
        ]
    }
    ```
 
- **GET** `/favorites`  
  Fetch all the news marked as favorite.

  - **Request Header:**
    ```plaintext
    Authorization : Bearer your_jwt_token
    ```
  
  - **Response:**
    ```json
    {
        "news": [
            {
                "id": "847b228e9f1fb412317efcfdbb79cd18",
                "author": "David Pierce",
                "title": "In search of the perfect movie recommendation",
                "url": "https://www.theverge.com/2024/7/28/24206171/ai-movie-recommendations-chatgpt-vergecast"
            }
        ]
    }
    ```

  
 
## Setup and Installation
 
1. Clone the repository:
    ```sh
    git clone https://github.com/beingsatyam/news_aggregator.git
    ```
2. Navigate to project directory:
    ```sh
    cd news_aggregator
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file and add your environment variables:
    ```plaintext
    PORT=3000
    JWT_SECRET=your_jwt_secret
    NEWS_API_KEY=your_news_api_key
    ```
5. Start the server:
    ```sh
    node app.js
    ```
 
## Notes on News Fetching
 This API uses [newsapi.org](https://newsapi.org) to fetch news details. To reduce the no of external calls, the response is cached and updated every hour to keep the data relatively fresh. 

 

 
