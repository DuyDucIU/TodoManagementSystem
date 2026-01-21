FROM eclipse-temurin:25

LABEL mentainer="duyduc"

WORKDIR /app

COPY target/todo-management-0.0.1-SNAPSHOT.jar todo-docker-demo.jar

ENTRYPOINT ["java", "-jar", "todo-docker-demo.jar"]