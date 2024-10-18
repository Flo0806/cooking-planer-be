import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekData } from 'src/common/interfaces/response.interface';
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
  async getWeeks(): Promise<WeekData[][]> {
    const today = new Date();
    const currentMonday = this.getMonday(today); // Aktueller Montag
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7); // Nächster Montag

    const currentWeek = await this.getWeekDays(currentMonday);
    const nextWeek = await this.getWeekDays(nextMonday);

    // Verwandle die WeekDay-Objekte in das gewünschte WeekData-Format
    const transformedCurrentWeek = this.transformToWeekData(currentWeek);
    const transformedNextWeek = this.transformToWeekData(nextWeek);

    return [transformedCurrentWeek, transformedNextWeek];
  }

  //#region  Helper
  // Hilfsfunktion, um die Tage einer Woche zu erhalten (Montag bis Sonntag)
  private async getWeekDays(monday: Date): Promise<WeekDay[]> {
    const weekDays: WeekDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      // Setze die Uhrzeit auf Mitternacht, um eine konsistente Basis zu haben
      date.setHours(0, 0, 0, 0);

      // Verwende den QueryBuilder, um nach Datensätzen zu suchen, die das gleiche Datum haben
      let weekDay = await this.weekdayRepository
        .createQueryBuilder('weekday')
        .leftJoinAndSelect('weekday.recipe', 'recipe') // Führe einen LEFT JOIN mit der Recipe-Entität durch
        .select([
          'weekday', // Wähle alle Felder von weekday
          'recipe.id', // Wähle nur das id-Feld von recipe
        ])
        .where('DATE(weekday.date) = :date', {
          date: date.toISOString().slice(0, 10),
        })
        .getOne();

      if (!weekDay) {
        weekDay = this.weekdayRepository.create({ date });
      }

      weekDays.push(weekDay);
    }

    return weekDays;
  }

  // Array der Wochentage (optional für die Namen der Wochentage)
  weekDayNames = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];

  // Funktion zur Transformation
  private transformToWeekData(weekDays: WeekDay[]): WeekData[] {
    return weekDays.map((day) => {
      // Datum in ein Date-Objekt umwandeln, um den Namen des Wochentags zu erhalten
      const dateObj = new Date(day.date);
      // Transformation gemäß dem erwarteten Interface
      return {
        name: this.weekDayNames[dateObj.getDay()], // Name des Wochentages basierend auf dem Datum
        date: day.date, // Datum als ISO-String ohne Zeitkomponente
        dishSelected: !!day.recipe?.id, // true, wenn ein Rezept vorhanden ist
        shoppingList: false, // Shopping List wird aktuell ignoriert und auf false gesetzt
        recipeId: day.recipe?.id || undefined, // recipeId setzen, wenn vorhanden
      };
    });
  }
  //#endregion
}
