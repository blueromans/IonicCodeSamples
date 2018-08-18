import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vehicle, Barrier, DumpSite } from '../model/models';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  getVehicleList(ipaddress:string) {
    return this.db.list<Vehicle>('/'+ipaddress+'/events',ref => ref.orderByChild('id'));
  }
  getBarrierList(ipaddress:string){
    return this.db.list<Barrier>('/'+ipaddress+'/commands/barriers',ref => ref.orderByChild('id'));
  }
  getDumpSiteList() {
    return this.db.list<DumpSite>('/uptime');
  }
}

