## Collaborative Online Judge System
This is a project to implement a web-based collaborative code editor which supports multiple users editing simultaneously.  
I designed a single-page web application for coding, running, and compiling problems.  
To refactored and improved system throughput, I used decoupling services based on RESTful API and loaded balancing by Nginx. 

## Tech Stack
Frontend: Angular2 + TypeScript + Bootstrap + Auth0 + ACE  
Backend: Socket.io + Express + MongoDB + Redis + Python + Flask + AWS + Nginx + PM2

## Project Architecture
<img src="/assets/project-architecture.png" width="500">

## Demo 
#### Before sign-in
![image1](/assets/sign-in.png)
#### After authentication
![image2](/assets/managePro.png)
#### Code excutor 
![image3](/assets/problem-details.png)
