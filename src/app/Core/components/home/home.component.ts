import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'Home',
      'MEAN Stack template with features including JWT authentication, MongoDB and Angular Universal',
      'website',
      'https://www.meankit.io'
    );
  }

}
