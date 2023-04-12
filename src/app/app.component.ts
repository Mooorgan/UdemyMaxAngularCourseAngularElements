import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert/alert.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularElements';
  content!: string | SafeHtml;
  // mssg = 'Doooom';

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    const alertElement = createCustomElement(AlertComponent, {
      injector: injector,
    });
    customElements.define('my-alert', alertElement);
    setTimeout(() => {
      // const mssg = 'Doooom';

      // this.content = '<p>A paragraph</p>';
      this.content = domSanitizer.bypassSecurityTrustHtml(
        //Only works like this with property binding as string
        '<my-alert message="Rendered Dynamically"></my-alert>'
        //Doesn't work like this with property binding as variable
        // '<my-alert [message]="\'Rendered Dynamically\'"></my-alert>'
        //Tried this. Doesn't work.
        // '<my-alert [message]="mssg"></my-alert>'
      );
      // this.content;
    }, 1000);
  }
}
