import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnInit{

  private roleSubject = new BehaviorSubject<string | null>(null);
  role$: Observable<string | null> = this.roleSubject.asObservable();

  private users = [
    { email: 'user1@example.com', password: 'Password1', role: 'admin' },
    { email: 'user2@example.com', password: 'Password2', role: 'user' },
    { email: 'user3@example.com', password: 'Password3', role: 'user' }
  ];
  // users:any;
  constructor() { }

  ngOnInit(): void {
}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.roleSubject.next(user.role); 
      return true;
    } else {
      this.roleSubject.next(null); 
      return false;
    }
  }

  logout() {
    this.roleSubject.next(null); 
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }
}
