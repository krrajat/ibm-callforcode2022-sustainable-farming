import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PostService } from '@/_services';

@Component({ templateUrl: 'listMachines.component.html' })
export class ListMachinesComponent implements OnInit {
  posts:any;
   
  constructor(private service:PostService) {}
   
  ngOnInit() {
      this.service.getPosts()
        .subscribe(response => {
          this.posts = response;
        });
  }
}