# Verwende ein offizielles OpenJDK-Image als Basis
FROM openjdk:18-jdk-slim

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die JAR-Datei in das Docker-Image
COPY target/fh-tetris-0.0.1-SNAPSHOT.jar app.jar

# Stelle sicher, dass die JAR ausführbar ist
RUN chmod +x app.jar

# Setze den Port, der geöffnet werden soll
EXPOSE 8080

# Starten der Anwendung
ENTRYPOINT ["java", "-jar", "app.jar"]
