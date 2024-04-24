import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MomentFormComponent } from "../../moment-form/moment-form.component";

@Component({
  selector: 'app-new-moment',
  standalone: true,
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MomentFormComponent
  ]
})
export class NewMomentComponent {
  btnText: string = "Compartilhar!";
}
