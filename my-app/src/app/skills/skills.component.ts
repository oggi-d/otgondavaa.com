import { Component, OnInit } from '@angular/core';

export interface SkillModel {
  Name: string;
  Experience: number;
  Point: number;
}
export interface FilterModel {
  VeryGood: boolean;
  Good: boolean;
  Academic: boolean;
  NotBad: boolean;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.less']
})
export class SkillsComponent implements OnInit {

  SkillsData: SkillModel[] = [
    { Name: "JS, HTML, CSS", Experience: 6, Point: 4 },
    { Name: "ASP.NET MVC C#", Experience: 6, Point: 4 },
    { Name: "MSSQL, Oracle", Experience: 6, Point: 4 },
    { Name: "AngularJS 1.x", Experience: 3, Point: 4 },
    { Name: "LESS, GIT", Experience: 4, Point: 4 },
    { Name: "Angular 5.x+", Experience: 0, Point: 2 },
    { Name: "NodeJS, ExpressJS", Experience: 0, Point: 2 },
    { Name: "MongoDB", Experience: 0, Point: 2 },
    { Name: "REST, SOAP", Experience: 4, Point: 3 },
    { Name: "jQuery", Experience: 6, Point: 4 },
    { Name: "Bootstrap", Experience: 6, Point: 4 },
    { Name: "Java, PHP", Experience: 0, Point: 1 },
    { Name: "iOS, Android", Experience: 0, Point: 1 },
    { Name: "MySQL", Experience: 1, Point: 3 },
  ];
  Skills: SkillModel[] = [];
  DisplayedColumns: string[] = ['Name', 'Experience', 'Point'];
  Filter: FilterModel;
  constructor() {
    this.Filter = {
      VeryGood: true,
      Good: true,
      Academic: true,
      NotBad: false
    };
  }

  ngOnInit() {
    this.applyFilter();
  }

  colorPicker(item: SkillModel): string {
    switch (item.Point) {
      case 4: return "primary";
      case 3: return "accent";
      case 2: return "warn";
      case 1:
      default: return "";
    }
  }

  profPicker(item: SkillModel): string {
    switch (item.Point) {
      case 4: return "Very Good";
      case 3: return "Good";
      case 2: return "Academic";
      case 1:
      default: return "Not bad";
    }
  }

  profColorPicker(item: SkillModel): string {
    switch (item.Point) {
      case 4:
      case 3: return "#01ff2c";
      case 2: return "#fbff09";
      case 1:
      default: return "Not bad";
    }
  }

  rowFilter(item: SkillModel): boolean {
    if (item.Point == 4 && this.Filter.VeryGood) return true;
    else if (item.Point == 3 && this.Filter.Good) return true;
    else if (item.Point == 2 && this.Filter.Academic) return true;
    else if (item.Point == 1 && this.Filter.NotBad) return true;
    return false;
  }

  applyFilter(): void {
    this.Skills = [];
    for (let skill of this.SkillsData) {
      if (this.rowFilter(skill)) this.Skills.push(skill);
    }
  }

}