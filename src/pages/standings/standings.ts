import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  allStandings: any[];
  standings: any[];
  team: any;
  divisionFilter: string = 'division';

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private eliteApi: EliteApi) {}

  ionViewWillLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    // this.allStandings = _.chain(this.standings)
    //   .groupBy('division')
    //   .toPairs()
    //   .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //   .value();
    this.allStandings = tourneyData.standings;

    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    if(recordIndex === 0 || record.division !== records[recordIndex-1].division)
      return record.division;
    else
      return null;
  }

  filterDivision() {
    if(this.divisionFilter === 'all')
      this.standings = this.allStandings;
    else
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
  }
}