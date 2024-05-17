import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Moment } from '../../../interfaces/Moment';
import { Response } from '../../../interfaces/Response';
import { MessagesService } from '../../../services/messages.service';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  moment$ = new Observable<Moment>();
  moment?: Moment;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.moment$ = this.momentService.getMomentById(id).pipe(
      map((response: Response<Moment>) => response.data),
      catchError(error => {
        console.error('Erro ao buscar o momento:', error);
        return throwError(() => error); // Reenvia o erro para quem chamou
      })
    );
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso!');
    this.router.navigate(["/"]);
  }
}
