import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public projects: Array<Project> = [];

  constructor(private storage: Storage) { }

  async loadAsync() {
    
    const data = await this.storage.get('projects');

    if (data != null) {
      this.projects = data;
    } else {
      this.projects = [];
    }

    
  }

  delete(project: Project) {
    if (this.projects != null) {
      console.log('Delete project: ' + project.id);
      const index = this.getIndex(project.id);

      if (index !== -1) {
      
        this.projects.splice(index, 1);
        
        this.saveProjects();
      }
    }
  }

  save(project: Project) {
    console.log('Saving data');

    if (project != null) {
      // If ID has not yet been generated, assign it now
      if (project.id === 0) {
        const newId = this.getMaxId() + 1;
        project.id = newId;
        console.log('Assigning new ID ' + newId);
      }

      // Otsime oma nimekirjast sama ID-ga
      const index = this.getIndex(project.id);

      if (index === -1) {
        console.log('Adding');
        this.projects.push(project);
      } else {
        console.log('Updating at index ' + index);
        this.projects[index] = project;
      }

      this.saveProjects();
    }
  }

  saveProjects() {
    this.storage.set('projects', this.projects);
  }

  getIndex(id: number): number {
    if (this.projects != null) {
      return this.projects.findIndex(x => x.id === id);
    }

    return -1; // Not found
  }

  get(id: number): Project {
    return this.projects.filter(x => x.id === id)[0];
  }

  getMaxId(): number {
    if (this.projects != null && this.projects.length > 0) {
      return Math.max(0, Math.max.apply(Math, this.projects.map(function(o) { return o.id; })));
    }

    return 0;
  }

  reorderProjects(from: number, to: number) {
    const projectToMove = this.projects.splice(from, 1)[0];
    this.projects.splice(to, 0, projectToMove);

    this.saveProjects();
  }
}
