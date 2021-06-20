import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavController, AlertController } from "@ionic/angular";
import { Project } from '../models/project';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-floor-plans',
  templateUrl: './floor-plans.page.html',
  styleUrls: ['./floor-plans.page.scss'],
})
export class FloorPlansPage implements OnInit {

  constructor(private FileChooser: FileChooser, private photoViewer: PhotoViewer,private alertController: AlertController,
    private dataService: DataService) { }

  ngOnInit() {
  }
  fileChooser() {
    this.FileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
  }
  showImage(img) {
    this.photoViewer.show(img);
    //this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', { share: false });
    //this.photoViewer.show('https://mysecuresite.com/path/to/image.jpg', 'My image title', { share: false, headers: '{username:foo,password:bar}' });
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
}
