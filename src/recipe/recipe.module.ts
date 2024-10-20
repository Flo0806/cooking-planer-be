import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as multer from 'multer';
import * as path from 'path';
import { Recipe } from 'src/entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { WeekDay } from 'src/entities/week-day.entity';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
            callback(null, filename);
          },
        }),
      }),
    }),
    TypeOrmModule.forFeature([Recipe, WeekDay]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
