# Code-Clicker

A simple web-based clicker game that allows users to create accounts and save their progress securely in the cloud.


## Deployment

### Client

1. Navigate to the `client` directory:

```
cd client
```

2. Install dependencies and start the frontend application:

```
npm install
npm run dev
```

### Server

1. Navigate to the `server` directory:

```
cd server
```

2. Set up your python virtual enviroment

3. Install the required packages:

```
pip install -r requirements.txt
```

3. Initialize the database:

```
flask db init
flask db migrate
flask db upgrade
```

4. Run the backend:

```
python3 run.py
```


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Flask