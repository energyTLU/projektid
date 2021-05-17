import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Project } from '../models/project';
import { DataService } from '../services/data.service';
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(private navCtrl: NavController,private storage: Storage, private dataService: DataService) {
    
  }

async ngOnInit(){
  await this.storage.create();
  await this.dataService.loadAsync();
  
}

addProject(){
  this.navCtrl.navigateForward("/edit-project");
}
editProject(project: Project){
  this.navCtrl.navigateForward(["/edit-project", {id: project.id}]);
}

  


}
