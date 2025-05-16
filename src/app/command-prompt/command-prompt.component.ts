import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-command-prompt',
  standalone: false,
  templateUrl: './command-prompt.component.html',
  styleUrl: './command-prompt.component.scss'
})
export class CommandPromptComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
