import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Industry {
  name: string;
  description: string;
  checked?: boolean;
  activities?: Activity[];
}

interface Activity {
  name: string;
  description: string;
}

@Component({
  selector: 'app-industry-query',
  templateUrl: './industry-query.component.html',
  styleUrls: ['./industry-query.component.css']
})
export class IndustryQueryComponent implements OnInit {
  queryString: string;
  industries: Industry[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getIndustries(): void {
    this.http.get<Industry[]>(`https://api.intelpro.app/api/GoodsAndServices/v2/industies?question=${this.queryString}&withDescription=true`).subscribe((data: Industry[]) => {
      this.industries = data;
    });
  }

  getIndustryActivities(industry: Industry): void {
    if (!industry.checked) {
      industry.activities = [];
      return;
    }
    this.http.get<Activity[]>(`https://api.intelpro.app/api/GoodsAndServices/v2/industryactivity?industryActivityTerm=${industry.name}&withDescription=true`).subscribe((data: Activity[]) => {
      industry.activities = data;
    });
  }
}