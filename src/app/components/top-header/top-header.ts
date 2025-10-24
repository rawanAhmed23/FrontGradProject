import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-header',
  imports: [RouterLinkActive,RouterLink],
  standalone: true,
  templateUrl: './top-header.html',
  styleUrl: './top-header.scss',
})
export class TopHeader {

}
