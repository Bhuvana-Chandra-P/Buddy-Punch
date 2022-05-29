# Buddy Punch

## Submission for Microsoft Engage 2022

A attendance tracking web application.


## Useful Links

- [Deployed Website](https://buddy-punch.herokuapp.com/)
- [Demo Video](https://youtu.be/JJQ4Guq5cno)  
- [Presentation](https://docs.google.com/presentation/d/15vo4ym42YSWgzq_5SIbKsZKSi4Ni2_YY/edit?usp=sharing&ouid=101281162421660809269&rtpof=true&sd=true)  

## Tech Stack

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653636580/readmeImages/tech_yzk1x0.png)


# Demonstration of judging criteria  
## Features  
 

1.SignUp - Student/Faculty

Picture is captured and stored in the db along with other other details.Used cloudinary to store images and microsoft azure face api for face recognition

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191059_ifqmrj.png)

2.Login using using face recognition

JWT token is stored to keep track of the user logged in

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191006_n3spdb.png)

3.Student dashboard

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639544/readmeImages/Screenshot_2022-05-26_212327_caflio.png)

4.Student course details

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640322/readmeImages/Screenshot_2022-05-27_135924_xbwpkp.png)

5.Student request permission

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640322/readmeImages/Screenshot_2022-05-27_135803_wsj2an.png)

6.Login using password

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639540/readmeImages/Screenshot_2022-05-26_210216_dpsn7l.png)

7.Faculty Dashboard

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639542/readmeImages/Screenshot_2022-05-26_210518_ydn4bz.png)

8.Create course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640547/readmeImages/Screenshot_2022-05-27_140537_ccsxag.png)

9.Add students to the course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639543/readmeImages/Screenshot_2022-05-26_210718_n3nyfd.png)

10.Schedule classes in the course

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639542/readmeImages/Screenshot_2022-05-26_210537_mxefcw.png)

11.Take attendance

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659003/readmeImages/Screenshot_2022-05-27_191137_vp0klu.png)

12.Monitor class

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653659004/readmeImages/Screenshot_2022-05-27_191211_mxzqxt.png)

13.Monitor class details

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653640629/readmeImages/Screenshot_2022-05-27_140653_iwj5s6.png)

14.List of permissions submitted

![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653639543/readmeImages/Screenshot_2022-05-26_210640_zqr460.png)

15.Light and dark mode

## Agile methodology
![image](https://res.cloudinary.com/microsoft-engage-2022/image/upload/v1653820188/readmeImages/agile_xvlpk8.png)

### I have also implemented Continuous Integration with GitHub workflow and continuous deployment with heroku ( CI/CD )  

## Points to remember while testing the app

- Allow **permissions** for camera

## Setup

1. `git clone <gitHub repository url>` 
2. `cd Buddy-Punch`
3. Install dependencies

   `npm run server-install`

   `npm run frontend-install`

4. Create a `.env` file

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
 

5. Start the application by
   `npm run dev`

6. The app is now running at http://localhost:3000/
