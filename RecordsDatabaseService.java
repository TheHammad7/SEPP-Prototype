package a3;

import java.io.*;
//import java.io.OutputStreamWriter;

import java.net.Socket;

import java.sql.*;
import javax.sql.rowset.*;
    //Direct import of the classes CachedRowSet and CachedRowSetImpl will fail becuase
    //these clasess are not exported by the module. Instead, one needs to impor
    //javax.sql.rowset.* as above.



public class RecordsDatabaseService extends Thread{

    private Socket serviceSocket = null;
    private String[] requestStr  = new String[2]; //One slot for artist's name and one for recordshop's name.
    private ResultSet outcome   = null;

	//JDBC connection
    private String USERNAME = Credentials.USERNAME;
    private String PASSWORD = Credentials.PASSWORD;
    private String URL      = Credentials.URL;



    //Class constructor
    public RecordsDatabaseService(Socket aSocket){
		//TO BE COMPLETED
        serviceSocket = aSocket;
        this.start();
    }


    //Retrieve the request from the socket
    public String[] retrieveRequest()
    {
        this.requestStr[0] = ""; //For artist
        this.requestStr[1] = ""; //For recordshop
		
		String tmp = "";
        try {
            //TO BE COMPLETED
			InputStream socketStream = this.serviceSocket.getInputStream();
            InputStreamReader socketReader = new InputStreamReader(socketStream);
            StringBuffer stringBuffer = new StringBuffer();
            char x;
            while (true) //Read until terminator character is found
            {
                x = (char) socketReader.read();
                if (x == '#')
                    break;
                stringBuffer.append(x);
            }
            tmp=stringBuffer.toString();
            String[] parsed = tmp.split(";");
            if (parsed.length == 2){
                this.requestStr[0] = parsed[0];
                this.requestStr[1] = parsed[1];
            }
         }catch(IOException e){
            System.out.println("Service thread " + this.getId() + ": " + e);
        }
        return this.requestStr;
    }


    //Parse the request command and execute the query
    public boolean attendRequest()
    {
        boolean flagRequestAttended = true;
		
		this.outcome = null;

		
        String sql = "SELECT r.title, r.label, r.genre, r.rrp, COUNT(rc.copyID) as num_copies FROM record r JOIN artist a ON r.artistID = a.artistID JOIN recordcopy rc ON r.recordID = rc.recordID JOIN recordshop rs ON rc.recordshopID = rs.recordshopID WHERE (a.lastname = ? OR a.firstname = ?) AND rs.city = ? GROUP BY r.title, r.label, r.genre, r.rrp";
		
		try {
			//Connet to the database
			//TO BE COMPLETED
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection(URL,USERNAME,PASSWORD);
			//Make the query
			//TO BE COMPLETED
			PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.clearParameters();
            preparedStatement.setString(1,this.requestStr[0]);
            preparedStatement.setString(2,this.requestStr[0]);
            preparedStatement.setString(3,this.requestStr[1]);
            ResultSet resultSet = preparedStatement.executeQuery();

            RowSetFactory aFactory = RowSetProvider.newFactory();
            CachedRowSet crs = aFactory.createCachedRowSet();
            crs.populate(resultSet);

            this.outcome=crs;
            crs.beforeFirst();
            //Process query
			//TO BE COMPLETED -  Watch out! You may need to reset the iterator of the row set.
			//Clean up
			//TO BE COMPLETED
            resultSet.close();
            preparedStatement.close();
            con.close();
		} catch (Exception e)
		{ System.out.println(e); }

        return flagRequestAttended;
    }



    //Wrap and return service outcome
    public void returnServiceOutcome(){
        try {
			//Return outcome
			//TO BE COMPLETED
            ObjectOutputStream outputStream = new ObjectOutputStream(this.serviceSocket.getOutputStream());
            outputStream.writeObject(this.outcome) ;
            outputStream.flush();
            System.out.println("Service thread " + this.getId() + ": Service outcome returned; " + this.outcome);
            
			//Terminating connection of the service socket
			//TO BE COMPLETED
            this.serviceSocket.close();
            outputStream.close();
        }catch (IOException e){
            System.out.println("Service thread " + this.getId() + ": " + e);
        }
    }


    //The service thread run() method
    public void run()
    {
		try {
			System.out.println("\n============================================\n");
            //Retrieve the service request from the socket
            this.retrieveRequest();
            System.out.println("Service thread " + this.getId() + ": Request retrieved: "
						+ "artist->" + requestStr[0] + "; recordshop->" + requestStr[1]);

            //Attend the request
            boolean tmp = this.attendRequest();

            //Send back the outcome of the request
            if (!tmp)
                System.out.println("Service thread " + this.getId() + ": Unable to provide service.");
            this.returnServiceOutcome();

        }catch (Exception e){
            System.out.println("Service thread " + this.getId() + ": " + e);
        }
        //Terminate service thread (by exiting run() method)
        System.out.println("Service thread " + this.getId() + ": Finished service.");
    }

}
