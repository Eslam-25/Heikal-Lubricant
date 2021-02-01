import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { RoleModel } from '../../models/role.model';
import { UserService } from '../../services/user.service';
import { matchPassword } from '../../validations/confirm-password.validation';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userFormInfo = new FormGroup({
    id: new FormControl(''),
    creationDate: new FormControl(''),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [Validators.required]),
  }, {
    validators: matchPassword('password', 'confirmPassword')
  });

  showPassword: boolean = false;
  typeOfInput: string = 'password';
  roles: RoleModel[] = [];
  updatedUserId: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarServie) { }

  ngOnInit() {
    this.prepareRoles();
    this.prepateUpdatedUser();
  }

  get userName() {
    return this.userFormInfo.get('userName');
  }
  get password() {
    return this.userFormInfo.get('password');
  }
  confirmPassword() {
    return this.userFormInfo.get('confirmPassword');
  }
  get roleId() {
    return this.userFormInfo.get('roleId');
  }
  get isActive() {
    return this.userFormInfo.get('isActive');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword ? this.typeOfInput = "text" : this.typeOfInput = "password";
  }

  prepareRoles() {
    this.userService.getRoles().subscribe((items: RoleModel[]) => {
      this.roles = items;
    })
  }
  prepateUpdatedUser() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.updatedUserId = data['userId'] ? data['userId'] : 0;

      if (this.updatedUserId)
        this.userService.getUser(this.updatedUserId).subscribe(user => {
          this.userFormInfo.patchValue(user);
        })
    })
  }

  onSubmit() {
    this.userFormInfo.markAllAsTouched();
    if (this.userFormInfo.valid && !this.updatedUserId ) {
      const addedUser = {userName: this.userName.value, password: this.password.value, roleId: this.roleId.value, isActive: this.isActive.value};
      
      this.userService.addUser(addedUser).subscribe(() => {
        this.snackBarService.showSnackBar("تم اضافة المستخدم بنجاح");
        this.router.navigate(["../list"]);
      })
    }
    else if (this.userFormInfo.valid && this.updatedUserId) {
      this.userService.updateUser(this.userFormInfo.value).subscribe(() => {
        this.snackBarService.showSnackBar("تم تعديل بيانات المستخدم بنجاح");
        this.router.navigate(["../list"]);
      })
    }

  }
}
