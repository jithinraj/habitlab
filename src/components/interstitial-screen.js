const $ = require('jquery')

const {polymer_ext} = require('libs_frontend/polymer_utils')
const {close_selected_tab} = require('libs_frontend/tab_utils')

const {
  log_impression,
  log_action,
} = require('libs_common/log_utils')

var intervention = require('libs_common/intervention_info').get_intervention();

Polymer({
  is: 'interstitial-screen',

  properties: {
    btnTxt: {
      type: String, 
    },
    btnTxt2: {
      type: String, 
    },    
    minutes: {
      type: Number
    },
    titleText: {
      type: String, 
    },
    visits: {
      type: Number
    },
    intervention: {
      type: String
    },
    messageText: {
      type: String
    },
    randomizer: {
      type: Boolean,
      value: false
    }

  },

  listeners: {
    'disable_intervention': 'disableIntervention',
    'show_button': 'showButton'
  },
  buttonclicked: function() {
    console.log('ok button clicked in polymer during loading')
    log_action(intervention.name, {'negative': 'Continuted to site.'})
    $(this).hide()
  },
  buttonclicked2: function() {
    log_action(intervention.name, {'positive': 'Left the site.w'})
    close_selected_tab().then(() => {

      console.log('done closing tab')
    });
  },
  hideButton: function() {
    console.log('button hidden')
    this.$.okbutton.hidden = true
    //this.$.closetabbutton.hidden = true
    this.$.okbutton.style.display = 'none';
    //this.$.closetabbutton.style.display = 'none';
  },
  showButton: function() {
    console.log(this.$.okbutton)
    this.$.okbutton.hidden = false
    //this.$.closetabbutton.hidden = false
    this.$.okbutton.style.display = 'inline-flex';
    this.$.closetabbutton.style.display = 'inline-flex';
  },
  ready: function() {
    console.log('interstitial-polymer ready')
    this.$.okbutton.textContent = this.btnTxt
    this.$.closetabbutton.textContent = this.btnTxt2
    this.$.titletext.textContent = this.titleText
    this.$.messagetext.textContent = this.messageText
    console.log(this.$.titletext.textContent)
    this.addEventListener('show_button', function() {
      console.log('hi')
    })

  },
  disableIntervention: function() {
    console.log('interstitial got callback')
    $(this).hide()
  },
  
  attributeChanged: function() {
    this.$.okbutton.textContent = this.btnTxt 
    this.$.closetabbutton.textContent = this.btnTxt2
    this.$.messagetext.textContent = this.messageText
    this.$.titletext.textContent = this.titleText
    console.log('attribute changed called')
  }
});
