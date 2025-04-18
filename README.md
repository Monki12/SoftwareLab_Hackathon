
Project Title: Online Platform for Local Businesses
Overview: This project focused on developing a user-friendly online platform to empower local vendors in establishing their online presence. The platform enables vendors to showcase and sell their products and services, while providing customers with a seamless experience for browsing, searching, ordering, and providing feedback. The backend is built using Flask (Python), data management is handled by MySQL, and the user interface features a clean and responsive design using TypeScript and React components.
Main Objectives:
Enable local vendors to showcase and sell products/services online.
Allow customers to browse, search, order, and provide feedback.
Utilize MySQL with joins, subqueries, and triggers for efficient data management.
Incorporate UX sketches and a detailed explanation of database integration.
Address real-world challenges such as vendor visibility and order management.

Tech Stack:
Frontend: TypeScript, React Components
Backend: Flask (Python)
Database: MySQL

Databases Used:
VENDOR TABLE: (Primary Key: vendor_id) - Stores vendor information.
PRODUCTS TABLE: (Primary Key: PROD_ID, Foreign Key: VENDOR_ID) - Stores product details, linked to the respective vendor.
CUSTOMERS TABLE: (Primary Key: CID) - Stores customer information.
ORDERS TABLE: (Primary Key: ORDER_ID, Foreign Key: CID) - Tracks customer orders.
ORDER_DETAILS TABLE: (Primary Key: DET_ID, Foreign Keys: ORDER_ID, CID, PROD_ID) - Details individual items within an order.
FEEDBACK TABLE: (Primary Key: FEEDBACK_ID, Foreign Key: CID) - Stores customer reviews and ratings.

Developed By (GROUP 21):
This project was collaboratively developed by: 
Uma Mukherjee (BT23CSE002)
Bhumika Nilesh Ujjainkar (BT23CSE006)
Niharika Suresh (BT23CSE007)
Ankita Vishal Bagal (BT23CSE012)
Nidhi Paresh Lodha (BT23CSE118)





