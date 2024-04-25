import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentFormComponent {
  // Valor da varível chegará através do componente que está chamando
  @Input() btnText!: string;
}
