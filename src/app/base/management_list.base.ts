import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inject} from "@angular/core";
import {Cinema} from "../models/cinema";

export interface DialogAction {
  close(): void;
}

export class BaseDialogComponent implements DialogAction {
  constructor(public dialogRef: MatDialogRef<typeof self>) {}

  close(): void {
    this.dialogRef.close();
  }
}

export class BaseAddOrUpdateDialogComponent<T> extends BaseDialogComponent {
  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    @Inject(MAT_DIALOG_DATA) public data: Cinema
  ) {
    super(dialogRef);
  }

  override close(): void {
    this.dialogRef.close();
  }
}
