import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private toastCtrl: ToastController) {}

  async showToast(msg, colors) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: 'bottom',
      cssClass: colors,
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  async showNotification(msg, colors, position) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: position,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  async errorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color:'red',
      cssClass:'red'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
}
