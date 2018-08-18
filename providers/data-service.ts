import {Injectable} from "@angular/core";
import {HTTP} from '@ionic-native/http';
import {LoadingController, ToastController} from "ionic-angular";
import {Device} from "@ionic-native/device";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

declare var window: any;

@Injectable()
export class DataServiceProvider {
  public apiUrl = "http://192.168.2.88:8000/api/";
  private headers = {};
  public username: string;
  public password: string;
  public text: string = "";
  public db = null;
  public arr = [];
  public token: string;

  constructor(
    public http: HTTP,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private device: Device
  ) {
    //this.headers = {"Content-Type": "application/x-www-form-urlencoded"};
  }

  controlUser(data) {
    data["model"] = this.device.model;
    data["platform"] = this.device.platform;
    data["uuid"] = this.device.uuid;
    data["version"] = this.device.version;
    data["manufacturer"] = this.device.manufacturer;
    data["serial"] = this.device.serial;
    this.setPhoneInformation(data);
    console.log("POSTDATA", data);
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "login", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  controlUserViaSms(data) {
    data["model"] = this.device.model;
    data["platform"] = this.device.platform;
    data["uuid"] = this.device.uuid;
    data["version"] = this.device.version;
    data["manufacturer"] = this.device.manufacturer;
    data["serial"] = this.device.serial;
    this.setPhoneInformation(data);
    console.log("POSTDATA", data);
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "loginviasms", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }

  controlAccount(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "account", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  sendConfirmationCode(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "sendcode", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  controlConfirmationCode(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "controlcode", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  controlCode(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "controlcode_", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }

  changePassword(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "changepassword", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  createUser(data){
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "createuser", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  createAccrual(data) {
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "create_accrual", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }

  setPhoneInformation(data) {
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "smartdevice", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });

  }

  getUserInfo() {
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "user_info", {}, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })
    });
  }

  getLastAccruals(data) {
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "lastaccurals", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  changeJobState(data) {
    return new Promise(resolve => {
      this.http
        .post(this.apiUrl + "change-job-state", data, {})
        .then(data => {
          resolve(data);
        }).catch(error => {
        resolve(error)
      })

    });
  }
  getJobs(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'jobs', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  addHkcdJob(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'save-hkcd', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  sendPhoto(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'savePhoto', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }

  getVehicles(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'vehicles', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  getAvailableVehicles(){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get_available_vehicles', {}, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  hireVehicles(data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'hire_vehicle', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  unHireVehicle(data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'un_hire_vehicle', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  addConstJob(data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'save_construction_fill', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  listConstJob(){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'list_construction_fill', {}, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error)
      })
    })
  }
  getCompanies() {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get_all_company', {}, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  getAllVehicles() {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get_all_vehicles', {}, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  saveRealWeight(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'save-real-weight', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  queryVehicle(data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get-vehicle-info', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  manuelBalanceDecrease(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'manuel-balance-decrease', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  manuelWeightDecrease(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'manuel-weight-decrease', data, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }
  getNotifications() {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'notification_list', {}, {}).then(data => {
        resolve(data);

      }).catch(error => {
        resolve(error)
      })
    })
  }

  getJobDetail(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'jobDetail', data, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error)
      })
    })
  }

  getBudgetReports(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'budget-list', data, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error);
      })
    })
  }

  logout() {

  }
  getDumpSites() {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'list_dump_sites', {}, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error);
      })
    })
  }

  getDumpSiteActivity(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get_dumpsite_activity', data, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error);
      })
    })
  }
  getTotalDumpSiteActivity(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'get-total-dumpsite-activity', data, {}).then(data => {
        resolve(data);
      }).catch(error => {
        resolve(error);
      })
    })
  }
  showToast(
    message: string,
    duration: number = 3000,
    position: string = "bottom"
  ) {
    var toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    //oast.onDidDismiss(this.dismissHandler);
    toast.present();
  }
}
