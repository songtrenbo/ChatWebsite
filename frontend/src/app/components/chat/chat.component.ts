import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(
    private utilsService: UtilsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if(!this.utilsService.existToken()){
      this.router.navigate(["/home"]);
    }
  }

}
