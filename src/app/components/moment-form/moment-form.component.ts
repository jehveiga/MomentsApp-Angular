import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentFormComponent implements OnInit {
  // Valor da varível chegará através do componente que está chamando
  @Input() btnText!: string;
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

  submit() {
    if (this.momentForm.invalid)
      return;



    console.log('Enviou abestado');
  }
}
