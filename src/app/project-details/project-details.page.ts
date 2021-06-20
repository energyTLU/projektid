import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from "@ionic/angular";
import { DataService } from '../services/data.service';
import { Project } from '../models/project';
import { Storage } from "@ionic/storage-angular";
import { ActivatedRoute } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {

  public project: Project;

  constructor(private route: ActivatedRoute, private navCtrl: NavController,
    private dataService: DataService, private alertController: AlertController, private fileChooser: FileChooser) {
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
  addProject() {
    this.navCtrl.navigateForward("/edit-project");
  }
  editProject(project: Project) {
    this.navCtrl.navigateForward(["/edit-project", { id: project.id }]);
  }
  projectDetails(project: Project) {
    this.navCtrl.navigateForward(["/project-details", { id: project.id }]);
  }
  floorPlans(project: Project) {
    this.navCtrl.navigateForward(["/floor-plans", { id: project.id }]);
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
  filechooser() {
    this.fileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
  } 
}
