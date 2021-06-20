import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {

  public project: Project;

  
  constructor(private route: ActivatedRoute, private navCtrl: NavController,
    private dataService: DataService, private alertController: AlertController) {
this.project = new Project();
}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('Edit ' + id);

    if (id != null) {
      const item = this.dataService.get(parseInt(id, 10));
      this.project = JSON.parse(JSON.stringify(item));
    }
  }

  save() {
    this.dataService.save(this.project);
    this.navCtrl.navigateBack('/project-details');
  }
  deleteProject() {
    this.dataService.delete(this.project);
    this.navCtrl.navigateBack('/home');
  }
  async confirmDeleteProject() {
    const alert = await this.alertController.create({
      header: 'Remove this Project?',
      subHeader: '',
      message: 'You are about to remove current Project. Proceed?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Delete',
        cssClass: 'danger',
        handler: () => {
          console.log('Confirm Delete');
          this.deleteProject();
        }
      }]
    });

    await alert.present();
  }
}
