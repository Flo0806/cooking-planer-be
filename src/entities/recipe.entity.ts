import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipes') // Tabelle wird "recipes" genannt
export class Recipe {
  @PrimaryGeneratedColumn('uuid') // UUID als Primärschlüssel
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 50 })
  preparationTime: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', length: 50 })
  difficulty: string;
}
