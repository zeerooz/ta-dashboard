# AWS-Hosted Web Application

# Project Overview
This project involves designing and implementing a simple web application using a JavaScript stack, with the goal to perform CRUD (Create, Read, Update, Delete) operations on a chosen dataset. The application is hosted on AWS EC2 instances and utilizes various AWS services including DynamoDB for database storage, S3 for image uploads, and AWS SDK for backend interactions.

# Features
CRUD Operations: Manage data with the ability to create, read, update, and delete entries.
High Availability Architecture: Utilizes multiple EC2 instances across different Availability Zones to ensure service reliability and availability.
AWS DynamoDB: Leverages DynamoDB to store and retrieve data efficiently.
AWS S3 Image Upload: Integrates S3 for storing and managing images associated with data entries.
AWS Lambda: Uses Lambda for image resizing tasks triggered by data creation.
AWS SDK: Employs AWS SDK for JavaScript to interact programmatically with AWS services.

# Technology Stack
Frontend: React.js or AngularJS based on your chosen stack (e.g., MERN or MEAN).
Backend: Node.js with Express.js.
Database: AWS DynamoDB.
Storage: AWS S3 for image uploads.
Server: AWS EC2 instances.
Miscellaneous: AWS SDK for JavaScript, AWS Lambda for serverless operations.

![Image](https://github.com/user-attachments/assets/fa03b485-2903-423f-9fda-7b9ae994ce4d)

note that the AWS account associated with this project has been deleted. Consequently, 
the application and its resources are no longer accessible, 
and the AWS services described herein are not currently operational. 
This documentation remains for archival purposes and historical reference only.


### TA Dashboard - User Profile Feature

The TA Dashboard, part of the web application hosted on AWS, provided a centralized interface specifically designed to assist students by displaying essential information about Teaching Assistants (TAs) at the university. This feature was crucial for enhancing the accessibility of TAs to students, promoting better communication and support in academic activities.

#### Features of the TA Dashboard Profile

The TA Dashboard prominently displayed the following information for each TA:

- **Name and Photo**: Each TA's profile began with their name and a photograph to help students recognize their instructors.
- **Email Address**: A direct email link was provided, ensuring students could easily contact their TAs for academic queries or assistance.
- **Room Number**: It listed the office location of the TA, simplifying the process for students to find where TAs are available for in-person consultations.
- **Department**: The academic department to which the TA belonged was displayed, helping students identify TAs within specific educational disciplines.
- **Courses Taught**: This section listed the courses the TA was involved in, particularly useful for students looking for course-specific help.
- **Office Hours**: Clearly stated office hours informed students of the exact times when TAs were available, facilitating effective planning for visits or meetings.

#### User Interaction

The dashboard included user-friendly interaction elements:
- **Back Button**: Allowed users to return to the previous page, enhancing navigation ease.
- **Edit Button**: Provided TAs with the ability to update their information, ensuring that the data displayed is always current and accurate.

#### Purpose

The primary purpose of the TA Dashboard was to streamline communication between students and their TAs. By providing all necessary contact details and office hours in one accessible location, the dashboard made it simpler for students to connect with their TAs, thus fostering a supportive learning environment. This functionality was especially beneficial for new students and those engaged in larger courses needing frequent TA interaction.

This integration was a part of the larger AWS-hosted web application project, designed to ensure high availability and resilience through AWS services like EC2, DynamoDB, and S3, enhancing the overall user experience by providing reliable and scalable web application solutions.


![Image](https://github.com/user-attachments/assets/65dfdeeb-1675-4065-9b8d-24139196c612)

![Image](https://github.com/user-attachments/assets/08a064f3-03c1-42e5-8db2-dd9ac7427fe4)

![Image](https://github.com/user-attachments/assets/40a81227-3db2-4f02-80cb-06b48f00340b)
