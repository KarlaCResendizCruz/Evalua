import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseNavettePage } from './course-navette';

@NgModule({
  declarations: [
    CourseNavettePage,
  ],
  imports: [
    IonicPageModule.forChild(CourseNavettePage),
  ],
})
export class CourseNavettePageModule {}
