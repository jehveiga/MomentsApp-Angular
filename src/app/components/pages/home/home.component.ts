import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DataFormatadaPipePipe } from '../../../Utilitarios/DataFormatada.pipe';
import { Response } from '../../../interfaces/Response';
import { MomentService } from '../../../services/moment.service';
import { Moment } from './../../../interfaces/Moment';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DataFormatadaPipePipe, RouterModule, FontAwesomeModule]
})

export class HomeComponent implements OnInit {
  allMoments$ = new Observable<Moment[]>;
  moments$ = new Observable<Moment[]>;
  baseApiUrl = environment.baseApiUrl;
  faSearch = faSearch;
  searchTerm = "";

  constructor(private momentService: MomentService) {
  }

  ngOnInit() {
    this.moments$ = this.momentService.getMoments().pipe(
      map((response: Response<Moment[]>) =>
        response.data),
      catchError(error => {
        console.error('Erro ao obter momentos:', error);
        return [];
      })
    );

    this.allMoments$ = this.moments$
  }

  search(event: any): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (this.moments$) {
      this.allMoments$ = this.moments$.pipe(
        map((moments: Moment[]) => moments.filter(moment => moment.title.toLowerCase().includes(value)))
      );
    }
  }
}
