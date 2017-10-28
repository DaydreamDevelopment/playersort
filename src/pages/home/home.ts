import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

interface Player {  
  name: string,
  weight: number,
  active: boolean
}

interface Group {  
  name: string;  
  players: Player[];  
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  group: Group = { name: "", players: [] };
  weight: number = null;
  name: string = null;
  teams: Group[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  addPlayer() {
    if(this.weight && this.name) {
      this.group.players.push({ name: this.name, weight: this.weight, active: true })
      this.weight = null;
      this.name = null;
    }
    else {
      this.showError('Missing Information', 'You must enter a name and select a weight.')
    }
  }

  showError(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showTeamPrompt() {
    let pluralText = this.group.players.length > 1 ? ' players.' : ' player.';
    let message = "Your group has " + this.group.players.length + pluralText;
    let prompt = this.alertCtrl.create({
      title: 'GENERATE TEAMS',
      message: message,
      inputs: [
        {
          name: 'numberOfPlayers',
          placeholder: '# of teams'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Generate',
          handler: data => {
            this.generateTeams(data.numberOfPlayers);
          }
        }
      ]
    });
    prompt.present();
  }

  generateTeams(numberOfTeams: number) {
    this.group.players.sort(this.randomSort);
    this.group.players.sort(this.orderPlayersBestToWorest);
    this.teams = [];
    for(var i=0; i<numberOfTeams; i++) {
      this.teams.push({name: "Team " + (i + 1), players: []});
    }
    for(var j=0; j<this.group.players.length; j++) {
      this.teams[0].players.push(this.group.players[j]);
      this.teams.sort(this.orderTeamsByWeightLowestToHeighest);
    }
    for(var k=0; k<this.teams.length; k++) {
      this.teams[k].players.sort(this.randomSort);
    }
  }

  randomSort(a, b){
    return 0.5 - Math.random();
  }

  orderPlayersBestToWorest(a, b) {
    if (a.weight > b.weight)
        return -1;
    if (a.weight < b.weight)
        return 1;
    return 0;
  }

  orderTeamsByWeightLowestToHeighest(a: Group, b: Group) {
    function getTeamWeight(team: Group) {
      let weight = 0;
      for(var i=0; i<team.players.length; i++) {
          weight = team.players[i].weight + weight;
      }
      return weight;
    }
    if (getTeamWeight(a) < getTeamWeight(b))
      return -1;
    if (getTeamWeight(a) > getTeamWeight(b))
        return 1;
    return 0;
  }
}
