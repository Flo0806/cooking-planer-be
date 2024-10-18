import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity() // Tabelle für die Tage der Woche
export class WeekDay {
  @PrimaryGeneratedColumn('uuid') // UUID als Primärschlüssel
  id: string;

  // Wir müssen ein reines date Objekt konvertieren: https://github.com/typeorm/typeorm/issues/2176
  // Nur datetime Objekte werden korrekt in ein Date konvertiert
  @Column({
    type: 'date',
    transformer: {
      to(value: Date): Date {
        return value; // Beim Speichern keine Änderung
      },
      from(value: string): Date {
        return new Date(value); // Beim Lesen aus der DB: String zu Date umwandeln
      },
    },
  }) // Datum für jeden Tag
  date: Date;

  // Beziehung zu Recipe (1 Tag kann 1 Rezept haben, ein Rezept kann in mehreren Tagen sein)
  @ManyToOne(() => Recipe, (recipe) => recipe.weekDays)
  @JoinColumn()
  recipe: Recipe;
}
