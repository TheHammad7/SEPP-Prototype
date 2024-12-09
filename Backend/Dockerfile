# Use an OpenJDK image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy Gradle files
COPY gradlew .
COPY gradle gradle
COPY settings.gradle .
COPY build.gradle .

# Copy source code
COPY src src

# Install dependencies and build the application
RUN ./gradlew build --no-daemon

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "build/libs/*.jar"]
