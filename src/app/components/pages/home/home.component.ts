import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { DataFormatadaPipePipe } from '../../../Utilitarios/DataFormatadaPipe.pipe';
import { Moment } from '../../../interfaces/Moment';
import { Response } from '../../../interfaces/Response';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DataFormatadaPipePipe]
})
export class HomeComponent implements OnInit {
  allMoments$ = new Observable<Moment[]>;
  moments$ = new Observable<Response<Moment[]>>();

  constructor(private momentService: MomentService) { }

  ngOnInit() {
    this.allMoments$ = this.momentService.getMoments().pipe(
      map((response: Response<Moment[]>) => response.data),
      catchError(error => {
        console.error('Erro ao obter momentos:', error);
        return [];
      })
    );
  }

}
