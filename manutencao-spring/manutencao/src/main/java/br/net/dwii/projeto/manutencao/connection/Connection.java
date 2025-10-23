package br.net.dwii.projeto.manutencao.connection;

import java.sql.DriverManager;
import java.sql.SQLException;

public class Connection {
    private static final String url = "jdbc:mysql://localhost:3306/manutencao_db";
    private static final String user = "root";
    private static final String password = "root";

    private static Connection conn;

    public static Connection getConnection() {

        try {
            if(conn == null) {
                conn = (Connection) DriverManager.getConnection(url, user, password);
                return conn;
            } else {
                return conn;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
