import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-angular-universal',
  templateUrl: './angular-universal.component.html',
  styles: []
})
export class AngularUniversalComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'Angular Universal Setup',
      'Angular Universal with the MEAN stack ',
      'article',
      ''
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
