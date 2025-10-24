import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  
}
