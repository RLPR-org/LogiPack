package org.rlpr.logipack.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;


public class PostgresConfig {

	public static void initializeDatabase() {

		try {

            //connect to postgres database
			Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/", "postgres", "test1234");
            printInfo("[SUCCESS]  Postgres connection established");
			

            //check if database already exists
			Statement statement = connection.createStatement();
            statement.executeQuery("SELECT count(*) FROM pg_database WHERE datname = 'logipack'");
            ResultSet resultSet = statement.getResultSet();
            resultSet.next();
            int count = resultSet.getInt(1);

            if (count <= 0) {
                statement.executeUpdate("CREATE DATABASE logipack;");
                printInfo("[SUCCESS]  'logipack' database created");
            }
            else
                printInfo("[INFO]  Database already exists");

			connection.close();
            printInfo("[INFO]  Connection closed");
		

		} catch (Exception sQLException) {
			System.out.println(sQLException);
		}
	}

    public static void printInfo(String msg) {
        final String ANSI_BOLD = "\033[0;1m";
        final String ANSI_RESET = "\u001B[0m";
        final String ANSI_PURPLE = "\u001B[35m";

        System.out.println(ANSI_BOLD + ANSI_PURPLE + msg + ANSI_RESET);
    }
    
}
