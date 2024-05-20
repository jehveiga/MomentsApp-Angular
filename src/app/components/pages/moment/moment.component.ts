import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Comment } from '../../../interfaces/Comment';
import { Moment } from '../../../interfaces/Moment';
import { Response } from '../../../interfaces/Response';
import { CommentService } from '../../../services/comment.service';
import { MessagesService } from '../../../services/messages.service';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
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
  idMoment?: number;

  commentForm!: FormGroup;

  constructor(private momentService: MomentService,
    private commentService: CommentService,
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.idMoment = Number(this.route.snapshot.paramMap.get("id"));

    this.moment$ = this.momentService.getMomentById(this.idMoment).pipe(
      map((response: Response<Moment>) => response.data),
      catchError(error => {
        console.error('Erro ao buscar o momento:', error);
        return throwError(() => error); // Reenvia o erro para quem chamou
      })
    );

    this.commentForm = new FormGroup({
      text: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required)
    })
  }

  get text() {
    return this.commentForm.get("text")!;
  }

  get username() {
    return this.commentForm.get("username")!;
  }

  async submit(commentFormDirective: FormGroupDirective) {
    if (this.commentForm.invalid)
      return;

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.idMoment);

    await this.commentService.createComment(data).subscribe((comment) =>
      this.moment!.comments?.push(comment.data)
    );

    this.messageService.add("Comentário adicionado!");

    this.commentForm.reset();
    commentFormDirective.resetForm();
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso!');
    this.router.navigate(["/"]);
  }
}
