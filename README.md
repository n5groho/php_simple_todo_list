php_simpletodolist - A simple todo list

- [INSTALLATION](#installation)
- [DEMO](#demo)

# INSTALLATION
1. Place folder to localhost www directory.
2. Create MySQL database for use.
3. Create table using query from table.sql

        CREATE TABLE tasks(
        id SMALLINT NOT NULL AUTO_INCREMENT,
        name VARCHAR(64) NOT NULL,
        status VARCHAR(32) NOT NULL,
        PRIMARY KEY (id)
        );
        
4. Connect to database by passing your database details to login.php

        <?php
        $db_hostname = 'localhost';
        $db_database = 'yourdatabase';
        $db_username = 'yourusername';
        $db_password = 'yourpassword';
        ?>

# DEMO
You can try the demo at https://codepen.io/n5groho/full/aWeLzO/
