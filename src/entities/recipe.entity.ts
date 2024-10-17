import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WeekDay } from './week-day.entity';

@Entity() // Tabelle wird "recipes" genannt
export class Recipe {
  @PrimaryGeneratedColumn('uuid') // UUID als Primärschlüssel
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string;

  @Column({ type: 'int', default: 10 })
  preparationTime: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', length: 50 })
  difficulty: number;

  // Beziehung zu WeekDay (Ein Rezept kann zu mehreren WeekDays gehören)
  @OneToMany(() => WeekDay, (weekday) => weekday.recipe, { cascade: true })
  weekDays: WeekDay[];
}
