import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentComponent {
  id?: Number;

  constructor(private route: ActivatedRoute) {

  }
}
