import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: Token = new Token('','','',0,0,'');
  images: any;
  imageSrc: any;
  img: string;

  constructor(private utilsService: UtilsService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.utilsService.existToken()!;
  }
  selectImage(event: any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images = file;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);
    this.userService.updateUserProfile(formData).subscribe((res: any)=>{
      console.log(res);
      this.img = res.path;
    });
  }

}
