import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'child-cell',
  template: ` <span>
    <button
      mat-icon-button
      color="primary"
      matTooltip="Add to mess"
      (click)="invokeParentMethod()"
    >
      <mat-icon>add</mat-icon>
    </button>
  </span>`,
  styles: [
    `
      .btn {
        line-height: 0.5;
      }
    `,
  ],
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.assignMess(
      this.params.node.data.rollNumber
    );
  }

  refresh(): boolean {
    return false;
  }
}
