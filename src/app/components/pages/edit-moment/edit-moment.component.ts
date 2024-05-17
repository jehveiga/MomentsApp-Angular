import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Moment } from '../../../interfaces/Moment';
import { Response } from '../../../interfaces/Response';
import { MomentService } from '../../../services/moment.service';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessagesService } from './../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [
    CommonModule,
    MomentFormComponent
  ],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMomentComponent implements OnInit {
  moment$ = new Observable<Moment>();
  btnText: string = 'Editar';

  constructor(private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.moment$ = this.momentService.getMomentById(id).pipe(
      map((response: Response<Moment>) => response.data),
      catchError(error => {
        console.error('Erro ao buscar o momento:', error);
        return throwError(() => error); // Reenvia o erro para quem chamou
      })
    );
  }

  editHandler(moment: Moment) {
    const id = moment.id!;

    // Para ser enviado a API tem que ser convetido em JSON ou FORMDATA
    // - Se não tivesse arquivo poderia ser enviado por JSON mais no caso tem a propriedade imagem

    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    // enviar para o service para ser gerenciado para API
    this.momentService.updateMoment(id, formData).subscribe(
      {
        complete: () => {
          this.messagesService.add("Momento editado com sucesso!");
          this.router.navigate(['/']);
        }
      }
    );
  }
}
