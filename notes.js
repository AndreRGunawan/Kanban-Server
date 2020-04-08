/*
BASIC REQUIREMENT:

1. API Documentation : URL, HTTP Method, Request, Response(success & error)
2. Routes sesuai standard REST API
3. CRUD endpoints untuk Task, di mana minimal inputnya adalah..
    - Title
    - Task
4. Register dan login
5. Buat authorization sehingga user hanya bisa melakukan CRUD terhadap task-nya sendiri
6. Social Login (Google/Twitter/Facebook/Github)
7. No Alert
8. Deploy ke Heroku + Firebase Hosting

ROCKET : REAL TIME WITH SOCKET.IO

KOMPETENSI BACKEND:
- REST API
- API DOCUMENTATION
- AUTH
- PG + SEQUELIZE

CLIENT:
- VUE.JS
- SPA

DEADLINE:
JUMAT JAM 23:15


--------------------------------------------------------------------
Model:
- Users (Many to Many)
- Tasks (Many to Many)

--------------------------------------------------------------------
TASK Model Attributes:

1. (Minimum) Title
2. (Minimum) Category ( Pre-log, To-do, On-going, Finished )
3. (Minimum) UserId(Supaya bisa cek itu id punya siapa menggunakan authentication id)

(EXTRA)
4. (Extra) Tags
5. (Extra) Description
6. (Extra) Due_date

(STRETCH)

USER Model Attributes:

1. (Minimum) Email
2. (Minimum) Password
3. (Minimum) Role

One to Many, Many to One

*/