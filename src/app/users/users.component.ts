import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // data table config , dttrigger will be called as a callback function after res in getUsers. Wait the data loaded then trigger the data table
  // dtConfig : deals with table option such as number of row option i.e [5, 10, 15] 
  dtConfig : DataTables.Settings = { lengthMenu : [5, 10, 15]};
  dtTrigger : Subject <any> = new Subject<any>();
  // data table config end


  usersList : any = [];
  
  
  constructor( private userService : UsersService) {  }

  ngOnInit(): void {
  this.getUsers()

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    
  }

  getUsers() {
    this.userService.getUser().subscribe(res => {
      console.log(res)
      this.usersList = res;
      this.dtTrigger.next();
    } )
  }

}
