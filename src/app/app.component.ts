import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './Authentication/auth.service';
import { DatabaseService } from './Services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  constructor(private auth:AuthService,private database:DatabaseService) {}

  ngOnDestroy()
  {
    this.auth.logout();
    this.initApp();
  }
  async initApp()
  {
    await this.database.initializePlugin();
    SplashScreen.hide();
  }
}
