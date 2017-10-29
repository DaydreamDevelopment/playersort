import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
export class HomePage implements OnInit {
  phoneticAlpha = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliet',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'X-ray',
    'Yankee',
    'Zulu'
    ];
  group: Group = { name: "", players: [] };
  weight: number = 0;
  name: string = "";
  teams: Group[] = [];
  weightValues = [{value:1, label:'1'},
                  {value:2, label: '2'},
                  {value:3, label:'3'},
                  {value:4, label: '4'},
                  {value:5, label:'5'}];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('group').then((group) => {
      if(group) {
        this.group = group;
      }
    });
  }

  addPlayer() {
    if(this.weight !== 0 && this.name !== "") {
      for(var i=0; i< this.group.players.length; i++) {
        if(this.group.players[i].name.trim() === this.name.trim()) {
          this.showError('Duplicate Player', 'A player with this name already exists');  
          return;      
        }
      }
      this.group.players.push({ name: this.name, weight: this.weight, active: true })
      this.weight = 0;
      this.name = "";
      this.storage.set('group', this.group);
    }
    else {
      this.showError('Missing Information', 'You must enter a name and select a weight.');
    }
  }

  removePlayer(name: string) {
    let updatedPlayers: Player[] = []
    for(var i=0; i< this.group.players.length; i++) {
      if(this.group.players[i].name.trim() !== name.trim()) {
        updatedPlayers.push(this.group.players[i]);    
      }
    }
    this.group.players = updatedPlayers;
    this.storage.set('group', this.group);
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
    let activePlayers = 0;
    for(var i=0; i<this.group.players.length; i++) {
      if(this.group.players[i].active) {
        activePlayers++;
      }
    }

    if(activePlayers < 1) {
      this.showError('No Active Players', 'You must have at least one active player to generate teams.');
      return;
    }

    let pluralText = activePlayers > 1 ? ' active players.' : ' active player.';
    let message = "Your group has " + activePlayers + pluralText;
    let prompt = this.alertCtrl.create({
      title: 'GENERATE TEAMS',
      message: message,
      inputs: [
        {
          name: 'numberOfTeams',
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
            if(data.numberOfTeams > activePlayers) {
              this.showError('Not Enough Active Players', 'You can not generate more teams than active players.'); 
              return;             
            }
            this.generateTeams(data.numberOfTeams);
          }
        }
      ]
    });
    prompt.present();
  }

  generateTeams(numberOfTeams: number) {
    let teamPlayers: Player[] = [];
    for(var y=0; y<this.group.players.length; y++) {
      if(this.group.players[y].active) {
        teamPlayers.push(this.group.players[y]);
      }
    }
    teamPlayers.sort(this.randomSort);
    teamPlayers.sort(this.orderPlayersBestToWorest);
    this.teams = [];
    for(var i=0; i<numberOfTeams; i++) {
      this.teams.push({name: this.phoneticAlpha[i], players: []});
    }
    for(var j=0; j<teamPlayers.length; j++) {
      this.teams[0].players.push(teamPlayers[j]);
      this.teams.sort(this.orderTeamsByWeightLowestToHeighest);
    }
    for(var k=0; k<this.teams.length; k++) {
      this.teams[k].players.sort(this.randomSort);
    }
    this.teams.sort(this.orderAlphabetically);
  }

  randomSort(a, b){
    return 0.5 - Math.random();
  }

  orderAlphabetically(a: Group, b: Group) {
    let textA = a.name
    let textB = b.name
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
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
