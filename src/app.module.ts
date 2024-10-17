import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { WeekController } from './week/week.controller';
import { WeekService } from './week/week.service';
import { WeekDay } from './entities/week-day.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log('HIER', __dirname);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Der Hostname, der im Docker-Compose-File angegeben ist
      port: 3806,
      username: 'app', // Der Benutzername aus der Docker-Konfiguration
      password: 'app', // Das Passwort aus der Docker-Konfiguration
      database: 'cooking-planer', // Der Name der Datenbank
      //entities: [__dirname + '/**/*.entity{.ts,.js}'], // Importiere das Recipe-Entity
      entities: [Recipe, WeekDay],
      timezone: 'local',
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true, // Synchronisiert das Schema automatisch (nur in Entwicklung verwenden)
    }),
    TypeOrmModule.forFeature([WeekDay, Recipe]),
    RecipeModule, // Importiere das Recipe-Entity in das Modul
  ],
  controllers: [AppController, WeekController],
  providers: [AppService, WeekService],
})
export class AppModule {}
