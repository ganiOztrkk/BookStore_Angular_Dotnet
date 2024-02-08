import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ngx-spinner 
    bdColor = "rgba(0, 0, 0, 0.8)" 
    size = "large" 
    color = "#fff" 
    type = "ball-spin-clockwise" 
    [fullScreen] = "true">
    <p style="color: white" > Loading... </p>
  </ngx-spinner>
  
  <router-outlet></router-outlet>`
})
export class AppComponent {}
