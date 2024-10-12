
# Task Manager


The Task Manager is a web application developed to allow users to efficiently manage their tasks.
users can add, edit, and delete tasks after logging in.

## Features

### User Authentication:
- Secure login to access tasks.
- Logout functionality to safely end sessions.

### Task Management:
- Add Tasks: Easily create new tasks.
- Edit Tasks: Update descriptions of existing tasks directly within the task list.
- Delete Tasks: Remove tasks that are no longer needed.

### Visual Feedback:
- Confirmation and error messages via toast notifications.
- Loading spinner for asynchronous operations.




## Technologies Used

**Back-end:** Java 17, Spring Boot, Apache Maven, JWT (for user authentication and authorization).

**Front-end:** HTML5, CSS3, JavaScript.

**Database** MySQL Server.

**Tools** IntelliJ IDEA, VsCode, Git , Postman,MySQL Workbench.


## Instalação

### Prerequisites
- Java Development Kit (JDK) 17 or higher installed on your machine.

- Apache Maven version 3.8.6 or higher installed.

- MySQL Server installed and running.

- IntelliJ IDEA installed for backend development.

- Visual Studio Code (VSCode) installed for frontend development.

- Postman installed for API testing.

- Git installed for version control.
### Steps

- Step 1: Clone the Repository
```bash
 $ git clone https://github.com/VitorMoo/Task-Manager-API.git
```

 - Step 2: Navigate to Your Project Directory
  ```bash
cd simple-springboot-api
```

- Step 3: Configure the Database Connection
```bash
vi src/main/resources/application.properties

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/rest_with_tasks?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.show-sql=true
```
- Step 4: Open the Project in IntelliJ IDEA

    From the IntelliJ IDEA welcome screen, click "Open" or go to File > Open.

    Navigate to your cloned project folder simple-springboot-api and open it.

    Import as a Maven Project:
    IntelliJ should automatically detect that this is a Maven project and prompt you to import dependencies. If not, you can manually do this by right-clicking the pom.xml file and selecting "Add as Maven Project".


- Step 5: Build and Run the Application
```bash
mvn clean install
```
- Step 6: Access the Frontend
```bash
cd view
```
  - Open login.html
  - Open Visual Studio Code.
  Install the Live Server extension if you haven't already.
  Right-click on the login.html file inside the view directory.
  Choose "Open with Live Server".
  The frontend should now be running at: http://127.0.0.1:5500/view/login.html.
