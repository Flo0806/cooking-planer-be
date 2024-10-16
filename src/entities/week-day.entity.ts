import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('weekdays') // Tabelle für die Tage der Woche
export class WeekDay {
  @PrimaryGeneratedColumn('uuid') // UUID als Primärschlüssel
  id: string;

  @Column({ type: 'date' }) // Datum für jeden Tag
  date: Date;

  // Beziehung zu Recipe (1 Tag kann 1 Rezept haben, ein Rezept kann in mehreren Tagen sein)
  @ManyToOne(() => Recipe, (recipe) => recipe.id, { nullable: true })
  recipe: Recipe;
}
