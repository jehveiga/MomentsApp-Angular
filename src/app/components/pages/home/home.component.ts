import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DataFormatadaPipePipe } from '../../../Utilitarios/DataFormatada.pipe';
import { Moment } from '../../../interfaces/Moment';
import { Response } from '../../../interfaces/Response';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DataFormatadaPipePipe, RouterModule]
})

export class HomeComponent implements OnInit {
  allMoments$ = new Observable<Moment[]>;
  moments$ = new Observable<Response<Moment[]>>();
  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomentService) {
  }

  ngOnInit() {
    this.allMoments$ = this.momentService.getMoments().pipe(
      map((response: Response<Moment[]>) =>
        response.data),
      catchError(error => {
        console.error('Erro ao obter momentos:', error);
        return [];
      })
    );
  }
}
