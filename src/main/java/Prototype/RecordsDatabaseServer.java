package Prototype;
import java.net.Socket;
import java.net.ServerSocket;
import java.net.InetAddress;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import jakarta.annotation.PreDestroy;

@SpringBootApplication
public class RecordsDatabaseServer {

    @Component
    public static class ServerService implements CommandLineRunner {

        private int thePort = 8080;  // Default port
        private String theIPAddress = "localhost";  // Default IP address
        private ServerSocket serverSocket = null;

        @Override
        public void run(String... args) throws Exception {
            initializeServerSocket();
            executeServiceLoop();
        }


    //Server Initialization
    public void initializeServerSocket(){
        
        //Initialize the socket
        System.out.println("Server: Initializing server socket at " + theIPAddress + " with listening port " + thePort);
        System.out.println("Server: Exit server application by pressing Ctrl+C (Windows or Linux) or Opt-Cmd-Shift-Esc (Mac OSX)." );
        try {
            serverSocket = new ServerSocket(thePort,3, InetAddress.getByName(theIPAddress));
            System.out.println("Server: Server at " + theIPAddress + " is listening on port : " + thePort);

        } catch (Exception e){
            System.out.println(e);
            System.exit(1);
        }
    }

    //Runs the service loop
    public void executeServiceLoop()
    {
        System.out.println("Server: Start service loop.");
        try {
            //Service loop
            while (true) {
                Socket clientSocket = this.serverSocket.accept();
                RecordsDatabaseService serviceThread = new RecordsDatabaseService(clientSocket);
                
            }
        } catch (Exception e){
            System.out.println(e);
        }
        System.out.println("Server: Finished service loop.");
    }
    @PreDestroy
    public void shutdownServer() {
    try {
        if (serverSocket != null && !serverSocket.isClosed()) {
            serverSocket.close();
            System.out.println("Server: Server socket closed.");
        }
    } catch (Exception e) {
        System.out.println("Error during server shutdown: " + e);
    }
}

    public static void main(String[] args){
        //Run the server
        SpringApplication.run(RecordsDatabaseServer.class, args);
    }


}
}
