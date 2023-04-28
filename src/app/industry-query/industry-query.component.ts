import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

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
  styleUrls: ['./industry-query.component.css'],
})
export class IndustryQueryComponent implements OnInit {
  queryString: string;
  industries: Industry[] = [];

  industryActivitySubject: Subject<Industry> = new Subject<Industry>();

  constructor(private http: HttpClient) {
    // Subscribe to the industryActivitySubject and debounce the API calls by 500ms
    this.industryActivitySubject
      .pipe(debounceTime(500))
      .subscribe((industry: Industry) => {
        this.getIndustryActivities(industry);
      });
  }

  ngOnInit(): void {}

  // Add isLoading property
  isLoading: boolean = false;

  getIndustries(): void {
    this.isLoading = true; // Set isLoading to true before making the API call
    this.http
      .get<Industry[]>(
        `https://api.intelpro.app/api/GoodsAndServices/v2/industies?question=${this.queryString}&withDescription=true`
      )
      .subscribe((data: Industry[]) => {
        this.industries = data;
        this.isLoading = false; // Set isLoading to false after getting the response
      });
  }

  // Update the getIndustryActivities method to be called by the industryActivitySubject
  getIndustryActivities(industry: Industry): void {
    if (!industry.checked) {
      industry.activities = [];
      return;
    }
    this.isLoading = true; // Set isLoading to true before making the API call
    this.http
      .get<Activity[]>(
        `https://api.intelpro.app/api/GoodsAndServices/v2/industryactivity?industryActivityTerm=${industry.name}%20industry&withDescription=true`
      )
      .subscribe((data: Activity[]) => {
        industry.activities = data;
        this.isLoading = false; // Set isLoading to false after getting the response
      });
  }
}
