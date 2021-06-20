import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from "@ionic/angular";
import { Project } from '../models/project';
import { DataService } from '../services/data.service';
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  editButton: String = 'Edit';
    editing: Boolean = false;

    constructor(private navCtrl: NavController, private dataService: DataService, private storage: Storage,
                private alertController: AlertController) {
    }

  async ngOnInit() {
    await this.storage.create();
    await this.dataService.loadAsync();

  }

  addProject() {
    this.navCtrl.navigateForward("/edit-project");
  }
  editProject(project: Project) {
    this.navCtrl.navigateForward(["/edit-project", { id: project.id }]);
  }
  projectDetails(project: Project) {
    this.navCtrl.navigateForward(["/project-details", { id: project.id }]);
  }
  toggleDone(project: Project) {
    project.isDone = !project.isDone;
    this.dataService.saveProjects();
  }

  deleteProject(project: Project) {
    this.dataService.delete(project);
  }

  async confirmDeleteProject(project: Project) {
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
          this.deleteProject(project);
        }
      }]
    });

    await alert.present();
  }

  reorderProjects(ev) {
    console.log(ev);
    this.dataService.reorderProjects(ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  toggleEdit() {
    this.editing = !this.editing;

    if (this.editing) {
      this.editButton = 'Done';
    } else {
      this.editButton = 'Edit';
    }
  }
}
