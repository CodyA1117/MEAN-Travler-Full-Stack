import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication'; 

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input('trip') trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService 
  ) { }

  public editTrip(trip: Trip): void {
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

 
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}