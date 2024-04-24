import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentFormComponent {
  // Valor da varível chegará através do componente que está chamando
  @Input() btnText!: string;
}
