import {Component} from 'angular2/core';
import {DynamicComponentLoader} from 'angular2/core';
import {ElementRef} from 'angular2/core';
import {AlertComponent} from '../app/alert/alert.component';
import {provide} from 'angular2/core';
import {Injector} from 'angular2/core';
import {AlertConfig} from '../app/alert/alert.config';
import {ResolvedProvider} from 'angular2/core';

@Component({
    selector: 'app',
    templateUrl: './app/app.component.tmpl.html'
})
export class AppComponent{        
   
    private alertType: string;
   
    constructor(private dynamicComponentLoader: DynamicComponentLoader,private element : ElementRef) {}
       
    private GetDummyAlertConfig(style: string, msg:string) : AlertConfig {
        return new AlertConfig(style,msg, '../img/updating.png');
    }
    
    private GetAlertBindings(alertConfig: AlertConfig) : ResolvedProvider[]{
        return Injector.resolve([provide(AlertConfig, {useValue: alertConfig})]);
    }
    
    private CreateDynamicAlert(alertBindings) {
         this.dynamicComponentLoader
           .loadIntoLocation(AlertComponent,this.element,'alertAppend', alertBindings)
           .then( comp => { 
               //We assign the componentRef to the instance
               comp.instance.contentRef(comp);
               console.log("Alert rendered with message: " + comp.instance.MessageContent);              
           }); 
    }
    
    AddAlert(msg:string) {
        
      //Example configuration
      let alertConfig  = this.GetDummyAlertConfig(this.alertType,msg);      
      let alertBindings = this.GetAlertBindings(alertConfig);
      this.CreateDynamicAlert(alertBindings);
     
    }
    
    onChange(alertType: string) {
       this.alertType=alertType;
    }  
}