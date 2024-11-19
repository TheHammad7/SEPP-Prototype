module Assignment3 {
    requires javafx.base;
    requires javafx.graphics;
    requires java.sql.rowset;
    requires javafx.controls;
    requires org.postgresql.jdbc;
    opens Prototype to javafx.fxml;
exports Prototype;}
