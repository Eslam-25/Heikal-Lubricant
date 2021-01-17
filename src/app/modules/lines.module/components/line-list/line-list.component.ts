import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineService } from '../../services/line.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

  days: string[] = [];
  linesOfDays: any[] = [];

  constructor(private lineService: LineService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.days = this.lineService.daysOfWeek();
    this.preparedDaysWithThemLines();
  }

  preparedDaysWithThemLines(){
    this.days.forEach((item) => {
      this.activatedRoute.data
        .subscribe(linesData => {
          const linesPerDay = linesData.lines.filter(line => line.dayName === item && line.isActive);
          this.linesOfDays.push({ dayName: item, lines: linesPerDay })
        })
    })
  }
}
