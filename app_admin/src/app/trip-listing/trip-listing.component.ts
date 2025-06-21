import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  
 private getTrips(): void {
    this.message = 'Searching for trips';
    
    this.tripDataService.getTrips()
        .subscribe({
            next: (value: any) => {
                this.trips = value;
               
            },
            error: (error: any) => {
                console.log('Error: ' + error);
                this.message = 'Error fetching trips.';
            }
        });
}


  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();

    
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}