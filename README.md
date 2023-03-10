# Senior Final Project

Project title : **`Digital Land Administration and Certificate Authentication System for Yeka Sub City`**
> This project is done with colaboration with [Gedion Getachew](https://github.com/gedion24).
> <br /> Gedion Getachew - Front-end
> <br /> Natnael Bedru (me) - Back-end

## Installation

- [**MySQL Installer - Community**](https://dev.mysql.com/downloads/installer/) [_`Installation Guide Video`_](https://www.youtube.com/watch?v=OM4aZJW_Ojs)
  - [MySQL Server 8.0](https://dev.mysql.com/downloads/mysql/)
  - [MySQL Workbench 8.0 CE](https://dev.mysql.com/downloads/workbench/)
- [**Git**](https://gitforwindows.org/)
- [**Microsoft Visual Studio Code**](https://code.visualstudio.com/)
- Node
  - [Current Release](https://nodejs.org/en/)
  - [_version used on project v16.13.2_](https://nodejs.org/download/release/v16.13.2/)

## Frameworks and Languages

- Typescript
- Javascript
- React
- Node

## How to run the project

- After installing the prequisite programmes hold on to the **`username`** & **`password`** that you used during the MySQL Workbench installation.
  </br>

![Amit Thinks - How to install MySQL 8 0 22 Server and Workbench latest version on Windows 10  OM4aZJW_Ojs - 1038x585 - 4m00s](https://user-images.githubusercontent.com/116979329/221814384-8ebb99b2-40a4-4dac-a5f3-b658415747fd.png)

- Open MySQL Workbench and run the **`mysql.sql`** script located in the **_final project folder_**.
- Open project in Visual Stuido Code

  1. Make sure the project directory in Visual Studio Code is in **`finalproject`** folder.
  2. Open the `.env` file located in the `server` folder.
  3. In the `.env` file make sure the database credentilals are correctly filled according to your MySQL Workbench installation.

     1. `USER=[username]`<br>
        `PASSWORD=[password]`<br>
        `DATABASE=lras_system`<br>
        `DB_PORT=3306`<br>
     2. _Optional SMS API_ <br>
        - Create an account with [Vonage](https://ui.idp.vonage.com/ui/auth/registration?utm_campaign=referral&attribution_campaign=referral&icid=tryitfree_comm-apis_nexmodashbdfreetrialsignup_btn).
        - In the account creation choose SMS API feature.
        - After creating the account successfully go to the vonage dashboard and copy the **`apikey`** , **`apisecret`** & the phone number you used to open the account.
        - And replace with the following <br>
          `VONAGE_APIKEY=[apikey]` <br>
          `VONAGE_APISECRET=[apisecret]` <br>
          `TESTPHONENUMBER=251944075503` <br> _the phone number must have the country code without the `+` sign_

  4. Open two terminals in Visual Studio Code. _(use keyboard shortcut **<code>ctrl + `</code>**)_
     1. On the first terminal run the following
        - **`cd client`**
        - **`npm install`**
     2. On the second terminal run the following
        - **`cd server`**
        - **`npm install`**
  5. On the server and on the client side respectively run **`npm start`**.
  6. To get through the authentication /`sign in`/ page use **`Nati`** as **Username** and **`nati`** as **Password**
