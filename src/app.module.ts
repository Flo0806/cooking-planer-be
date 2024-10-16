import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/Recipe.Entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { WeekController } from './week/week.controller';
import { WeekService } from './week/week.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Der Hostname, der im Docker-Compose-File angegeben ist
      port: 3806,
      username: 'app', // Der Benutzername aus der Docker-Konfiguration
      password: 'app', // Das Passwort aus der Docker-Konfiguration
      database: 'cooking-planer', // Der Name der Datenbank
      entities: [Recipe], // Importiere das Recipe-Entity
      synchronize: true, // Synchronisiert das Schema automatisch (nur in Entwicklung verwenden)
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Recipe]), // Importiere das Recipe-Entity in das Modul],
  ],
  controllers: [AppController, WeekController],
  providers: [AppService, WeekService],
})
export class AppModule {}
