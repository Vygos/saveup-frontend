import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  }

  goToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }

  goToContact() {
    document.getElementById('contactus').scrollIntoView({ behavior: 'smooth' });
  }

  goToOurTeam() {
    document.getElementById('ourteam').scrollIntoView({ behavior: 'smooth' });
  }
}
