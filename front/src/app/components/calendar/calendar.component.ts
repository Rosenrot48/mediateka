import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

// class CalendarDate {
//   date: number;
//   month: number;
//   year: number;
//   dayOfWeek: string;
//   constructor() {
//     this.date = null;
//     this.month = null;
//     this.year = null;
//     this.dayOfWeek = null;
//   }
// }

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dataSource: string[] = [];
  daysNaming: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  weeks: any[] =[]
  // days: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  mondays: number [] = [];
  tuesdays: number [] = [];
  wednesdays: number [] = [];
  thursdays: number [] = [];
  fridays: number [] = [];
  saturdays: number [] = [];
  sundays: number [] =[];
  selected: any;
  constructor(
  ) { }

  ngOnInit() {
    this.getMonthDays();
  }

  /** Необходимо Написать алгоритм,
  который будет складывать по строкам недели правильным образом,
  т.е. Индетификатор недели берет неделю из массива и кладет в нее либо пустое значение,
   либо элемент, который является числом месяца*/


  /**
   Идея заключается в том, чтобы при получении количества дней в месяце, посчитать сколько ндель занимает месяц, по последним (последнему) дням(дню) в недели
   после чего проиницилизировать массив недель, пустыми массивами размерностью в 7 дней (количество дней в недели)
   и в зависимости от первого дня, который попался в поле зрения (важно для первой строки) начать заполнять календарь,
   все предшествуищие дни недели делать пустыми или серыми ( серыми труднее ).
   В последней же строке все оставшиеся элементы делать пустыми или серыми.
   НЕОБХОДИМО: разработать правильный алгоритм создания матрицы 7 х n ( n - число недель)
   */

  getMonthDays(year:number = new Date().getFullYear(), month: number = new Date().getMonth()): void {
    this.clearArrays();
    this.getWeeksInMonth(year, 1);
    let weekIndex = 0;
    this.weeks[weekIndex] = new Array(7);
    console.log(this.weeks);


    // this.weeks = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)];
    // for (let i = 1; i <= this.daysInMonth(month, year); i++) {
    //   switch (this.getDateInfo(year, month+1, i).toUpperCase()) {
    //     case 'MON':
    //       this.mondays.push(i);
    //       break;
    //     case 'TUE':
    //       this.tuesdays.push(i);
    //       break;
    //     case 'WED':
    //       this.wednesdays.push(i);
    //       break;
    //     case 'THU':
    //       this.thursdays.push(i);
    //       break;
    //     case 'FRI':
    //       this.fridays.push(i);
    //       break;
    //     case 'SAT':
    //       this.saturdays.push(i);
    //       break;
    //     case 'SUN': // В случае с  воскресеньем необходимо наращивать индекс недели,
    //       // которая будет в месяце (так как это показатель того, сколько недель занимает месяц)
    //       this.sundays.push(i);
    //       break;
    //   }
    // }
    // console.log(this.weeks)
  }
  getWeeksInMonth(year: number, month) {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month, 0);

    const used = firstOfMonth.getDay() + lastOfMonth.getDate();
    console.log(firstOfMonth, lastOfMonth, used, Math.ceil( used / 7));
    // return Math.ceil( used / 7);
    return used / 7;
  }

  getDateInfo(year: number, month: number, day: number) {
    console.log(new Date(`${year}-${month}-${day}`));
    return new Date(`${year}-${month}-${day}`).toString().split(' ')[0];
  }
  clearArrays() {
    this.mondays.length = 0;
    this.tuesdays.length = 0;
    this.wednesdays.length = 0;
    this.thursdays.length = 0;
    this.fridays.length = 0;
    this.saturdays.length = 0;
    this.sundays.length = 0;

  }

  daysInMonth(iMonth, iYear)
  {
    return  32 - new Date(iYear, iMonth, 32).getDate();
  }


}
