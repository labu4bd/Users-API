import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UsersService],
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit {
  users: User[] = [];
  searchUsers: User[] = [];
  favoriteUsers: User[] = [];
  editUser: User | undefined; // the User currently being edited
  userName: any;
  showFavUsers = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  //get users
  getUsers(): void {
    this.userName='';
    this.showFavUsers = false;
    this.users = [];
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      console.log('Users: ',users);
    });
  }

  //add favorite users
  addFavoriteUser(userId: any) {
    if(this.users.length>0){
      if(this.favoriteUsers.some(item => item.id === userId)){
        console.log('Already in Favorite User',this.favoriteUsers);
      }else{
        for(let i = 0; i < this.users.length; i++) { 
          if(this.users[i].id == userId){
            this.favoriteUsers.push(this.users[i]);
          }
        }
      }
      window.localStorage.setItem("favUsers_localStorage", JSON.stringify(this.favoriteUsers));
    }
  }
  // show the list of Favorite Users
  showFavoriteUsers(){
    this.userName = '';
    this.users = [];
    this.showFavUsers = true;
    let local_favStorage: any  = window.localStorage.getItem("favUsers_localStorage");
    this.favoriteUsers = JSON.parse(local_favStorage);
  }
  // search by user first name
  search(searchTerm: string) {
    var searchString = searchTerm.trim();
    console.log('searchString:',searchString,'this.users.length:',this.users.length);
    if(searchString.length == 0){
      this.getUsers();
    }else if(!this.showFavUsers){
      for(let i = 0; i < this.users.length; i++) { 
        if (this.users[i].first_name.toLowerCase() === searchString.toLowerCase()){
          this.searchUsers.push(this.users[i]); 
          console.log('key:',i,'search mach item:',this.users[i]);
        } 
        if(i == this.users.length-1){
          this.users = [];
          this.userName = '';
          this.users = this.searchUsers;
        }
      }
    }
  }
}
