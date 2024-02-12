import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { AuthService } from '../auth.service';
import { DatabaseService } from 'src/app/Services/database.service';
import { Table } from 'src/app/shared/table';
export interface SignUp {
  name: string;
  email: string;
  mobile: number;
  password: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user: SignUp;
  userForm: FormGroup;
  temp:any;
  constructor(
    private commonService: CommonService,
    private authservice: AuthService,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {
    // console.log('Sign up');
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async CreateAccount() {
    if (!this.userForm.valid) {
      this.commonService.errorToast('Please enter All values ');
      return;
    }

    console.log(this.userForm.value);

    const ColumnInfo: Table[] = [
      {
        colName: 'Emp_ID',
        colType: 'INTEGER',
        isPrimaryKey: true,
        notNull: false,
        isDefault: false,
        defaultValue: undefined,
      },
      {
        colName: 'Emp_Name',
        colType: 'TEXT',
        isPrimaryKey: false,
        notNull: false,
        isDefault: false,
        defaultValue: undefined,
      },
      {
        colName: 'Emp_Email',
        colType: 'VARCHAR(50)',
        isPrimaryKey: false,
        notNull: false,
        isDefault: false,
        defaultValue: undefined,
      },
      {
        colName: 'Emp_Mobile',
        colType: 'VARCHAR(30)',
        isPrimaryKey: false,
        notNull: false,
        isDefault: false,
        defaultValue: undefined,
      },
      {
        colName: 'Emp_Password',
        colType: 'TEXT',
        isPrimaryKey: false,
        notNull: false,
        isDefault: false,
        defaultValue: undefined,
      },
    ];
    const result = await this.dbService.createTable('Employee', ColumnInfo);
    console.log(result);
    this.temp = result;
    this.userForm.reset();
    this.authservice.login();
  }
}
