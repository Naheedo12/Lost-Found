# Lost & Found - Web Application

## Table of Contents
- [Project Overview](#project-overview)
- [User Stories](#user-stories)
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [UML Diagrams](#uml-diagrams)

---

## Project Overview
**Lost & Found** is a **Full Stack web application** developed with **Laravel (Backend)** and **React (Frontend)**, designed to manage lost and found items.  
It allows users to declare lost or found objects, consult existing declarations, and for administrators to manage all declarations.

---

## User Stories

### User
1. **Register** – Create an account with role `user`
2. **Login** – Authenticate and access the app
3. **Logout** – End the session
4. **View All Objects** – See all lost/found objects (public, no login required)
5. **Filter Objects** – Filter objects by type (Lost/Found) and location
6. **View My Declarations** – See only my own declarations
7. **Declare Object** – Add a new lost/found item with title, description, type, location, date, and image
8. **Update My Declaration** – Modify my own objects
9. **Delete My Declaration** – Remove my own objects
10. **Mark My Object as Resolved** – Change status from `IN_PROGRESS` to `RESOLVED` 

### Admin
1. **Login / Logout**
2. **Manage All Declarations** – CRUD for all objects (inherit all User actions)
3. **Update Any Declaration** – Modify any object
4. **Delete Any Declaration** – Remove duplicates or incorrect objects
5. **Manage Object Status** – Change status of any object

---

## Functionalities

- **Public Access**
  - View and filter objects without login
- **User Role**
  - CRUD on their own objects
  - View and filter objects
  - Upload images (Cloudinary)
- **Admin Role**
  - Full control over all objects
  - Update or delete any declaration
  - Manage status of any object
  - Inherits all User capabilities

---

## Technologies

- **Backend:** Laravel, MySQL  
- **Frontend:** React, TailwindCSS, React Router, Axios  
- **Authentication:** Laravel Sanctum
- **Image Upload:** Cloudinary  
- **State Management:** useContext, useState, useEffect  
- **Testing:** PHPUnit (backend)  
- **Containerization:** Docker, docker-compose  

---

## UML Diagrams

- **Class Diagram:** [View Class Diagram on Lucidchart](https://lucid.app/lucidchart/b3f8614f-da06-4edd-8f7a-6db5a90d0107/edit?viewport_loc=-222%2C-216%2C4200%2C2021%2C0_0&invitationId=inv_49992d4d-2f30-4489-b9e6-d91fc2d40adf)  
- **Use Case Diagram:** [View Use Case Diagram on Lucidchart](https://lucid.app/lucidchart/b3f8614f-da06-4edd-8f7a-6db5a90d0107/edit?viewport_loc=-1141%2C-2447%2C3370%2C1621%2CiHRnoflaPjE_&invitationId=inv_49992d4d-2f30-4489-b9e6-d91fc2d40adf)  
