import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { SnackBarComponent } from "./snack-bar.component";

@Injectable()
export class SnackBarServie {
    constructor(private snackBar: MatSnackBar) { }

    showSnackBar(message: string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                message: message
            },
        });
    }
}