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
          text: 'Generated',
          handler: data => {
            this.generateTeams(data.numberOfPlayers);
          }
        }
      ]
    });
    prompt.present();
  }

  generateTeams(numberOfTeams: number) {

  }

}
