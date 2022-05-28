# [Buddy Punch]()

## Submission for Microsoft Engage 2022

A attendance tracking web application.

## Tech Stack

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653636580/readmeImages/tech_yzk1x0.png)

## Useful Links

- [Deployed Website]()
- [Demo Video](https://youtu.be/9u0goJO6SLk)

## Features

1.SignUp - Student/Faculty

Picture is captured and stored in the db along with other other details.Used cloudinary to store images and microsoft azure face api for storing a person in person group and traning the model

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191059_ifqmrj.png)

2.Login using that sign up

JWT token is stored to keep track of the user logged in

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191006_n3spdb.png)

3.Student dashboard

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639544/readmeImages/Screenshot_2022-05-26_212327_caflio.png)

4.Student course details

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640322/readmeImages/Screenshot_2022-05-27_135924_xbwpkp.png)

6.student request for permission

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640322/readmeImages/Screenshot_2022-05-27_135803_wsj2an.png)

7.Login using password

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639540/readmeImages/Screenshot_2022-05-26_210216_dpsn7l.png)

8.Faculty Dashboard

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639542/readmeImages/Screenshot_2022-05-26_210518_ydn4bz.png)

9.Create course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640547/readmeImages/Screenshot_2022-05-27_140537_ccsxag.png)

10.Add students to the course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639543/readmeImages/Screenshot_2022-05-26_210718_n3nyfd.png)

11.Schedule class in course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639542/readmeImages/Screenshot_2022-05-26_210537_mxefcw.png)

12.Take attendance

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191137_vp0klu.png)

13.Monitor class

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659004/readmeImages/Screenshot_2022-05-27_191211_mxzqxt.png)

14.Monitor class details

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640629/readmeImages/Screenshot_2022-05-27_140653_iwj5s6.png)

15.List of permissions submitted

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639543/readmeImages/Screenshot_2022-05-26_210640_zqr460.png)

16.Light and dark mode

## Points to remember while testing the app

- Allow **permissions** for camera

## Instructions

1. `git clone <gitHub repository url>`

2. Install dependencies

   `npm run server-install`

   `npm run frontend-install`

3. Create a `.env` file

   - `cp .env.example .env`
   - Add relevant credentials
   - Contents of the env file  
     DATABASE_URL=  
     TOKEN_SECRET=  
     CLOUDINARY_NAME=  
     CLOUDINARY_API_KEY=  
     CLOUDINARY_API_SECRET=  
     AZURE_URL=  
     AZURE_API_KEY=     
 

4. Start the application by
   `npm run dev`

5. The app is now running at http://localhost:3000/
