import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMomentComponent { }
