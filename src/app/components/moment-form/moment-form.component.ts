import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Moment } from '../../interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentFormComponent implements OnInit {
  // Valor da varível chegará através do componente pai que passará através de parametro
  @Input() btnText!: string;

  // Propriedade responsável para envio dos dados para o componente Pai que no caso enviará os dados do Form
  @Output() onSubmit = new EventEmitter<Moment>();
  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      image: new FormControl("")
    });
  }

  // Obtendo o valor para efetuar a validação no front de propriedade do FormGroup
  get title() {
    return this.momentForm.get("title")!;
  }

  get description() {
    return this.momentForm.get("description")!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Adicionando o arquivo na propriedade image do form
    this.momentForm.patchValue({
      image: file,
    });
  }

  submit() {
    if (this.momentForm.invalid)
      return;

    console.log(this.momentForm);

    // Executando a emissão para o componente Pai passando os valores do momentForm
    this.onSubmit.emit(this.momentForm.value);
  }
}
