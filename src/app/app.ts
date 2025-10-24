import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeader } from './components/top-header/top-header';
import { Footer } from './components/footer/footer';
import { PreLoader } from './components/pre-loader/pre-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TopHeader,Footer,PreLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('graduate_Project');
}
