import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Loading, LoadingController} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service";
import {GlobalVars} from "../../providers/globalvars";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';

@IonicPage()
@Component({
  selector: 'page-creditinstall',
  templateUrl: 'creditinstall.html',
})
export class CreditinstallPage {

  amount: string = '';
  user: any;
  model:string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public dataService: DataServiceProvider, public globalVars: GlobalVars,
              public loadingCtrl: LoadingController,private iab:InAppBrowser, private clipboard:Clipboard) {
    this.user = globalVars.getUser();
    this.model = globalVars.getModel();
  }

  ionViewWillEnter() {
    this.getLastAccruals();
  }

  loading: Loading;

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen Bekleyiniz',
      dismissOnPageChange: true,
      spinner: 'crescent'
    });
    this.loading.present();
  }

  accrual: any;
  status: boolean = false;

  confirmAccrual() {
    if(!this.amount || this.amount == '0'){
      let alert = this.alertCtrl.create({
        title: 'Uyarı',
        message: 'Lütfen geçerli bir tutar girerek tekrar deneyiniz.',
        buttons: ['Tamam']
      });
      alert.present();
      return;
    }
    let confirm = this.alertCtrl.create({
      title: 'Bilgi',
      message: 'Sayın <b>'+this.user['comp_name']+' '+this.user['comp_register_no']+'</b> numaralı sicilinize <b>'+this.amount+' TL</b> tutarında tahakkuk oluşturulacak. Devam etmek istiyormusunuz?',
      buttons: [
        {
          text: 'İptal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Onayla',
          handler: () => {
           this.createAccrual();
          }
        }
      ]
    });
    confirm.present();

  }
  createAccrual(){
    this.showLoading();
    let data = {'amount': this.amount, 'comp_id': this.user['comp_id']}
    this.dataService.createAccrual(data).then(response => {
      try {
        response = JSON.parse(response['data']);

      } catch (error) {
        this.loading.dismiss();
        this.dataService.showToast('Hata oluştu!');
        return;
      }
      if (response.hasOwnProperty('session')) {
        let sessionStatus = JSON.parse(response['session']);
        console.log('SESSION_STATUS', sessionStatus);
        if (!sessionStatus) {
          this.navCtrl.setRoot('DefaultPage', {'reason':'session'});
          return;
        }
      }
      this.loading.dismiss();

      this.accrual = response;
      var status: boolean = JSON.parse(response['status']);
      this.status = status;
      if (!status) {
        let alert = this.alertCtrl.create({
          title: 'Bilgi',
          message: 'Tahakkuk oluşturulamadı! Lütfen tekrar deneyiniz.',
          buttons: ['Tamam']
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Bilgi',
          message: this.accrual.accrual_id + ' numaralı tahakkuk oluşturuldu. Ödemelerinizi <b>Ankara Büyükşehir Belediyesi Online Tahsilat Servisinden</b>, <b>Vakıfbank İnternet Bankacılığından</b> veya <b>Vakıfbank Veznelerinden</b> yapabilirsiniz. Mesai bitimine kadar ödenmeyen tahakkuklar otomatik olarak gün sonunda iptal edilecektir.',
          buttons: ['Tamam']
        });
        alert.present();
        this.getLastAccruals();
      }
    })
  }
  accruals: any;

  getLastAccruals() {
    this.showLoading();
    let data = {'comp_id': this.user['comp_id']};
    this.dataService.getLastAccruals(data).then(response => {

      try {
        response = JSON.parse(response['data']);
        this.accruals = response;

      } catch (error) {
        this.loading.dismiss();
        this.dataService.showToast('Hata oluştu!');
        return;
      }
      if (response.hasOwnProperty('session')) {
        let sessionStatus = JSON.parse(response['session']);
        console.log('SESSION_STATUS', sessionStatus);
        if (!sessionStatus) {
          this.navCtrl.setRoot('DefaultPage', {'reason':'session'});
          return;
        }
      }
      this.loading.dismiss();

    })
  }
  openPage() {
    this.iab.create('https://tahsilat.ankara.bel.tr', '_system');
  }
  confirmPayment(accrual:any) {
    let confirm = this.alertCtrl.create({
      title: 'Bilgi',
      message: 'Seçtiğiniz tahakkuku, Ankara Büyükşehir Belediyesi Online Tahsilat Servisini kullanarak ödeyebilirsiniz. Tahsilat servisine yönlenmek için ÖDEME EKRANI butonuna basınız!',
      buttons: [
        {
          text: 'İptal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },

        {
          text: 'Tahakkuk Numarasını Kopyala',
          handler: () => {
            this.clipboard.copy(accrual.accrual_number).then(()=>{
              this.dataService.showToast('Tahakkuk numarası kopyalandı');
            });
          }
        },
        {
          text: 'Ödeme Ekranına Git',
          handler: () => {
            this.openPage()
          }
        }
      ]
    });
    confirm.present();
  }
}
