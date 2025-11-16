package br.net.dwii.projeto.manutencao.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
	private static final String url = "jdbc:mysql://localhost:3306/manutencao_db";
	private static final String user = "root";
	private static final String password = "root";    
	
	public static Connection getConnection() {
		try {
			return DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
			
			return null;
		}
	}
}