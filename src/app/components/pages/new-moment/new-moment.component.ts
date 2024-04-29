import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Moment } from '../../../interfaces/Moment';
import { MomentService } from '../../../services/moment.service';
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
  private momentService = inject(MomentService);

  async createHandler(moment: Moment) {
    // Para ser enviado a API tem que ser convetido em JSON ou FORMDATA
    // - Se não tivesse arquivo poderia ser enviado por JSON mais no caso tem a propriedade imagem
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    // todo

    // enviar para o service para ser gerenciado para API
    await this.momentService.createMoment(formData).subscribe();

    // redirect
  }
}
