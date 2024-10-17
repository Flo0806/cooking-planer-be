import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekDay } from 'src/entities/week-day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(WeekDay) private weekdayRepository: Repository<WeekDay>,
  ) {}

  // Hilfsfunktion, um den Montag einer Woche zu berechnen
  private getMonday(date: Date): Date {
    const day = date.getDay() || 7; // Falls Sonntag (0), auf 7 setzen
    if (day !== 1) {
      date.setHours(-24 * (day - 1)); // Zurück auf Montag
    }
    return date;
  }

  // Funktion, um die aktuelle und nächste Woche zurückzugeben
  async getWeeks(): Promise<WeekDay[][]> {
    const today = new Date();
    const currentMonday = this.getMonday(new Date(today)); // Aktueller Montag
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7); // Nächster Montag

    const currentWeek = await this.getWeekDays(currentMonday);
    const nextWeek = await this.getWeekDays(nextMonday);

    return [currentWeek, nextWeek];
  }

  // Hilfsfunktion, um die Tage einer Woche zu erhalten (Montag bis Sonntag)
  private async getWeekDays(monday: Date): Promise<WeekDay[]> {
    const weekDays: WeekDay[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      // Prüfen, ob es einen Eintrag für den jeweiligen Tag gibt
      let weekDay = await this.weekdayRepository.findOne({ where: { date } });
      if (!weekDay) {
        weekDay = this.weekdayRepository.create({ date });
      }

      weekDays.push(weekDay);
    }

    return weekDays;
  }
}
