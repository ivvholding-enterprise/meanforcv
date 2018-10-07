import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-jwt-auth',
  templateUrl: './jwt-auth.component.html',
  styles: []
})
export class JwtAuthComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'Authentication with JWT',
      'JSON Web Tokens (JWT)',
      'article',
      ''
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
