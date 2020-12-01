import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'Gerson', age: 11 },
    { id: 1, name: 'Gerson', age: 11 },
  ];

  constructor(public userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe((usersRes) => {
      this.users = usersRes;
    });
  }
}
